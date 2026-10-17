// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   SHARED HEADER + FOOTER

   Every page has:

   <div id="siteHeader"></div>
   ...
   <div id="siteFooter"></div>

   and loads, in this order:

   girls-data.js   then   site.js   then   the page's own script

   Change a link or menu here ONCE and every page updates.
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   HEADER
========================================================= */

function renderSiteHeader() {

    const target = document.getElementById("siteHeader");

    if (!target) {
        return;
    }

    const girlLinks = getAllGirls().map(girl => `
        <a href="${escapeHTML(getGirlProfileURL(girl.id))}">
            Girl ${escapeHTML(girl.id)} &ndash; ${escapeHTML(girl.name)}
        </a>
    `).join("");

    target.innerHTML = `

        <header class="site-header">

            <div class="header-inner">

                <a href="${escapeHTML(siteURL("index.html"))}" class="site-logo">
                    MEGA Messy Tournament
                    <span>Season 1</span>
                </a>

                <nav class="main-nav">

                    <a href="${escapeHTML(siteURL("index.html"))}">Home</a>

                    <a href="${escapeHTML(getAllGirlsURL())}">All Girls</a>

                    <div class="nav-dropdown">

                        <button type="button" class="dropdown-button">
                            Qualifying Stage <span>&#8964;</span>
                        </button>

                        <div class="dropdown-menu">
                            <a href="${escapeHTML(siteURL("qualifying/groups/index.html"))}">Group Stages</a>
                            <a href="${escapeHTML(siteURL("qualifying/wildcard.html"))}">Wildcard Stage</a>
                            <a href="${escapeHTML(siteURL("qualifying/eliminated.html"))}">Eliminated Girls</a>
                            <a href="${escapeHTML(siteURL("qualifying/qualified.html"))}">Qualifying Girls</a>
                        </div>

                    </div>

                    <div class="nav-dropdown">

                        <button type="button" class="dropdown-button">
                            Tournament Stage <span>&#8964;</span>
                        </button>

                        <div class="dropdown-menu">
                            <a href="${escapeHTML(siteURL("tournament/groups/index.html"))}">Group Stages</a>
                            <a href="${escapeHTML(siteURL("tournament/round32.html"))}">Round of 32</a>
                            <a href="${escapeHTML(siteURL("tournament/quarter-finals.html"))}">Quarter Finals</a>
                            <a href="${escapeHTML(siteURL("tournament/semi-finals.html"))}">Semi Finals</a>
                            <a href="${escapeHTML(siteURL("tournament/grand-finals.html"))}">Grand Finals</a>
                            <a href="${escapeHTML(siteURL("tournament/third-place.html"))}">3rd Place Match</a>
                        </div>

                    </div>

                    <div class="nav-dropdown">

                        <button type="button" class="dropdown-button">
                            Girls Profiles <span>&#8964;</span>
                        </button>

                        <div class="dropdown-menu">
                            ${girlLinks || "<a href=\"#\">No girls yet</a>"}
                        </div>

                    </div>

                    <a href="${escapeHTML(siteURL("news/index.html"))}">News</a>

                </nav>

            </div>

        </header>

    `;

}


/* =========================================================
   FOOTER
========================================================= */

function renderSiteFooter() {

    const target = document.getElementById("siteFooter");

    if (!target) {
        return;
    }

    target.innerHTML = `

        <footer class="site-footer">
            <p>&copy; 2026 MEGA Messy Tournament. All rights reserved.</p>
        </footer>

    `;

}


/* =========================================================
   START
   (scripts at the end of <body>, so the page is ready)
========================================================= */

renderSiteHeader();
renderSiteFooter();
