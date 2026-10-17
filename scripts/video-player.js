// JavaScript Document
/* =========================================================
   CUSTOM VIDEO PLAYER
========================================================= */

const videoPlayer =
    document.getElementById("videoPlayer");

const video =
    document.getElementById("mainVideo");

const thumbnail =
    document.getElementById("videoThumbnail");

const thumbnailPlay =
    document.getElementById("thumbnailPlay");

const controls =
    document.getElementById("videoControls");

const playPause =
    document.getElementById("playPause");

const muteButton =
    document.getElementById("muteButton");

const volumeSlider =
    document.getElementById("volumeSlider");

const progressContainer =
    document.getElementById("progressContainer");

const progressFilled =
    document.getElementById("progressFilled");

const timeDisplay =
    document.getElementById("timeDisplay");

const fullscreenButton =
    document.getElementById("fullscreenButton");


let controlsTimer;


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
}


/* =========================================================
   PLAY / PAUSE
========================================================= */

function togglePlay() {

    if (video.paused) {

        video.play();

    } else {

        video.pause();

    }

}


/* =========================================================
   UPDATE PLAY BUTTON
========================================================= */

function updatePlayButton() {

    if (video.paused) {

        playPause.textContent = "▶";
        playPause.setAttribute(
            "aria-label",
            "Play"
        );

    } else {

        playPause.textContent = "❚❚";
        playPause.setAttribute(
            "aria-label",
            "Pause"
        );

    }

}


/* =========================================================
   THUMBNAIL
========================================================= */

thumbnailPlay.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        thumbnail.classList.add("hidden");

        video.play();

    }
);


/* =========================================================
   VIDEO CLICK
========================================================= */

video.addEventListener(
    "click",
    togglePlay
);


/* =========================================================
   PLAY BUTTON
========================================================= */

playPause.addEventListener(
    "click",
    togglePlay
);


/* =========================================================
   VIDEO EVENTS
========================================================= */

video.addEventListener(
    "play",
    () => {

        thumbnail.classList.add("hidden");

        updatePlayButton();

        showControls();

    }
);


video.addEventListener(
    "pause",
    () => {

        updatePlayButton();

        showControls();

    }
);


video.addEventListener(
    "ended",
    () => {

        updatePlayButton();

        thumbnail.classList.remove("hidden");

        showControls();

    }
);


/* =========================================================
   PROGRESS
========================================================= */

video.addEventListener(
    "timeupdate",
    () => {

        if (!video.duration) {
            return;
        }

        const percentage =
            (video.currentTime / video.duration) * 100;

        progressFilled.style.width =
            `${percentage}%`;

        timeDisplay.textContent =
            `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;

    }
);


/* =========================================================
   SEEK
========================================================= */

progressContainer.addEventListener(
    "click",
    event => {

        if (!video.duration) {
            return;
        }

        const rect =
            progressContainer.getBoundingClientRect();

        const position =
            (event.clientX - rect.left) /
            rect.width;

        video.currentTime =
            position * video.duration;

    }
);


/* =========================================================
   VOLUME
========================================================= */

volumeSlider.addEventListener(
    "input",
    () => {

        video.volume =
            Number(volumeSlider.value);

        video.muted =
            video.volume === 0;

        updateMuteButton();

    }
);


/* =========================================================
   MUTE
========================================================= */

muteButton.addEventListener(
    "click",
    () => {

        video.muted = !video.muted;

        updateMuteButton();

    }
);


function updateMuteButton() {

    if (
        video.muted ||
        video.volume === 0
    ) {

        muteButton.textContent = "🔇";

    } else {

        muteButton.textContent = "🔊";

    }

}


/* =========================================================
   FULLSCREEN
========================================================= */

fullscreenButton.addEventListener(
    "click",
    async () => {

        try {

            if (!document.fullscreenElement) {

                await videoPlayer.requestFullscreen();

            } else {

                await document.exitFullscreen();

            }

        } catch (error) {

            console.error(
                "Fullscreen error:",
                error
            );

        }

    }
);


/* =========================================================
   CONTROLS AUTO-HIDE
========================================================= */

function showControls() {

    controls.classList.remove("hidden");

    clearTimeout(controlsTimer);

    if (!video.paused) {

        controlsTimer = setTimeout(
            () => {

                controls.classList.add("hidden");

            },
            2500
        );

    }

}


videoPlayer.addEventListener(
    "mousemove",
    showControls
);

videoPlayer.addEventListener(
    "touchstart",
    showControls,
    { passive: true }
);


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
            Don't intercept typing in form fields.
        */

        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        ) {
            return;
        }


        /* SPACE */

        if (event.code === "Space") {

            event.preventDefault();

            togglePlay();

        }


        /* LEFT ARROW */

        if (event.code === "ArrowLeft") {

            video.currentTime =
                Math.max(
                    0,
                    video.currentTime - 5
                );

        }


        /* RIGHT ARROW */

        if (event.code === "ArrowRight") {

            video.currentTime =
                Math.min(
                    video.duration || 0,
                    video.currentTime + 5
                );

        }

    }
);


/* =========================================================
   INITIAL STATE
========================================================= */

video.volume = 1;

volumeSlider.value = 1;

updatePlayButton();

updateMuteButton();