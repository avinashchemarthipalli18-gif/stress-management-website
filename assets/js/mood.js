function updateSuggestion(m){
  const box=$("moodSuggestion");
  if(m.includes("Happy")) box.innerHTML="Nice! Keep it up 💚<br><span class='small'>Try helping someone today.</span>";
  else if(m.includes("Calm")) box.innerHTML="Great 😌<br><span class='small'>Maintain it with slow breathing.</span>";
  else if(m.includes("Stressed")) box.innerHTML="It’s okay. Try <b>Breathing</b> + <b>Sounds</b> for 5 minutes.<br><span class='small'>One step at a time.</span>";
  else if(m.includes("Sad")) box.innerHTML="Be kind to yourself 💛<br><span class='small'>Talk to a friend or write your thoughts.</span>";
  else box.innerText="Select a mood to see a suggestion.";
}
function saveMood(mood){
  localStorage.setItem("todayMood", mood);
  $("todayMood").innerText=mood;
  updateSuggestion(mood);
  const date=new Date().toISOString().slice(0,10);
  addHistoryEntry({type:"mood", date, mood});
}
function clearMood(){
  localStorage.removeItem("todayMood");
  $("todayMood").innerText="Not Selected";
  updateSuggestion("");
}
window.onload=()=>{ const m=localStorage.getItem("todayMood"); if(m){$("todayMood").innerText=m; updateSuggestion(m);} };
