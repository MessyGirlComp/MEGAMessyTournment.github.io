// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   QUALIFYING GROUP PAGE

   qualifying/groups/group.html?group=7

   Load order: girls-data.js, site.js, group.js
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

    buildVoteButton(groupNumber);

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

        </div>

    `;


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
   VOTE BUTTON
========================================================= */

function buildVoteButton(group) {

    const voteArea = document.getElementById("voteArea");

    voteArea.innerHTML = "";

    const button = document.createElement("a");

    button.className = "button";

    button.innerHTML =
        "&#128499;&#65039; VOTE FOR A GIRL TO MOVE ON";

    const voteLink = getGroupVoteLink(group);


    /*
       Only a real URL counts.

       This ignores placeholders such as:
       YOUR_GOOGLE_FORM_LINK
    */

    if (/^https?:\/\//i.test(voteLink)) {

        button.href = voteLink;
        button.target = "_blank";
        button.rel = "noopener noreferrer";

    } else {

        button.href = "#";

        button.addEventListener("click", event => {

            event.preventDefault();

            alert(
                `The voting form for Qualifying Group ${group} has not been added yet.`
            );

        });

    }


    voteArea.appendChild(button);

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