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

            <div class="group-vote-count" hidden></div>

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
   Each card has a Vote button. One vote per browser per group.
   Vote counts are shown once you have voted.
========================================================= */

function setVoteMessage(text, isError) {

    const area = document.getElementById("voteArea");

    area.innerHTML = "";

    if (!text) {
        return;
    }

    const message = document.createElement("p");

    message.className = "vote-message" + (isError ? " error" : "");
    message.textContent = text;

    area.appendChild(message);

}

function showVoteCounts(group, myGirlID) {

    return getGroupResults(group).then(results => {

        document.querySelectorAll(".group-girl-card[data-girl-id]").forEach(card => {

            const id = card.dataset.girlId;
            const count = results[id] || 0;
            const box = card.querySelector(".group-vote-count");
            const button = card.querySelector(".group-vote-button");

            box.textContent = `${count} ${count === 1 ? "vote" : "votes"}`;
            box.hidden = false;

            button.disabled = true;

            if (id === myGirlID) {
                button.textContent = "✔ Your vote";
                button.classList.add("voted");
            } else {
                button.textContent = "Vote closed for you";
            }

        });

    });

}

function setupVoting(group) {

    const buttons = document.querySelectorAll(".group-vote-button");

    if (!isVotingConfigured()) {

        buttons.forEach(button => { button.disabled = false; });

        setVoteMessage("Voting for this group has not opened yet.", false);

        return;
    }

    const existingVote = getMyVote(group);

    if (existingVote) {

        setVoteMessage("Thanks, your vote for this group has been counted.", false);

        showVoteCounts(group, existingVote);

        return;
    }

    setVoteMessage("Pick your favourite girl and press Vote. You can only vote once per group.", false);

    buttons.forEach(button => {

        button.addEventListener("click", async () => {

            const girlID = button.dataset.girlId;
            const girl = getGirl(girlID);

            if (!confirm(`Vote for ${girl.name}? You can't change your vote afterwards.`)) {
                return;
            }

            buttons.forEach(b => { b.disabled = true; });

            const result = await castVote(group, girlID);

            if (result.ok) {

                setVoteMessage(`Thanks! Your vote for ${girl.name} has been counted.`, false);

                showVoteCounts(group, girlID);

            } else if (result.alreadyVoted) {

                setVoteMessage("You have already voted in this group.", false);

                showVoteCounts(group, getMyVote(group));

            } else {

                setVoteMessage(result.error, true);

                buttons.forEach(b => { b.disabled = false; });

            }

        });

    });

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