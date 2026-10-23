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


/* =========================================================
   SETTINGS
========================================================= */

/* Paste the two Microsoft Forms links here (full https:// URLs) */

const HELP_FEEDBACK_URL = "https://forms.cloud.microsoft/r/XUywaaPNMN";
const HELP_REPORT_URL = "https://forms.cloud.microsoft/r/g6jTczdrEw";

/* How many girls go in each sub-dropdown of "Girls Profiles" */

const GIRLS_PER_DROPDOWN = 50;

/* Most results the search box shows for each type */

const SEARCH_LIMITS = { page: 5, group: 5, girl: 10 };


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

function isRealURL(value) {

    return /^https?:\/\//i.test(String(value ?? ""));

}


/* =========================================================
   GIRLS DROPDOWN (split into sub-dropdowns)
========================================================= */

function buildGirlsMenu() {

    const allGirls = getAllGirls();

    if (allGirls.length === 0) {
        return "<a href=\"#\">No girls yet</a>";
    }

    let html = "";

    for (let i = 0; i < allGirls.length; i += GIRLS_PER_DROPDOWN) {

        const chunk = allGirls.slice(i, i + GIRLS_PER_DROPDOWN);

        const first = chunk[0].id;
        const last = chunk[chunk.length - 1].id;

        const links = chunk.map(girl => `
            <a href="${escapeHTML(getGirlProfileURL(girl.id))}">
                Girl ${escapeHTML(girl.id)} &ndash; ${escapeHTML(girl.name)}
            </a>
        `).join("");

        html += `
            <div class="dropdown-sub">
                <button type="button" class="dropdown-sub-button">
                    Girls ${escapeHTML(first)}&ndash;${escapeHTML(last)}
                    <span>&#9656;</span>
                </button>
                <div class="submenu">${links}</div>
            </div>
        `;

    }

    return html;

}


/* =========================================================
   HEADER
========================================================= */

function renderSiteHeader() {

    const target = document.getElementById("siteHeader");

    if (!target) {
        return;
    }

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
                            Girls Profiles <span>&#8964;</span>
                        </button>

                        <div class="dropdown-menu has-submenus">
                            ${buildGirlsMenu()}
                        </div>

                    </div>


                    <div class="nav-dropdown">

                        <button type="button" class="dropdown-button">
                            Help <span>&#8964;</span>
                        </button>

                        <div class="dropdown-menu align-right">
                            <a href="${escapeHTML(isRealURL(HELP_FEEDBACK_URL) ? HELP_FEEDBACK_URL : "#")}"
                               data-help-form="Feedback Form"
                               ${isRealURL(HELP_FEEDBACK_URL) ? 'target="_blank" rel="noopener noreferrer"' : ""}>Feedback Form</a>
                            <a href="${escapeHTML(isRealURL(HELP_REPORT_URL) ? HELP_REPORT_URL : "#")}"
                               data-help-form="Report Form"
                               ${isRealURL(HELP_REPORT_URL) ? 'target="_blank" rel="noopener noreferrer"' : ""}>Report Form</a>
                        </div>

                    </div>

                </nav>

                <form class="header-search" role="search" autocomplete="off">

                    <input
                        type="search"
                        id="siteSearchInput"
                        placeholder="Search girls, groups, pages..."
                        aria-label="Search the site"
                        aria-controls="siteSearchResults"
                        aria-autocomplete="list"
                    >

                    <div class="search-results" id="siteSearchResults" role="listbox" hidden></div>

                </form>

            </div>

        </header>

    `;

    setupHelpLinks();
    setupSiteSearch();

}


/* =========================================================
   HELP LINKS
   (a link that has not been filled in yet shows a message)
========================================================= */

function setupHelpLinks() {

    document.querySelectorAll("[data-help-form]").forEach(link => {

        if (link.getAttribute("href") !== "#") {
            return;
        }

        link.addEventListener("click", event => {

            event.preventDefault();

            alert(`The ${link.dataset.helpForm} link has not been added yet.`);

        });

    });

}


/* =========================================================
   SEARCH
   ---------------------------------------------------------
   Searches pages, qualifying groups and girls.
   Every word typed must match the start of a word in the
   item, so "group 4", "gunge", "flushed", "amy" or "007"
   all work.
========================================================= */

const SEARCH_PAGES = [

    { title: "Home", path: "index.html", keywords: "main start front" },
    { title: "All Girls", path: "girls/all.html", keywords: "contestants browse everyone list filter" },

    { title: "Qualifying Stage: Group Stages", path: "qualifying/groups/index.html", keywords: "qualifying groups" },
    { title: "Qualifying Stage: Wildcard Stage", path: "qualifying/wildcard.html", keywords: "qualifying wildcard" },
    { title: "Qualifying Stage: Eliminated Girls", path: "qualifying/eliminated.html", keywords: "qualifying out knocked" },
    { title: "Qualifying Stage: Qualifying Girls", path: "qualifying/qualified.html", keywords: "qualifying qualified through winners" },

    { title: "Tournament Stage: Group Stages", path: "tournament/groups/index.html", keywords: "tournament groups" },
    { title: "Tournament Stage: Round of 32", path: "tournament/round32.html", keywords: "tournament round 32 last" },
    { title: "Tournament Stage: Quarter Finals", path: "tournament/quarter-finals.html", keywords: "tournament quarter final" },
    { title: "Tournament Stage: Semi Finals", path: "tournament/semi-finals.html", keywords: "tournament semi final" },
    { title: "Tournament Stage: Grand Finals", path: "tournament/grand-finals.html", keywords: "tournament grand final winner champion" },
    { title: "Tournament Stage: 3rd Place Match", path: "tournament/third-place.html", keywords: "tournament third place bronze" },


    { title: "Help: Feedback Form", url: HELP_FEEDBACK_URL, keywords: "help feedback suggestion comment contact", external: true },
    { title: "Help: Report Form", url: HELP_REPORT_URL, keywords: "help report problem issue bug error contact", external: true }

];

let searchIndex = null;


function searchWords(text) {

    return String(text ?? "")
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean);

}

function makeSearchItem(type, title, sub, url, extraText, external) {

    const words = searchWords(`${title} ${sub} ${extraText}`);

    // "001" can also be found by typing "1"
    words.forEach(word => {

        if (/^\d+$/.test(word) && /^0+\d/.test(word)) {
            words.push(word.replace(/^0+/, ""));
        }

    });

    return {
        type: type,
        title: title,
        sub: sub,
        url: url,
        external: Boolean(external),
        titleLower: String(title).toLowerCase(),
        words: words
    };

}

function buildSearchIndex() {

    const items = [];

    /* pages */

    SEARCH_PAGES.forEach(page => {

        const url = page.url !== undefined ? page.url : siteURL(page.path);

        // A form link that has not been filled in yet is left out
        if (page.external && !isRealURL(url)) {
            return;
        }

        items.push(makeSearchItem(
            "page", page.title, "Page", url, page.keywords, page.external
        ));

    });

    /* groups */

    const groupNumbers = [
        ...new Set(getAllGirls().map(girl => girl.group).filter(Boolean))
    ].sort((a, b) => a - b);

    groupNumbers.forEach(number => {

        const count = getGirlsByGroup(number).length;

        items.push(makeSearchItem(
            "group",
            `Qualifying Group ${number}`,
            `${count} ${count === 1 ? "girl" : "girls"}`,
            getGroupURL(number),
            `group ${number} qualifying`
        ));

    });

    /* girls */

    getAllGirls().forEach(girl => {

        const details = [
            girl.group ? `Group ${girl.group}` : "",
            girl.from,
            girl.messType
        ].filter(Boolean).join(" \u2022 ");

        items.push(makeSearchItem(
            "girl",
            `${girl.name} (Girl ${girl.id})`,
            details,
            getGirlProfileURL(girl.id),
            `girl ${girl.id} ${girl.mediaSourceType || ""} ${girl.status || ""}`
        ));

    });

    return items;

}

function runSiteSearch(query) {

    const tokens = searchWords(query);

    if (tokens.length === 0) {
        return [];
    }

    if (!searchIndex) {
        searchIndex = buildSearchIndex();
    }

    const queryLower = tokens.join(" ");

    const typeOrder = { page: 0, group: 1, girl: 2 };

    const matches = [];

    searchIndex.forEach(item => {

        // every typed word must match the start of a word in the item
        const allMatch = tokens.every(token =>
            item.words.some(word => word.startsWith(token))
        );

        if (!allMatch) {
            return;
        }

        let score = 0;

        if (item.titleLower.startsWith(queryLower)) {
            score += 100;
        }

        tokens.forEach(token => {
            if (item.words.includes(token)) {
                score += 10;
            }
        });

        matches.push({ item: item, score: score });

    });

    matches.sort((a, b) =>
        b.score - a.score ||
        typeOrder[a.item.type] - typeOrder[b.item.type] ||
        a.item.title.localeCompare(b.item.title, undefined, { numeric: true })
    );

    // keep to the limit for each type, then order by type
    const counts = { page: 0, group: 0, girl: 0 };

    const results = [];

    matches.forEach(match => {

        const type = match.item.type;

        if (counts[type] < SEARCH_LIMITS[type]) {
            counts[type]++;
            results.push(match.item);
        }

    });

    results.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);

    return results;

}

function setupSiteSearch() {

    const input = document.getElementById("siteSearchInput");
    const box = document.getElementById("siteSearchResults");

    if (!input || !box) {
        return;
    }

    const form = input.closest("form");

    const typeLabels = { page: "Pages", group: "Groups", girl: "Girls" };

    let results = [];
    let activeIndex = -1;


    function closeResults() {

        box.hidden = true;
        box.innerHTML = "";
        results = [];
        activeIndex = -1;

    }

    function setActive(index) {

        const links = box.querySelectorAll(".search-result");

        if (links.length === 0) {
            return;
        }

        activeIndex = (index + links.length) % links.length;

        links.forEach((link, i) => {
            link.classList.toggle("active", i === activeIndex);
        });

        links[activeIndex].scrollIntoView({ block: "nearest" });

    }

    function render() {

        results = runSiteSearch(input.value);
        activeIndex = -1;

        if (!input.value.trim()) {
            closeResults();
            return;
        }

        if (results.length === 0) {

            box.innerHTML = `<div class="search-empty">No results found.</div>`;
            box.hidden = false;
            return;

        }

        let html = "";
        let lastType = "";

        results.forEach(item => {

            if (item.type !== lastType) {
                html += `<div class="search-heading">${typeLabels[item.type]}</div>`;
                lastType = item.type;
            }

            html += `
                <a class="search-result" role="option"
                   href="${escapeHTML(item.url)}"
                   ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
                    <span class="search-result-title">${escapeHTML(item.title)}</span>
                    <span class="search-result-sub">${escapeHTML(item.sub)}</span>
                </a>
            `;

        });

        box.innerHTML = html;
        box.hidden = false;

    }

    function openResult(item) {

        if (item.external) {
            window.open(item.url, "_blank", "noopener,noreferrer");
        } else {
            window.location.href = item.url;
        }

    }


    input.addEventListener("input", render);

    input.addEventListener("focus", () => {

        if (input.value.trim()) {
            render();
        }

    });

    input.addEventListener("keydown", event => {

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive(activeIndex + 1);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive(activeIndex - 1);
        } else if (event.key === "Escape") {
            closeResults();
            input.blur();
        }

    });

    form.addEventListener("submit", event => {

        event.preventDefault();

        if (results.length === 0) {
            return;
        }

        openResult(results[activeIndex >= 0 ? activeIndex : 0]);

    });

    document.addEventListener("click", event => {

        if (!form.contains(event.target)) {
            closeResults();
        }

    });

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
