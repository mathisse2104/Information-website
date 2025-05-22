function toggleMenu() {
    const menu = document.getElementById("slidermenu");
    if (menu) {
        menu.classList.toggle("open");
    }
}

// Musicplayer
const music = document.getElementById("background-music");
const titleDisplay = document.getElementById("track-title");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const playlist = [
    { src: "portdanvers.mp3", title: "Port D'anvers" },
    { src: "carrousel.mp3", title: "Carrousel" },
    { src: "u23.mp3", title: "U23 Freestyle" }
];

let currentTrack = 0;

function startMusic() {
    const overlay = document.querySelector(".overlay");
    const content = document.querySelector(".page-content");

    overlay.classList.add("hidden");
    content.classList.add("visible");

    loadTrack(currentTrack);
    music.play().catch(console.error);
}

function loadTrack(index) {
    music.src = playlist[index].src;
    titleDisplay.textContent = playlist[index].title;
    music.load();
}

function togglePlay() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    music.play();
}

function previousTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    music.play();
}

music.addEventListener("timeupdate", () => {
    const progressPercent = (music.currentTime / music.duration) * 100;
    progress.style.width = progressPercent + "%";
    currentTimeEl.textContent = formatTime(music.currentTime);
    durationEl.textContent = formatTime(music.duration);
});

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// Cookies
function acceptCookies() {
    document.getElementById("cookiePopup").style.display = "none";
    localStorage.setItem("cookiesAccepted", "true");
}

function rejectCookies() {
    document.getElementById("cookiePopup").style.display = "none";
}

window.onload = function () {
    if (!localStorage.getItem("cookiesAccepted")) {
        document.getElementById("cookiePopup").style.display = "block";
    }
};
