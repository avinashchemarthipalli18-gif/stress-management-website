let audio;
window.onload=()=>{ audio=$("audioPlayer"); };
function playSound(type){
  if(!audio) audio=$("audioPlayer");
  if(type==="rain") audio.src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  if(type==="forest") audio.src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
  if(type==="waves") audio.src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";
  audio.play();
}
function stopSound(){ if(!audio) return; audio.pause(); audio.currentTime=0; }
