// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   QUALIFYING GROUP PAGE

   qualifying/groups/group.html?group=7

   Load order: Supabase library, girls-data.js, site.js,
   supabase-config.js, votes.js, group.js
========================================================= */

/* How many girls in each group qualify directly / go to wildcard */

const QUALIFY_COUNT = 2;
const WILDCARD_COUNT = 1;

const MAX_GROUPS = 42;


const groupNumber = Number(
    new URLSearchParams(window.location.search).get("group")
);


/* =========================================================
   BUILD PAGE
========================================================= */

function buildGroup() {

    const groupGirls = getGirlsByGroup(groupNumber);

    const validGroup =
        Number.isInteger(groupNumber) &&
        groupNumber >= 1 &&
        groupNumber <= MAX_GROUPS;

    if (!validGroup || groupGirls.length === 0) {

        showGroupError(
            validGroup ? "Group Not Found" : "Invalid Group"
        );

        return;
    }

    document.title =
        `Qualifying Group ${groupNumber} | MEGA Messy Tournament`;

    document.getElementById("groupTitle").textContent =
        `Qualifying Group ${groupNumber}`;

    document.getElementById("groupSubtitle").textContent =
        "Meet the contestants and vote for your favourite.";

    document.getElementById("contestantCount").textContent =
        groupGirls.length;

    document.getElementById("qualifyCount").textContent =
        QUALIFY_COUNT;

    document.getElementById("wildcardCount").textContent =
        WILDCARD_COUNT;

    const grid = document.getElementById("girlsGrid");

    grid.innerHTML = "";

    groupGirls.forEach(girl => {
        grid.appendChild(createGirlCard(girl));
    });

    setupVoting(groupNumber);

}


/* =========================================================
   GIRL CARD
========================================================= */

function createGirlCard(girl) {

    const card = document.createElement("div");

    /*
        Group page uses its own card classes.

        These are intentionally different from the
        All Girls page classes so the two layouts can
        be styled independently.
    */
    card.className = "group-girl-card";

    const statusKey = getStatusKey(girl);

    card.innerHTML = `

        <div class="group-girl-image-wrapper">
            <img
                class="group-girl-image"
                alt="${escapeHTML(girl.name)}"
                loading="lazy"
            >
        </div>

        <div class="group-girl-info">

            <div class="group-girl-number">
                Girl ${escapeHTML(girl.id)}
            </div>

            <div class="group-girl-name">
                ${escapeHTML(girl.name)}
            </div>

            <div class="group-status-badge ${statusKey}">
                ${escapeHTML(girl.status || "Competing")}
            </div>

            <br>

            <a
                class="group-profile-button"
                href="${escapeHTML(getGirlProfileURL(girl.id))}"
            >
                View Profile
            </a>

            <button
                type="button"
                class="group-vote-button"
                data-girl-id="${escapeHTML(girl.id)}"
            >
                Vote
            </button>

        </div>

    `;

    card.dataset.girlId = girl.id;


    /* =====================================================
       IMAGE
    ===================================================== */

    // Thumbnail first, first profile image if there is no thumbnail
    const image = card.querySelector(".group-girl-image");

    image.addEventListener("error", function fallback() {

        image.removeEventListener("error", fallback);

        image.src = getGirlImageA(girl.id);

    });

    image.src = getGirlThumbnail(girl.id);


    return card;

}


/* =========================================================
   VOTING (Supabase)
   Each voter picks VOTES_PER_GROUP girls (2) and presses
   Submit. One submission per browser per group.
   Vote counts are never shown on the site.
========================================================= */

function setVoteMessage(text, isError) {

    const message = document.getElementById("voteMessage");

    if (!message) {
        return;
    }

    message.textContent = text || "";
    message.classList.toggle("error", Boolean(isError));

}

function lockVoting(group, pickedIDs) {

    document.querySelectorAll(".group-girl-card[data-girl-id]").forEach(card => {

        const button = card.querySelector(".group-vote-button");
        const picked = pickedIDs.includes(card.dataset.girlId);

        button.disabled = true;
        button.classList.remove("selected");
        button.classList.toggle("voted", picked);
        button.textContent = picked ? "✔ Your vote" : "Voting closed";

    });

    const submit = document.getElementById("submitVotes");

    if (submit) {
        submit.hidden = true;
    }

}

function setupVoting(group) {

    const buttons = [...document.querySelectorAll(".group-vote-button")];
    const voteArea = document.getElementById("voteArea");

    voteArea.innerHTML = `
        <p class="vote-message" id="voteMessage"></p>
        <button type="button" class="button" id="submitVotes" disabled></button>
    `;

    const submit = document.getElementById("submitVotes");

    submit.hidden = true;

    if (!isVotingConfigured()) {

        buttons.forEach(button => { button.disabled = true; });

        setVoteMessage("Voting for this group has not opened yet.", false);

        return;
    }

    const existing = getMyVotes(group);

    if (existing) {

        lockVoting(group, existing);

        setVoteMessage("Thanks, your votes for this group have been counted.", false);

        return;
    }

    const selected = new Set();

    function refresh() {

        buttons.forEach(button => {

            const isSelected = selected.has(button.dataset.girlId);

            button.classList.toggle("selected", isSelected);
            button.textContent = isSelected ? "✔ Selected" : "Vote";

            // once 2 are chosen, the others are locked until one is unselected
            button.disabled =
                !isSelected && selected.size >= VOTES_PER_GROUP;

        });

        submit.hidden = false;
        submit.disabled = selected.size !== VOTES_PER_GROUP;

        submit.textContent =
            selected.size === VOTES_PER_GROUP
                ? `🗳️ SUBMIT MY ${VOTES_PER_GROUP} VOTES`
                : `Pick ${VOTES_PER_GROUP - selected.size} more ${VOTES_PER_GROUP - selected.size === 1 ? "girl" : "girls"}`;

        setVoteMessage(
            `Choose ${VOTES_PER_GROUP} girls to move on, then submit. You can only vote once per group.`,
            false
        );

    }

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.girlId;

            if (selected.has(id)) {
                selected.delete(id);
            } else if (selected.size < VOTES_PER_GROUP) {
                selected.add(id);
            }

            refresh();

        });

    });

    submit.addEventListener("click", async () => {

        if (selected.size !== VOTES_PER_GROUP) {
            return;
        }

        const picks = [...selected];

        const names = picks.map(id => getGirl(id).name).join(" and ");

        if (!confirm(`Submit your votes for ${names}? You can't change them afterwards.`)) {
            return;
        }

        submit.disabled = true;
        buttons.forEach(button => { button.disabled = true; });

        const result = await castVotes(group, picks);

        if (result.ok) {

            lockVoting(group, picks);

            setVoteMessage("Thanks! Your votes have been counted.", false);

        } else if (result.alreadyVoted) {

            lockVoting(group, getMyVotes(group) || []);

            setVoteMessage("You have already voted in this group.", false);

        } else {

            setVoteMessage(result.error, true);

            refresh();

        }

    });

    refresh();

}


/* =========================================================
   ERROR
========================================================= */

function showGroupError(title) {

    document.getElementById("groupTitle").textContent =
        title;

    document.getElementById("groupStatus").hidden =
        true;

    document.getElementById("errorTitle").textContent =
        title;

    document.getElementById("errorLink").href =
        siteURL("qualifying/groups/index.html");

    document.getElementById("errorMessage").hidden =
        false;

}


/* =========================================================
   START
========================================================= */

buildGroup();