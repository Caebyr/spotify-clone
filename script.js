console.log("Welcome to spotify")
// audioElement.play();

//Initializing variables
let songIndex = 0;
let audioElement = new Audio('Kendrick-Lamar-feat-SZA-luther-(Oksoundit.com).mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let masterSongName = document.getElementById('masterSongName');


let songs = [
    {songName: "LOVE.FEAT.ZACARI",filePath: "songs/songs_1.mp3", coverPath: "/home/kabir/repos/spotify-clone/Kendrick_Lamar_-_Damn.png"},

    {songName: "DNA.",filePath: "songs/songs_2.mp3", coverPath: "/home/kabir/repos/spotify-clone/Kendrick_Lamar_-_Damn.png"},

    {songName: "HUMBLE.",filePath: "songs/songs_3.mp3", coverPath: "/home/kabir/repos/spotify-clone/Kendrick_Lamar_-_Damn.png"},

    {songName: "tv off(feat.lefty gunplay)",filePath: "songs/songs_4.mp3", coverPath: "/home/kabir/repos/spotify-clone/Kendrick_GNX.png"},

    {songName: "luther(with sza)",filePath: "songs/songs_5.mp3", coverPath: "/home/kabir/repos/spotify-clone/Kendrick_GNX.png"},
    
    {songName: "heart pt.6",filePath: "songs/songs_6.mp3", coverPath: "/home/kabir/repos/spotify-clone/Kendrick_GNX.png"},

    {songName: "Count me out",filePath: "songs/songs_7.mp3", coverPath: "Kendrick_Lamar_-_Mr._Morale_&_the_Big_Steppers.png"},

    {songName: "Die Hard",filePath: "songs/songs_8.mp3", coverPath: "Kendrick_Lamar_-_Mr._Morale_&_the_Big_Steppers.png"},

    {songName: "Not Like Us",filePath: "songs/songs_9.mp3", coverPath: "/home/kabir/repos/spotify-clone/Kendrick_Lamar_-_Not_Like_Us.png"},
]

// songItems.forEach(element,i => {
//     element.getElementsByTagName("img")[0].src = songs[i].coverPath;
//     element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
// });

// masterPlay.addEventListener('click',()=>{
//     if(audioElement.paused || audioElement.currentTime<=0){
//         audioElement.play();
//         masterPlay.classList.remove('fa-circle-play');
//         masterPlay.classList.add('fa-circle-pause');
//         gif.style.opacity = 1;
//     }
//     else{
//         audioElement.pause();
//         masterPlay.classList.remove('fa-circle-pause');
//         masterPlay.classList.add('fa-circle-play');
//         gif.style.opacity = 0;
//     }
// })

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        // Update the small play button for the currently playing song
        makeAllPlay();
        let currentSongItem = document.getElementById(songIndex);
        if (currentSongItem) {
            currentSongItem.classList.remove('fa-play');
            currentSongItem.classList.add('fa-pause');
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

        // Update the small play button for the currently playing song
        let currentSongItem = document.getElementById(songIndex);
        if (currentSongItem) {
            currentSongItem.classList.remove('fa-pause');
            currentSongItem.classList.add('fa-play');
        }
    }
});


audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressbar.value = progress;
})

myProgressbar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressbar.value * audioElement.duration)/100;
})

const makeAllPlay = ()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/songs_${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    })
})

// previous.addEventListener('click',()=>{
//     if(songIndex <= 0){
//         songIndex = 8;
//     }
//     else{
//         songIndex -=1;
//     }
//     audioElement.src = `songs/songs_${songIndex + 1}.mp3`;
//     masterSongName.innerText = songs[songIndex].songName;
//     audioElement.currentTime = 0;
//     audioElement.play();
//     masterPlay.classList.remove('fa-circle-play');
//     masterPlay.classList.add('fa-circle-pause');
// })

// next.addEventListener('click',()=>{
//     if(songIndex >= 8){
//         songIndex = 0;
//     }
//     else{
//         songIndex +=1;
//     }
//     audioElement.src = `songs/songs_${songIndex + 1}.mp3`;
//     masterSongName.innerText = songs[songIndex].songName;
//     audioElement.currentTime = 0;
//     audioElement.play();
//     masterPlay.classList.remove('fa-circle-play');
//     masterPlay.classList.add('fa-circle-pause');
// })

previous.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    updateSong();
});

next.addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    updateSong();
});

function updateSong() {
    // Update the audio source and song name
    audioElement.src = `songs/songs_${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update the main play button
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    // Update the small play buttons
    makeAllPlay();
    let currentSongItem = document.getElementById(songIndex);
    if (currentSongItem) {
        currentSongItem.classList.remove('fa-play');
        currentSongItem.classList.add('fa-pause');
    }
}
