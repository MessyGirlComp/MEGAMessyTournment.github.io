// JavaScript Document
/* =========================================================
   PROFILE IMAGE CAROUSEL
========================================================= */

const carouselTrack = document.getElementById("carouselTrack");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const dots = document.querySelectorAll(".carousel-dot");

let currentSlide = 0;
let carouselTimer;

const totalSlides = 3;


/* ================= SHOW SLIDE ================= */

function showSlide(index) {

    if (index < 0) {
        index = totalSlides - 1;
    }

    if (index >= totalSlides) {
        index = 0;
    }

    currentSlide = index;

    carouselTrack.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, dotIndex) => {

        dot.classList.toggle(
            "active",
            dotIndex === currentSlide
        );

    });
}


/* ================= NEXT ================= */

function nextSlide() {

    showSlide(currentSlide + 1);

    restartCarousel();

}


/* ================= PREVIOUS ================= */

function previousSlide() {

    showSlide(currentSlide - 1);

    restartCarousel();

}


/* ================= DOTS ================= */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

        restartCarousel();

    });

});


/* ================= BUTTONS ================= */

nextButton.addEventListener(
    "click",
    nextSlide
);

prevButton.addEventListener(
    "click",
    previousSlide
);


/* ================= AUTOMATIC ================= */

function startCarousel() {

    carouselTimer = setInterval(
        nextSlide,
        4000
    );

}


function restartCarousel() {

    clearInterval(carouselTimer);

    startCarousel();

}


/* ================= TOUCH SWIPE ================= */

let touchStartX = 0;

carouselTrack.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


carouselTrack.addEventListener(
    "touchend",
    event => {

        const touchEndX =
            event.changedTouches[0].screenX;

        const difference =
            touchStartX - touchEndX;

        if (Math.abs(difference) < 50) {
            return;
        }

        if (difference > 0) {
            nextSlide();
        } else {
            previousSlide();
        }

    },
    { passive: true }
);


/* ================= START ================= */

showSlide(0);
startCarousel();