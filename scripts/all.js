// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   ALL GIRLS PAGE  (girls/all.html)

   Builds the filter menus and one card per girl from
   girls-data.js. Add a girl to the database and she appears
   here automatically.

   Load order: girls-data.js, site.js, all.js
========================================================= */

const statusFilter = document.getElementById("statusFilter");
const messFilter = document.getElementById("messFilter");
const sourceFilter = document.getElementById("sourceFilter");
const searchBox = document.getElementById("searchBox");
const resetFilters = document.getElementById("resetFilters");
const girlsGrid = document.getElementById("girlsGrid");

const STATUS_LABELS = {
    qualified: "Qualified",
    remaining: "Competing",
    eliminated: "Eliminated"
};


/* =========================================================
   FILTER MENUS (from MESS_TYPES / MEDIA_SOURCE_TYPES)
========================================================= */

function fillSelect(select, items) {

    items.forEach(item => {

        const option = document.createElement("option");

        option.value = toKey(item);
        option.textContent = item;

        select.appendChild(option);

    });

}

fillSelect(messFilter, MESS_TYPES);
fillSelect(sourceFilter, MEDIA_SOURCE_TYPES);


/* =========================================================
   CARDS
========================================================= */

function createGirlCard(girl) {

    const card = document.createElement("div");

    card.className = "girl-card";

    card.dataset.status = getStatusKey(girl);
    card.dataset.name = girl.name.toLowerCase();
    card.dataset.messType = getMessKey(girl);
    card.dataset.source = getSourceKey(girl);

    const statusKey = getStatusKey(girl);

    card.innerHTML = `

        <div class="girl-image-wrapper">
            <img class="girl-image" alt="${escapeHTML(girl.name)}" loading="lazy">
        </div>

        <div class="girl-info">
            <div class="girl-card-number">Girl ${escapeHTML(girl.id)}</div>
            <div class="girl-card-name">${escapeHTML(girl.name)}</div>
            <div class="status-badge ${statusKey}">
                ${escapeHTML(STATUS_LABELS[statusKey])}
            </div>
            <br>
            <a class="profile-button" href="${escapeHTML(getGirlProfileURL(girl.id))}">
                View Profile
            </a>
        </div>

    `;

    /*
        Use the thumbnail (folder T). If it is missing,
        fall back to the first profile image (folder A).
    */

    const image = card.querySelector(".girl-image");

    image.addEventListener("error", function fallback() {

        image.removeEventListener("error", fallback);

        image.src = getGirlImageA(girl.id);

    });

    image.src = getGirlThumbnail(girl.id);

    return card;

}

getAllGirls().forEach(girl => {
    girlsGrid.appendChild(createGirlCard(girl));
});

const noResults = document.createElement("div");

noResults.className = "no-results";
noResults.textContent = "No girls match your filters.";
noResults.hidden = true;

girlsGrid.appendChild(noResults);


/* =========================================================
   FILTERING
========================================================= */

function updateCards() {

    const statusValue = statusFilter.value;
    const messValue = messFilter.value;
    const sourceValue = sourceFilter.value;
    const searchValue = searchBox.value.toLowerCase().trim();

    let visible = 0;

    girlsGrid.querySelectorAll(".girl-card").forEach(card => {

        const match =
            (statusValue === "all" || card.dataset.status === statusValue) &&
            (messValue === "all" || card.dataset.messType === messValue) &&
            (sourceValue === "all" || card.dataset.source === sourceValue) &&
            card.dataset.name.includes(searchValue);

        card.hidden = !match;

        if (match) {
            visible++;
        }

    });

    noResults.hidden = visible > 0;

}

[statusFilter, messFilter, sourceFilter].forEach(select => {
    select.addEventListener("change", updateCards);
});

searchBox.addEventListener("input", updateCards);

resetFilters.addEventListener("click", () => {

    statusFilter.value = "all";
    messFilter.value = "all";
    sourceFilter.value = "all";
    searchBox.value = "";

    updateCards();

});

updateCards();
