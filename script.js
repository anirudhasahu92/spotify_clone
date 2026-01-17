console.log('Welcome to Spotify')

// Initialize the variables:
let songIndex=1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem')); // using Array.from since foreach won't work directly for an HTML collection 


let songs = [
    {songName:"Salam-e-ishq",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Dilbar-mp3",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"Kal Ho Na ho - mp3",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Toxic - mp3",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Kaho na pyaar he - mp3 music",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Don title song - mp3",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Dhoom title song - mp3",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName:"Ek Ajnabee song - mp3",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
    {songName:"Aaj Ki Raat - mp3",filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
    {songName:"Reunion - mp3",filePath:"songs/10.mp3",coverPath:"covers/10.jpg"}
    ]

songItems.forEach((Element,i)=>{
    Element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
    
// audioElement.play();
// is happening because you're trying to run a browser-specific JavaScript API (Audio) in a Node.js environment.

// 👉 new Audio('1.mp3') works in the browser because the Audio constructor is part of the Web Audio API — not Node.js.

// Handle play-pause onclick:
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

//Listen to events:
audioElement.addEventListener('timeupdate',()=>{
    // seek bar update:
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

let makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element)=>{
        Element.classList.remove('fa-circle-pause');
        Element.classList.add('fa-circle-play')});
}

// Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element)=>{
//     Element.addEventListener('click', (e)=>{
//         makeAllPlays();
//         e.target.classList.remove('fa-circle-play');
//         e.target.classList.add('fa-circle-pause');
//         audioElement.src='songs/3.mp3';
//         audioElement.currentTime=0;
//         audioElement.play();
//     })
// })

// Add click event listeners to each play/pause icon
// Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element) => {
//     Element.addEventListener('click', (e) => {
//         // If the clicked song is already playing
//         if (!audioElement.paused && audioElement.currentTime > 0) {
//             // Pause the audio
//             audioElement.pause();
//             // Change the icon to play
//             e.target.classList.remove('fa-circle-pause');
//             e.target.classList.add('fa-circle-play');
//             masterPlay.classList.remove('fa-circle-pause');
//             masterPlay.classList.add('fa-circle-play');
//             gif.style.opacity=0;

//         } 
//         else {
//             // First, make all icons show play
//             makeAllPlays();
            
//             // Set the new song source if you want (can also vary by song index)
//             songIndex= parseInt(e.target.id);
//             audioElement.src = `songs/${songIndex}.mp3`;
//             masterSongName.innerText = songs[songIndex].songName; 
//             audioElement.currentTime = 0;
//             audioElement.play();

//             // Change the clicked button to show pause
//             e.target.classList.remove('fa-circle-play');
//             e.target.classList.add('fa-circle-pause');
//             masterPlay.classList.remove('fa-circle-play');
//             masterPlay.classList.add('fa-circle-pause');
//             gif.style.opacity=1;

//         }
//     });
// });

let currentSongIndex = null; // keep track of currently playing song

Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element) => {
    Element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);

        // 🟡 CASE 1: Same song clicked again
        if (currentSongIndex === clickedIndex) {
            if (!audioElement.paused) {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity = 0;
            } else {
                audioElement.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
            }
        } 
        // 🟢 CASE 2: A different song is clicked
        else {
            makeAllPlays(); // reset all icons
            currentSongIndex = clickedIndex;
            songIndex = clickedIndex; // optional if you use both
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();

            // Update icons
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    });
});


// Next button functionality:
document.getElementById("next").addEventListener('click',()=>{
    if (songIndex>=10){
        songIndex=1;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName; 
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

// Previous button functionality:
document.getElementById("previous").addEventListener('click',()=>{
    if (songIndex<=1){
        songIndex=1;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName; 
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

// Play next song when the current song ends:
audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length) {
        songIndex = 1; // loop back to first song
    } else {
        songIndex += 1;
    }

    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    // Reset and update icons
    makeAllPlays();
    let currentBtn = document.getElementById(songIndex);
    if (currentBtn) {
        currentBtn.classList.remove('fa-circle-play');
        currentBtn.classList.add('fa-circle-pause');
    }
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
});
