// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   VOTING (Supabase)

   Load order (after the Supabase library):
   girls-data.js, site.js, supabase-config.js, votes.js, group.js

   Rules:
   - one vote per browser per qualifying group
     (enforced by the database: unique group_number + voter_id)
   - votes are only ever ADDED from the browser
   - results are counts only (get_group_results in the database)
========================================================= */

const VOTER_ID_KEY = "mmt_voter_id";
const MY_VOTE_KEY_PREFIX = "mmt_vote_group_";

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

function getMyVote(group) {

    try {
        return localStorage.getItem(MY_VOTE_KEY_PREFIX + group) || null;
    } catch (error) {
        return null;
    }

}

function rememberMyVote(group, girlID) {

    try {
        localStorage.setItem(MY_VOTE_KEY_PREFIX + group, girlID);
    } catch (error) {
        // ignore: the database still blocks a second vote
    }

}


/* =========================================================
   CAST A VOTE
   returns { ok: true }
        or { ok: false, alreadyVoted: true }
        or { ok: false, error: "message" }
========================================================= */

async function castVote(group, girlID) {

    if (!isVotingConfigured()) {
        return { ok: false, error: "Voting has not been set up yet." };
    }

    const { error } = await getSupabase()
        .from("votes")
        .insert({
            group_number: Number(group),
            girl_id: String(girlID),
            voter_id: getVoterId()
        });

    if (!error) {
        rememberMyVote(group, girlID);
        return { ok: true };
    }

    // 23505 = unique violation: this voter already voted in this group
    if (error.code === "23505") {

        if (!getMyVote(group)) {
            rememberMyVote(group, "unknown");
        }

        return { ok: false, alreadyVoted: true };
    }

    console.error("Vote failed:", error);

    return {
        ok: false,
        error: "Your vote could not be saved. Please try again."
    };

}


/* =========================================================
   RESULTS
   returns { "004": 12, "009": 7, ... }   (empty object on failure)
========================================================= */

async function getGroupResults(group) {

    if (!isVotingConfigured()) {
        return {};
    }

    const { data, error } = await getSupabase()
        .rpc("get_group_results", { p_group: Number(group) });

    if (error) {
        console.error("Could not load results:", error);
        return {};
    }

    const results = {};

    (data || []).forEach(row => {
        results[row.girl_id] = Number(row.vote_count);
    });

    return results;

}
