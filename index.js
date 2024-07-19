const title = document.querySelector("h2");
const artist = document.querySelector("h3");
const music = document.querySelector("audio");
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
        name: "heaven-and-back",
        displayName: "HEAVEN AND BACK",
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

// previous and next buttons
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);