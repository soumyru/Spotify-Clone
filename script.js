console.log("Welcome to Spotify");

//Initialize the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName: "Ae Dil Hai Mushkil", filePath:"songs/1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "Galat Fehmi", filePath:"songs/2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "Hara Hara Shambhu", filePath:"songs/3.mp3", coverPath: "covers/cover3.jpeg"},
    {songName: "Kesariya", filePath:"songs/4.mp3", coverPath: "covers/cover4.jpeg"},
    {songName: "Khairiyat", filePath:"songs/5.mp3", coverPath: "covers/cover5.jpeg"},
    {songName: "Let Me Down Slowly x Zara Zara - JalRaj", filePath:"songs/6.mp3", coverPath: "covers/cover6.jpeg"},
    {songName: "Love Me Like You Do", filePath:"songs/7.mp3", coverPath: "covers/cover7.jpeg"},
    {songName: "Lut Gaye", filePath:"songs/8.mp3", coverPath: "covers/cover8.jpeg"},
    {songName: "Raatan Lambiyan", filePath:"songs/9.mp3", coverPath: "covers/cover9.jpeg"},
    {songName: "Senorita", filePath:"songs/10.mp3", coverPath: "covers/cover10.jpeg"}
]

songItems.forEach((element, i)=>
{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play()

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})
//listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //update Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100); /*this gives how much has the song already been played*/
    myProgressBar.value=progress;
})

// 100*(currentTime/duration)= percentage  i.e.,myProgress.value
//therefore to find, currentTime=(duration*percentage)/100
myProgressBar.addEventListener('change',()=>
{
    audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100; //this will let us make our song progress as we want it to
})

const makeAllPlays=()=>
{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>
    {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>
{
    element.addEventListener('click',(e)=>
    {
        console.log(e.target);
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songIndex}.mp3`; //here ` ` is used not  ' '
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })

})

document.getElementById('next').addEventListener('click',()=
{
    if(songIndex >= 10)
    {
        songIndex=0
    }
    else
    {
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`; //here ` ` is used not  ' '
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=
{
    if(songIndex<= 0)
    {
        songIndex=0
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`; //here ` ` is used not  ' '
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})