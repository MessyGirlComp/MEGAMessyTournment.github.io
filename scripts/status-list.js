// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   QUALIFYING STATUS PAGES

   Used by:
   qualifying/wildcard.html
   qualifying/eliminated.html
   qualifying/qualified.html

   Each page sets  <body data-status-page="wildcard">  (or
   "eliminated" / "qualified"). This script lists every girl
   whose "status" in girls-data.js matches, grouped by her
   qualifying group, using the T (thumbnail) image.

   Set a girl's status in girls-data.js to, for example:
   "Qualified", "Eliminated" or "Wildcard".

   Load order: girls-data.js, site.js, status-list.js
========================================================= */

const STATUS_PAGES = {

    wildcard: {
        title: "Wildcard Stage",
        subtitle: "These girls are in the wildcard stage, fighting for a last place in the tournament.",
        badge: "wildcard",
        empty: "No girls are in the wildcard stage yet.",
        matches: girl => String(girl.status || "").toLowerCase().includes("wildcard")
    },

    eliminated: {
        title: "Eliminated Girls",
        subtitle: "These girls are out of the tournament.",
        badge: "eliminated",
        empty: "No girls have been eliminated yet.",
        matches: girl => getStatusKey(girl) === "eliminated"
    },

    qualified: {
        title: "Qualifying Girls",
        subtitle: "These girls have qualified for the tournament stage.",
        badge: "qualified",
        empty: "No girls have qualified yet.",
        matches: girl => getStatusKey(girl) === "qualified"
    }

};


/* =========================================================
   BUILD PAGE
========================================================= */

function buildStatusPage() {

    const key = document.body.dataset.statusPage;
    const config = STATUS_PAGES[key];

    if (!config) {
        return;
    }

    const girlsHere = getAllGirls().filter(config.matches);

    document.title = `${config.title} | MEGA Messy Tournament`;

    document.getElementById("statusTitle").textContent = config.title;
    document.getElementById("statusSubtitle").textContent = config.subtitle;
    document.getElementById("girlCount").textContent = girlsHere.length;

    const list = document.getElementById("statusList");

    list.innerHTML = "";

    if (girlsHere.length === 0) {

        const empty = document.createElement("div");

        empty.className = "status-empty";
        empty.textContent = config.empty;

        list.appendChild(empty);

        return;
    }

    /* ---------- group by qualifying group ---------- */

    const byGroup = new Map();

    girlsHere.forEach(girl => {

        const group = girl.group || 0;

        if (!byGroup.has(group)) {
            byGroup.set(group, []);
        }

        byGroup.get(group).push(girl);

    });

    [...byGroup.keys()].sort((a, b) => {

        // girls with no group go last
        if (a === 0) { return 1; }
        if (b === 0) { return -1; }

        return a - b;

    }).forEach(group => {

        const section = document.createElement("section");

        section.className = "status-group";

        const heading = document.createElement("h2");

        heading.className = "status-group-heading";

        if (group) {

            const link = document.createElement("a");

            link.href = getGroupURL(group);
            link.textContent = `Qualifying Group ${group}`;

            heading.appendChild(link);

        } else {
            heading.textContent = "No group assigned";
        }

        const grid = document.createElement("div");

        grid.className = "group-girls-grid";

        byGroup.get(group).forEach(girl => {
            grid.appendChild(createStatusCard(girl, config));
        });

        section.appendChild(heading);
        section.appendChild(grid);

        list.appendChild(section);

    });

}


/* =========================================================
   GIRL CARD
   (uses the same card styles as the group page)
========================================================= */

function createStatusCard(girl, config) {

    const card = document.createElement("div");

    card.className = "group-girl-card";

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

            <div class="group-status-badge ${config.badge}">
                ${escapeHTML(girl.status || config.title)}
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

    /*
        T (thumbnail) image. The path comes from the site root,
        so it is correct from this page (one folder deep).
        If a thumbnail is missing, the first profile image (A)
        is used instead.
    */

    const file = girlImageFileName(girl.id);
    const image = card.querySelector(".group-girl-image");

    image.addEventListener("error", function fallback() {

        image.removeEventListener("error", fallback);

        image.src = siteURL(`assets/girls/A/${file}`);

    });

    image.src = siteURL(`assets/girls/T/${file}`);

    return card;

}


buildStatusPage();
