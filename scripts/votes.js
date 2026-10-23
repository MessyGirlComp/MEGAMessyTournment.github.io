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
========================================================= */

const VOTES_PER_GROUP = 2;

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
   THIS BROWSER'S VOTER ID + VOTES
   (localStorage can be blocked, so every access is guarded)
========================================================= */

function newUUID() {

    if (window.crypto && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });

}

function getVoterId() {

    try {

        let id = localStorage.getItem(VOTER_ID_KEY);

        if (!id) {
            id = newUUID();
            localStorage.setItem(VOTER_ID_KEY, id);
        }

        return id;

    } catch (error) {

        if (!memoryVoterId) {
            memoryVoterId = newUUID();
        }

        return memoryVoterId;

    }

}

/* The girls this browser voted for in a group, e.g. ["004", "009"].
   Returns null if it has not voted. */

function getMyVotes(group) {

    try {

        const saved = localStorage.getItem(MY_VOTE_KEY_PREFIX + group);

        return saved ? saved.split(",").filter(Boolean) : null;

    } catch (error) {
        return null;
    }

}

function rememberMyVotes(group, girlIDs) {

    try {
        localStorage.setItem(MY_VOTE_KEY_PREFIX + group, girlIDs.join(","));
    } catch (error) {
        // ignore: the database still blocks a second vote
    }

}


/* =========================================================
   CAST VOTES
   returns { ok: true }
        or { ok: false, alreadyVoted: true }
        or { ok: false, error: "message" }
========================================================= */

async function castVotes(group, girlIDs) {

    if (!isVotingConfigured()) {
        return { ok: false, error: "Voting has not been set up yet." };
    }

    if (girlIDs.length !== VOTES_PER_GROUP) {
        return {
            ok: false,
            error: `Please pick exactly ${VOTES_PER_GROUP} girls.`
        };
    }

    const { data, error } = await getSupabase().rpc("cast_votes", {
        p_group: Number(group),
        p_voter: getVoterId(),
        p_girls: girlIDs.map(String)
    });

    if (error) {

        console.error("Vote failed:", error);

        return {
            ok: false,
            error: "Your votes could not be saved. Please try again."
        };

    }

    if (data === "ok") {
        rememberMyVotes(group, girlIDs);
        return { ok: true };
    }

    if (data === "already_voted") {

        if (!getMyVotes(group)) {
            rememberMyVotes(group, ["unknown"]);
        }

        return { ok: false, alreadyVoted: true };
    }

    return {
        ok: false,
        error: "Your votes could not be saved. Please try again."
    };

}
