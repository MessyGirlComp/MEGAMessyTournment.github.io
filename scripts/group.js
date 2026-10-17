// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   GROUP.JS

   Used by:

   qualifying/groups/group.html?group=1
   qualifying/groups/group.html?group=2
   ...
   qualifying/groups/group.html?group=24
========================================================= */


/* =========================================================
   READ GROUP NUMBER FROM URL
========================================================= */

const groupParams = new URLSearchParams(
    window.location.search
);

const groupNumber =
    Number(groupParams.get("group"));


/* =========================================================
   BUILD GROUP
========================================================= */

function buildGroup() {

    const girlsGrid =
        document.getElementById("girlsGrid");

    const groupTitle =
        document.getElementById("groupTitle");

    const groupSubtitle =
        document.getElementById("groupSubtitle");

    const errorMessage =
        document.getElementById("errorMessage");

    const voteArea =
        document.getElementById("voteArea");


    /* =====================================================
       CHECK REQUIRED ELEMENTS
    ===================================================== */

    if (!girlsGrid) {

        console.error(
            "ERROR: #girlsGrid was not found."
        );

        return;
    }


    /* =====================================================
       CHECK GROUP NUMBER
    ===================================================== */

    if (
        !Number.isInteger(groupNumber) ||
        groupNumber < 1 ||
        groupNumber > 42
    ) {

        showGroupError(
            girlsGrid,
            groupTitle,
            groupSubtitle,
            errorMessage,
            voteArea,
            "Invalid Group"
        );

        return;
    }


    /* =====================================================
       GET GIRLS
    ===================================================== */

    const groupGirls =
        getGirlsByGroup(groupNumber);


    /* =====================================================
       CHECK GROUP DATA
    ===================================================== */

    if (
        !groupGirls ||
        groupGirls.length === 0
    ) {

        showGroupError(
            girlsGrid,
            groupTitle,
            groupSubtitle,
            errorMessage,
            voteArea,
            "Group Not Found"
        );

        return;
    }


    /* =====================================================
       PAGE TITLE
    ===================================================== */

    document.title =
        `Qualifying Group ${groupNumber} | MEGA Messy Tournament`;


    /* =====================================================
       PAGE HEADER
    ===================================================== */

    if (groupTitle) {

        groupTitle.textContent =
            `Qualifying Group ${groupNumber}`;

    }


    if (groupSubtitle) {

        groupSubtitle.textContent =
            "Select your favourite girl to vote for her to move on.";

    }


    /* =====================================================
       HIDE ERROR
    ===================================================== */

    if (errorMessage) {

        errorMessage.style.display =
            "none";

    }


    /* =====================================================
       SHOW GRID
    ===================================================== */

    girlsGrid.style.display =
        "grid";


    girlsGrid.innerHTML =
        "";


    /* =====================================================
       BUILD GIRL CARDS
    ===================================================== */

    groupGirls.forEach(
        girl => {

            const card =
                document.createElement("div");


            card.className =
                "girl-card";


            const imagePath =
                `../../girls/profiles/Before/${girl.id}.png`;


            /* ---------------------------------------------
               PROFILE PATH
            --------------------------------------------- */

            const profilePath =
                `../../girls/profiles/profile.html?girl=${girl.id}`;


            /* ---------------------------------------------
               CARD CONTENT
            --------------------------------------------- */

            card.innerHTML = `

                <div class="girl-image-wrapper">

                    <img
                        src="${imagePath}"
                        class="girl-image"
                        alt="${escapeHTML(girl.name)}"
                        loading="lazy"
                    >

                </div>


                <div class="girl-info">

                    <div class="girl-name">
                        ${escapeHTML(girl.name)}
                    </div>


                    <a
                        href="${profilePath}"
                        class="profile-button"
                    >
                        View Profile
                    </a>

                </div>

            `;


            /* ---------------------------------------------
               IMAGE ERROR HANDLING
            --------------------------------------------- */

            const image =
                card.querySelector(".girl-image");


            if (image) {

                image.addEventListener(
                    "error",
                    () => {

                        console.warn(
                            "Could not load girl image:",
                            imagePath
                        );


                        image.alt =
                            `Image unavailable for ${girl.name}`;

                    }
                );

            }


            /* ---------------------------------------------
               ADD CARD
            --------------------------------------------- */

            girlsGrid.appendChild(
                card
            );

        }
    );


    /* =====================================================
       BUILD VOTE BUTTON
    ===================================================== */

    buildVoteButton(
        voteArea,
        groupNumber
    );

}


/* =========================================================
   BUILD VOTE BUTTON
========================================================= */

function buildVoteButton(
    voteArea,
    group
) {

    if (!voteArea) {
        return;
    }


    /* =====================================================
       CLEAR EXISTING BUTTON
    ===================================================== */

    voteArea.innerHTML =
        "";


    /* =====================================================
       CREATE BUTTON
    ===================================================== */

    const voteButton =
        document.createElement("a");


    voteButton.className =
        "vote-button";


    voteButton.textContent =
        "?? VOTE FOR A GIRL TO MOVE ON";


    /* =====================================================
       GET VOTE LINK
    ===================================================== */

    const voteLink =
        getGroupVoteLink(group);


    /* =====================================================
       CHECK VOTE LINK
    ===================================================== */

    const validVoteLink =
        voteLink &&
        voteLink !== "#" &&
        !voteLink.startsWith("YOUR_");


    if (validVoteLink) {

        voteButton.href =
            voteLink;

        voteButton.target =
            "_blank";

        voteButton.rel =
            "noopener noreferrer";

    } else {

        /*
            The form has not been added yet.
        */

        voteButton.href =
            "#";


        voteButton.addEventListener(
            "click",
            event => {

                event.preventDefault();


                alert(
                    `The voting form for Qualifying Group ${group} has not been added yet.`
                );

            }
        );

    }


    /* =====================================================
       ADD BUTTON
    ===================================================== */

    voteArea.appendChild(
        voteButton
    );

}


/* =========================================================
   GROUP ERROR
========================================================= */

function showGroupError(
    girlsGrid,
    groupTitle,
    groupSubtitle,
    errorMessage,
    voteArea,
    title
) {


    /* =====================================================
       HIDE GIRL GRID
    ===================================================== */

    if (girlsGrid) {

        girlsGrid.innerHTML =
            "";

        girlsGrid.style.display =
            "none";

    }


    /* =====================================================
       CHANGE TITLE
    ===================================================== */

    if (groupTitle) {

        groupTitle.textContent =
            title;

    }


    /* =====================================================
       REMOVE SUBTITLE
    ===================================================== */

    if (groupSubtitle) {

        groupSubtitle.textContent =
            "";

    }


    /* =====================================================
       HIDE VOTE AREA
    ===================================================== */

    if (voteArea) {

        voteArea.innerHTML =
            "";

        voteArea.style.display =
            "none";

    }


    /* =====================================================
       SHOW ERROR MESSAGE
    ===================================================== */

    if (errorMessage) {

        errorMessage.style.display =
            "block";


        errorMessage.innerHTML = `

            <h2>
                ${escapeHTML(title)}
            </h2>

            <p>
                We couldn't find the requested
                qualifying group.
            </p>

        `;

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   INITIALISE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    buildGroup
);
