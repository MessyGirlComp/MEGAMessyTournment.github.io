// JavaScript Document
/* =========================================================
   QUALIFYING GROUP PAGE
   ========================================================= */


/* ================= CONFIG ================= */

const GROUP_NUMBER = 1;


/*
    Number of contestants that qualify directly.
*/
const QUALIFY_COUNT = 2;


/*
    Number of contestants sent to wildcard.
*/
const WILDCARD_COUNT = 1;


/* ================= GET ELEMENTS ================= */

const groupTitle = document.getElementById("groupTitle");
const groupDescription = document.getElementById("groupDescription");

const contestantsContainer =
    document.getElementById("contestants");

const contestantCount =
    document.getElementById("contestantCount");

const qualifyCount =
    document.getElementById("qualifyCount");

const wildcardCount =
    document.getElementById("wildcardCount");

const voteButton =
    document.getElementById("voteButton");


/* ================= PAGE INFORMATION ================= */

groupTitle.textContent = `Group ${GROUP_NUMBER}`;

groupDescription.textContent =
    `Welcome to Qualifying Group ${GROUP_NUMBER}`;

qualifyCount.textContent = QUALIFY_COUNT;
wildcardCount.textContent = WILDCARD_COUNT;


/* ================= GET GROUP ================= */

const groupGirls = GIRLS.filter(
    girl => Number(girl.group) === GROUP_NUMBER
);


/* ================= CONTESTANT COUNT ================= */

contestantCount.textContent = groupGirls.length;


/* ================= CREATE CONTESTANT CARD ================= */

function createContestantCard(girl) {

    const article = document.createElement("article");

    article.className = "contestant-card";

    /*
        Clicking the card opens the girl's profile.
    */

    article.style.cursor = "pointer";

    article.addEventListener("click", () => {

        window.location.href =
            `../../girls/profile.html?id=${encodeURIComponent(girl.id)}`;

    });


    /* ================= IMAGE ================= */

    const image = document.createElement("img");

    /*
        Your girls-data.js profile images may currently use:

        ../images/girls/001-before.png

        But the group page is two folders deeper.

        Therefore we build the image path from the ID.
    */

    image.src = `../../images/girls/${girl.id}.png`;

    image.alt = girl.name;

    image.className = "contestant-image";


    /*
        If an image cannot be found, show a simple fallback.
    */

    image.onerror = function () {

        this.onerror = null;

        this.src = "../../images/girls/default.png";

    };


    /* ================= CONTENT ================= */

    const content = document.createElement("div");

    content.className = "contestant-content";


    /* ================= NUMBER ================= */

    const number = document.createElement("div");

    number.className = "contestant-number";

    number.textContent =
        `CONTESTANT ${girl.id}`;


    /* ================= NAME ================= */

    const name = document.createElement("h2");

    name.className = "contestant-name";

    name.textContent = girl.name;


    /* ================= STATUS ================= */

    const status = document.createElement("div");

    status.className = "contestant-status";


    /*
        Use the status stored in girls-data.js.

        Examples:

        Competing
        Qualified
        Wildcard
        Eliminated
    */

    status.textContent =
        girl.status || "Competing";


    /* ================= BUILD CARD ================= */

    content.appendChild(number);
    content.appendChild(name);
    content.appendChild(status);

    article.appendChild(image);
    article.appendChild(content);

    return article;
}


/* ================= DISPLAY CONTESTANTS ================= */

if (groupGirls.length === 0) {

    contestantsContainer.innerHTML = `
        <div class="empty-group">
            <h2>No contestants found</h2>
            <p>
                There are currently no contestants assigned
                to Group ${GROUP_NUMBER}.
            </p>
        </div>
    `;

} else {

    groupGirls.forEach(girl => {

        contestantsContainer.appendChild(
            createContestantCard(girl)
        );

    });

}


/* ================= VOTE BUTTON ================= */


/*
    IMPORTANT:

    Your new tournament plan says qualifying is NOT
    decided by community voting.

    Community voting happens during the wildcard rounds.

    Therefore the button below links to the wildcard
    voting page rather than qualifying voting.
*/

voteButton.href =
    `../../vote.html?stage=wildcard&group=${GROUP_NUMBER}`;

voteButton.textContent =
    `🗳️ Vote for the Group ${GROUP_NUMBER} Wildcard`;

