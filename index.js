const title = document.querySelector("h2");
const artist = document.querySelector("h3");
const music = document.querySelector("audio");
const progressContainer = document.querySelector(".progress-bar-container");
const progress = document.querySelector(".progress");
const currentTimeElement = document.querySelector("#current-time");
const durationElement = document.querySelector("#duration");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

// PHASES album songs
const songs = [
    {
        name: "intro",
        displayName: "INTRO",
        artist: "Chase Atlantic",
    },
    {
        name: "angels",
        displayName: "ANGELS",
        artist: "Chase Atlantic",
    },
    {
        name: "phases",
        displayName: "PHASES",
        artist: "Chase Atlantic",
    },
    {
        name: "love-is-not-easy",
        displayName: "LOVE IS (NOT) EASY",
        artist: "Chase Atlantic",
    },
    {
        name: "her",
        displayName: "HER",
        artist: "Chase Atlantic",
    },
    {
        name: "no-rainbows",
        displayName: "NO RAINBOWS",
        artist: "Chase Atlantic",
    },
    {
        name: "heaven-and-back",
        displayName: "HEAVEN AND BACK",
        artist: "Chase Atlantic",
    },
    {
        name: "stuckinmybrain",
        displayName: "STUCKINMYBRAIN",
        artist: "Chase Atlantic",
    },
    {
        name: "even-though-im-depressed",
        displayName: "EVEN THOUGH I'M DEPRESSED",
        artist: "Chase Atlantic",
    },
    {
        name: "too-late",
        displayName: "TOO LATE",
        artist: "Chase Atlantic",
    },
    {
        name: "i-never-existed",
        displayName: "I NEVER EXISTED",
        artist: "Chase Atlantic",
    },
    {
        name: "i-dont-like-darkness",
        displayName: "I DON'T LIKE DARKNESS",
        artist: "Chase Atlantic",
    },
];

// check if playing
let isPlaying = false;


// play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

// pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

// play or pause
playBtn.addEventListener("click", function(){
    isPlaying ? pauseSong() : playSong();
});

// update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `assets/mp3/${song.name}.mp3`; /* using `` to write a string with a variable in it */
}

// current song
let songIndex = 0; /* using let because it's a variable that changes */

// previous song
function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// next song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// on load - selecting first song
loadSong(songs[songIndex]);

// updating progress bar and time
function updateProgressBar(event){
    if (isPlaying){
        const {duration, currentTime} = event.srcElement;
        // updating progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`; // transforming percent into string to change value in CSS

        // updating duration for each song
        // minutes
        const durationMinutes = Math.floor(duration / 60); /* duration is originally in seconds, we need minutes */
        // seconds
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10){ // we need two digits
            durationSeconds = `0${durationSeconds}`;
        }
        // delay switching duration to avoid NaN showing up on screen
        if (durationSeconds){
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // updating current time for each song
        const currentMinutes = Math.floor(currentTime / 60);
        // seconds
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10){ // we need two digits
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// setting progress bar to change song's current time
function setProgressBar(event){
    const width = this.clientWidth;
    const clickBar = event.offsetX;
    const {duration} = music;
    /*The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.*/
    music.currentTime = (clickBar / width) * duration;
}


// previous and next buttons
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// progress bar
music.addEventListener("timeupdate", updateProgressBar);

// progress container (change to a different time when clicking on bar)
progressContainer.addEventListener("click", setProgressBar);

// when song is over, go to the next one
music.addEventListener("ended", nextSong);