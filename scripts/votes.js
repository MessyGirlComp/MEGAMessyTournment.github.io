// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   VOTING (Supabase)

   Load order (after the Supabase library):
   girls-data.js, site.js, supabase-config.js, votes.js, group.js

   Rules:
   - each voter picks exactly VOTES_PER_GROUP different girls
     per qualifying group, and can only vote once per group
   - the database enforces this (cast_votes in supabase-setup.sql)
   - votes and counts are NOT readable from the website;
     you view results in the Supabase SQL Editor

   MANUAL VOTING CONTROL:
   - VOTING_ENABLED = true  -> voting is ON
   - VOTING_ENABLED = false -> voting is OFF
========================================================= */


/* =========================================================
   VOTING SETTINGS
========================================================= */

// Number of girls each voter must select per group
const VOTES_PER_GROUP = 2;


// =========================================================
// MASTER VOTING SWITCH
// =========================================================
//
// true  = voting is ON
// false = voting is OFF
//
// Change this value whenever you want to manually
// open or close voting.
//
// Example:
// const VOTING_ENABLED = true;   // Voting ON
// const VOTING_ENABLED = false;  // Voting OFF
//
const VOTING_ENABLED = false;


const VOTER_ID_KEY = "mmt_voter_id";
const MY_VOTE_KEY_PREFIX = "mmt_votes_group_";


let supabaseClient = null;
let memoryVoterId = null;


/* =========================================================
   SETUP CHECK
========================================================= */

function isVotingConfigured() {

    return Boolean(
        window.supabase &&
        typeof SUPABASE_URL === "string" &&
        /^https:\/\/.+/i.test(SUPABASE_URL) &&
        typeof SUPABASE_ANON_KEY === "string" &&
        SUPABASE_ANON_KEY.length > 20 &&
        !SUPABASE_ANON_KEY.startsWith("YOUR_")
    );

}


function getSupabase() {

    if (!supabaseClient) {

        supabaseClient = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );

    }

    return supabaseClient;

}


/* =========================================================
   VOTING STATUS
========================================================= */

/*
    Returns true when voting is currently enabled.

    This function is useful for group.js or other files
    that need to check whether voting is available.
*/

function isVotingEnabled() {

    return VOTING_ENABLED === true;

}


/* =========================================================
   THIS BROWSER'S VOTER ID + VOTES
   (localStorage can be blocked, so every access is guarded)
========================================================= */

function newUUID() {

    if (window.crypto && crypto.randomUUID) {

        return crypto.randomUUID();

    }

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        c => {

            const r = Math.random() * 16 | 0;

            return (
                c === "x"
                    ? r
                    : (r & 0x3 | 0x8)
            ).toString(16);

        }
    );

}


function getVoterId() {

    try {

        let id = localStorage.getItem(VOTER_ID_KEY);

        if (!id) {

            id = newUUID();

            localStorage.setItem(
                VOTER_ID_KEY,
                id
            );

        }

        return id;

    } catch (error) {

        if (!memoryVoterId) {

            memoryVoterId = newUUID();

        }

        return memoryVoterId;

    }

}


/* =========================================================
   GET VOTES SAVED BY THIS BROWSER
========================================================= */

/*
    The girls this browser voted for in a group.

    Example:
    ["004", "009"]

    Returns:
    - array if this browser has voted
    - null if it has not voted
*/

function getMyVotes(group) {

    try {

        const saved = localStorage.getItem(
            MY_VOTE_KEY_PREFIX + group
        );

        return saved
            ? saved.split(",").filter(Boolean)
            : null;

    } catch (error) {

        return null;

    }

}


/* =========================================================
   REMEMBER THIS BROWSER'S VOTE
========================================================= */

function rememberMyVotes(group, girlIDs) {

    try {

        localStorage.setItem(
            MY_VOTE_KEY_PREFIX + group,
            girlIDs.join(",")
        );

    } catch (error) {

        // Ignore localStorage errors.
        // Supabase still prevents a second vote.

    }

}


/* =========================================================
   CAST VOTES
=========================================================

   Returns:

   { ok: true }

   or

   { ok: false, votingClosed: true }

   or

   { ok: false, alreadyVoted: true }

   or

   { ok: false, error: "message" }

========================================================= */

async function castVotes(group, girlIDs) {


    /* =====================================================
       MANUAL VOTING SWITCH
    ===================================================== */

    if (!VOTING_ENABLED) {

        return {

            ok: false,

            votingClosed: true,

            error: "Voting is currently closed."

        };

    }


    /* =====================================================
       SUPABASE CONFIGURATION CHECK
    ===================================================== */

    if (!isVotingConfigured()) {

        return {

            ok: false,

            error: "Voting has not been set up yet."

        };

    }


    /* =====================================================
       CHECK NUMBER OF VOTES
    ===================================================== */

    if (girlIDs.length !== VOTES_PER_GROUP) {

        return {

            ok: false,

            error:
                `Please pick exactly ${VOTES_PER_GROUP} girls.`

        };

    }


    /* =====================================================
       CHECK FOR DUPLICATE GIRLS
    ===================================================== */

    const uniqueGirlIDs = [
        ...new Set(
            girlIDs.map(String)
        )
    ];


    if (uniqueGirlIDs.length !== VOTES_PER_GROUP) {

        return {

            ok: false,

            error: "Please select different girls."

        };

    }


    /* =====================================================
       SEND VOTES TO SUPABASE
    ===================================================== */

    const { data, error } =
        await getSupabase().rpc("cast_votes", {

            p_group: Number(group),

            p_voter: getVoterId(),

            p_girls: uniqueGirlIDs

        });


    /* =====================================================
       DATABASE ERROR
    ===================================================== */

    if (error) {

        console.error(
            "Vote failed:",
            error
        );

        return {

            ok: false,

            error:
                "Your votes could not be saved. Please try again."

        };

    }


    /* =====================================================
       SUCCESS
    ===================================================== */

    if (data === "ok") {

        rememberMyVotes(
            group,
            uniqueGirlIDs
        );

        return {

            ok: true

        };

    }


    /* =====================================================
       ALREADY VOTED
    ===================================================== */

    if (data === "already_voted") {

        if (!getMyVotes(group)) {

            rememberMyVotes(
                group,
                ["unknown"]
            );

        }

        return {

            ok: false,

            alreadyVoted: true

        };

    }


    /* =====================================================
       UNKNOWN DATABASE RESPONSE
    ===================================================== */

    return {

        ok: false,

        error:
            "Your votes could not be saved. Please try again."

    };

}


/* =========================================================
   OPTIONAL HELPER FUNCTIONS
========================================================= */

/*
    Returns a simple status object.

    Useful if group.js wants to display a voting status.
*/

function getVotingStatus() {

    return {

        enabled: VOTING_ENABLED,

        votesPerGroup: VOTES_PER_GROUP

    };

}


/*
    Returns the text that can be displayed to visitors.
*/

function getVotingStatusText() {

    if (VOTING_ENABLED) {

        return "Voting is open.";

    }

    return "Voting is currently closed.";

}
