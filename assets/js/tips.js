const tips=[
  "Take 10 deep breaths slowly.",
  "Drink a glass of water now.",
  "Walk for 5 minutes outside.",
  "Listen to calming music.",
  "Write 3 things you're grateful for.",
  "Do a 2-minute stretch break.",
  "Clean your desk for 1 minute (reduces mental clutter).",
  "Try the 25-5 rule: 25 min focus, 5 min rest."
];
function randomTip(){
  const tip=tips[Math.floor(Math.random()*tips.length)];
  $("randomTipBox").innerHTML="🌟 <b>"+tip+"</b>";
}
