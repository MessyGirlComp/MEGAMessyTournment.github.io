// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   PROFILE PAGE

   profile.html contains the template.
   This script copies the template, fills it in with the
   girl's data from girls-data.js, and wires up the carousel
   and vote button.

   Requires girls-data.js to be loaded first.
========================================================= */

const CAROUSEL_INTERVAL = 5000;
const TOTAL_GIRLS = 40;

let currentGirl = null;
let currentSlide = 0;
let carouselTimer = null;


/* =========================================================
   GET GIRL ID FROM URL  (profile.html?girl=001)
========================================================= */

function getProfileGirlID() {

    const params = new URLSearchParams(window.location.search);

    return String(params.get("girl") || "001").padStart(3, "0");

}


/* =========================================================
   NAVIGATION: GIRLS PROFILES DROPDOWN
========================================================= */

function buildGirlsMenu() {

    const menu = document.getElementById("girlsMenu");

    if (!menu) {
        return;
    }

    for (let i = 1; i <= TOTAL_GIRLS; i++) {

        const id = String(i).padStart(3, "0");

        const link = document.createElement("a");

        link.href = `profile.html?girl=${id}`;
        link.textContent = `Girl ${id}`;

        menu.appendChild(link);

    }

}


/* =========================================================
   INITIALISE
========================================================= */

function initialiseProfile() {

    buildGirlsMenu();

    if (typeof getGirl !== "function") {
        showProfileError("The girl database could not be loaded.");
        return;
    }

    const girlID = getProfileGirlID();

    currentGirl = getGirl(girlID);

    if (!currentGirl) {
        showProfileError(
            `Girl ${girlID} could not be found in the database.`
        );
        return;
    }

    document.title = `${currentGirl.name} | MEGA Messy Tournament`;

    renderProfile(currentGirl);

}


/* =========================================================
   FILL IN THE TEMPLATE
========================================================= */

function renderProfile(girl) {

    const template = document.getElementById("profileTemplate");
    const target = document.getElementById("profileContent");

    if (!template || !target) {
        console.error("Profile template or #profileContent is missing.");
        return;
    }

    const page = template.content.cloneNode(true);

    /* ---------- text fields: data-field="name" ---------- */

    const groupText = girl.group
        ? `Group ${girl.group}`
        : "Not assigned";

    const mediaSource = [girl.from, girl.mediaSourceType]
        .map(value => String(value ?? "").trim())
        .filter(Boolean);

    const values = {
        id: girl.id,
        name: girl.name,
        age: girl.age,
        bio: girl.bio,
        appearance: girl.appearance,
        status: girl.status,
        group: groupText,
        qualifyingGroup: girl.group
            ? `Qualifying Group ${girl.group}`
            : "Group not assigned",
        messType: girl.messType,
        mediaSourceType: girl.mediaSourceType,
        from: girl.from,
        mediaSource: mediaSource.join(" \u2022 ")
    };

    page.querySelectorAll("[data-field]").forEach(element => {

        element.textContent = displayValue(
            values[element.dataset.field]
        );

    });

    /* ---------- carousel images (A, B, C) ---------- */

    const slides = [
        { key: "a", label: "First image" },
        { key: "b", label: "Second image" },
        { key: "c", label: "Third image" }
    ];

    page.querySelectorAll("[data-slide-image]").forEach(image => {

        const slide = slides[Number(image.dataset.slideImage)];

        image.src = getGirlAssetPath(girl.id, slide.key);
        image.alt = `${girl.name} - ${slide.label}`;

    });

    /* ---------- YouTube iframe ---------- */

    const frame = page.querySelector("[data-video-frame]");

    frame.src = girl.youtube;
    frame.title = `${girl.name} challenge video`;

    /* ---------- put it on the page ---------- */

    target.replaceChildren(page);

    setupCarousel();
    setupVoteButton();

}


/* =========================================================
   CAROUSEL
========================================================= */

function setupCarousel() {

    const carousel = document.getElementById("profileCarousel");

    if (!carousel) {
        return;
    }

    const images = carousel.querySelectorAll(".carousel-image");
    const dots = carousel.querySelectorAll(".carousel-dot");
    const previous = carousel.querySelector(".carousel-arrow.prev");
    const next = carousel.querySelector(".carousel-arrow.next");

    if (!images.length) {
        return;
    }

    function showSlide(index) {

        currentSlide = (index + images.length) % images.length;

        images.forEach((image, i) => {
            image.classList.toggle("active", i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });

    }

    function restartCarousel() {

        clearInterval(carouselTimer);

        carouselTimer = setInterval(
            () => showSlide(currentSlide + 1),
            CAROUSEL_INTERVAL
        );

    }

    function stopCarousel() {
        clearInterval(carouselTimer);
    }

    previous?.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        restartCarousel();
    });

    next?.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        restartCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            restartCarousel();
        });
    });

    carousel.addEventListener("mouseenter", stopCarousel);
    carousel.addEventListener("mouseleave", restartCarousel);
    carousel.addEventListener("focusin", stopCarousel);
    carousel.addEventListener("focusout", restartCarousel);

    /* Touch swipe */

    let touchStartX = 0;

    carousel.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener("touchend", event => {

        const difference =
            touchStartX - event.changedTouches[0].screenX;

        if (Math.abs(difference) < 50) {
            return;
        }

        showSlide(currentSlide + (difference > 0 ? 1 : -1));
        restartCarousel();

    }, { passive: true });

    showSlide(0);
    restartCarousel();

}


/* =========================================================
   VOTE BUTTON
========================================================= */

function setupVoteButton() {

    const voteButton = document.getElementById("voteButton");

    if (!voteButton || !currentGirl) {
        return;
    }

    if (!currentGirl.group) {

        voteButton.disabled = true;
        voteButton.title =
            "This girl has not been assigned to a group yet.";

        return;
    }

    voteButton.addEventListener("click", () => {

        const group = Number(currentGirl.group);

        const voteLink = getGroupVoteLink(group);

        // Only use a real URL (ignores YOUR_GOOGLE_FORM_... placeholders)
        if (/^https?:\/\//i.test(voteLink)) {

            window.open(voteLink, "_blank", "noopener,noreferrer");
            return;

        }

        window.location.href =
            `../../qualifying/groups/group.html?group=${group}`;

    });

}


/* =========================================================
   ERROR
========================================================= */

function showProfileError(message) {

    const template = document.getElementById("errorTemplate");
    const target = document.getElementById("profileContent");

    if (!template || !target) {
        return;
    }

    const page = template.content.cloneNode(true);

    page.querySelector("[data-field='errorMessage']").textContent =
        message;

    target.replaceChildren(page);

}


/* =========================================================
   HELPERS
========================================================= */

function displayValue(value) {

    const text = String(value ?? "").trim();

    return text || "Not available";

}


/* =========================================================
   CLEANUP + START
========================================================= */

window.addEventListener("beforeunload", () => {
    clearInterval(carouselTimer);
});

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseProfile);
} else {
    initialiseProfile();
}
