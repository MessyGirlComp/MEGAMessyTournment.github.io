// JavaScript Document
// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   PROFILE PAGE  (girls/profiles/profile.html?girl=001)

   profile.html contains the template. This script copies
   it, fills it in from girls-data.js, and wires up the
   carousel and vote button.

   Load order: girls-data.js, site.js, profile.js
========================================================= */

const CAROUSEL_INTERVAL = 5000;

let currentGirl = null;
let currentSlide = 0;
let carouselTimer = null;


/* =========================================================
   GET GIRL ID FROM URL
========================================================= */

function getProfileGirlID() {

    const params = new URLSearchParams(window.location.search);

    return String(params.get("girl") || "001").padStart(3, "0");

}


/* =========================================================
   INITIALISE
========================================================= */

function initialiseProfile() {

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

    const page = template.content.cloneNode(true);

    /* ---------- text fields: data-field="name" ---------- */

    const mediaSource = [girl.from, girl.mediaSourceType]
        .map(value => String(value ?? "").trim())
        .filter(Boolean);

    const values = {
        id: girl.id,
        name: girl.name,
        age: girl.age,
        bio: girl.bio,
        appearance: girl.appearance,
        reaction: girl.reaction,
        reactionLabel: `Reaction to Being ${getMessVerb(girl)}`,
        videoHeading: `Watch ${girl.name} Getting ${getMessVerb(girl)}`,
        status: girl.status,
        group: girl.group ? `Group ${girl.group}` : "",
        qualifyingGroup: girl.group
            ? `Qualifying Group ${girl.group}`
            : "Group not assigned",
        messType: girl.messType,
        mediaSource: mediaSource.join(" • ")
    };

    page.querySelectorAll("[data-field]").forEach(element => {

        element.textContent = displayValue(
            values[element.dataset.field]
        );

    });

    /* ---------- no information: hide the whole field ---------- */

    page.querySelectorAll(".profile-field").forEach(field => {

        const valueElements = field.querySelectorAll(
            "[data-field]:not(.profile-label)"
        );

        if (!valueElements.length) {
            return;
        }

        // Drop any empty piece (e.g. bio: "" while appearance has text)
        valueElements.forEach(element => {

            if (!String(values[element.dataset.field] ?? "").trim()) {
                element.remove();
            }

        });

        // Nothing left: drop the label too
        if (!field.querySelector("[data-field]:not(.profile-label)")) {
            field.remove();
        }

    });

    // Mess Type / Media Source row: remove it if both were hidden
    page.querySelectorAll(".profile-field-row-wrap").forEach(wrap => {

        if (!wrap.querySelector(".profile-field")) {
            wrap.remove();
        }

    });

    /* ---------- "Qualifying Group 7" links to the group page ---------- */

    const groupLink = page.querySelector("[data-group-link]");

    if (groupLink && girl.group) {
        groupLink.href = getGroupURL(girl.group);
        groupLink.style.color = "inherit";
    }

    /* ---------- carousel images (A, B, C) ---------- */

    const slides = [
        { key: "a", label: "First image" },
        { key: "b", label: "Second image" },
        { key: "c", label: "Third image" }
    ];

    // (src is set in setupCarousel, once it knows which extension exists)

    page.querySelectorAll("[data-slide-image]").forEach(image => {

        const slide = slides[Number(image.dataset.slideImage)];

        image.alt = `${girl.name} - ${slide.label}`;

    });

    /* ---------- YouTube iframe ---------- */

    const frame = page.querySelector("[data-video-frame]");

    if (String(girl.youtube ?? "").trim()) {

        frame.src = girl.youtube;
        frame.title = `${girl.name} challenge video`;

        page.querySelector("[data-video-placeholder]").remove();

    } else {

        // No link yet: replace the empty player with a message + thumbnail
        page.querySelector("[data-video-wrapper]").remove();

        const thumb = page.querySelector("[data-video-thumb]");

        setGirlImage(thumb, girl.id, "t");
        thumb.alt = `${girl.name} - thumbnail`;

    }

    /* ---------- put it on the page ---------- */

    target.replaceChildren(page);

    setupCarousel();
    setupVoteButton();

}


/* =========================================================
   CAROUSEL
========================================================= */

function imageExists(source) {

    return new Promise(resolve => {

        const test = new Image();

        test.onload = () => resolve(true);
        test.onerror = () => resolve(false);
        test.src = source;

    });

}

async function setupCarousel() {

    const carousel = document.getElementById("profileCarousel");

    if (!carousel) {
        return;
    }

    /* ---------- drop any image that does not exist ---------- */

    carousel.style.visibility = "hidden";

    const allImages = [...carousel.querySelectorAll(".carousel-image")];
    const allDots = [...carousel.querySelectorAll(".carousel-dot")];

    const slideKeys = ["a", "b", "c"];

    const resolved = await Promise.all(
        allImages.map((image, i) =>
            resolveGirlImage(currentGirl, slideKeys[i])
        )
    );

    allImages.forEach((image, i) => {

        if (resolved[i]) {
            image.src = resolved[i];
        } else {
            image.remove();
            allDots[i].remove();
        }

    });

    const images = carousel.querySelectorAll(".carousel-image");
    const dots = carousel.querySelectorAll(".carousel-dot");

    if (images.length === 0) {
        // No images at all: hide the whole carousel
        carousel.closest(".carousel").remove();
        return;
    }

    if (images.length === 1) {
        // Only one image: nothing to flip through
        carousel.querySelector(".carousel-arrow.prev").remove();
        carousel.querySelector(".carousel-arrow.next").remove();
        carousel.querySelector(".carousel-dots").remove();
    }

    carousel.style.visibility = "";
    const previous = carousel.querySelector(".carousel-arrow.prev");
    const next = carousel.querySelector(".carousel-arrow.next");

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

    if (!currentGirl.group) {

        voteButton.disabled = true;
        voteButton.title =
            "This girl has not been assigned to a group yet.";

        return;
    }

    voteButton.addEventListener("click", () => {

        // Voting happens on the group page (Supabase), so go there
        window.location.href = getGroupURL(Number(currentGirl.group));

    });

}


/* =========================================================
   ERROR
========================================================= */

function showProfileError(message) {

    const template = document.getElementById("errorTemplate");
    const target = document.getElementById("profileContent");

    const page = template.content.cloneNode(true);

    page.querySelector("[data-field='errorMessage']").textContent =
        message;

    page.querySelector("[data-home-link]").href = getAllGirlsURL();

    target.replaceChildren(page);

}


/* =========================================================
   HELPERS
========================================================= */

function displayValue(value) {

    const text = String(value ?? "").trim();

    return text || "Not available";

}


window.addEventListener("beforeunload", () => {
    clearInterval(carouselTimer);
});

initialiseProfile();