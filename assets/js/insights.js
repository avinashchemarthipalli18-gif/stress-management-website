function getHistory(){ return JSON.parse(localStorage.getItem("cs_history") || "[]"); }
function saveHistory(arr){ localStorage.setItem("cs_history", JSON.stringify(arr)); }
function addHistoryEntry(entry){ const arr=getHistory(); arr.push(entry); saveHistory(arr); }

function getLast7Days(){
  const today=new Date(); const days=[];
  for(let i=6;i>=0;i--){ const d=new Date(today); d.setDate(today.getDate()-i); days.push(d.toISOString().slice(0,10)); }
  return days;
}
function moodToScore(mood){
  if(!mood) return 0;
  if(mood.includes("Happy")) return 2;
  if(mood.includes("Calm")) return 1;
  if(mood.includes("Stressed")) return -1;
  if(mood.includes("Sad")) return -2;
  return 0;
}
function aggregateWeek(){
  const days=getLast7Days(); const history=getHistory();
  const map={}; days.forEach(d=>map[d]={quiz:null,mood:null});
  history.forEach(h=>{ if(map[h.date]){ if(h.type==="quiz") map[h.date].quiz=h.score; if(h.type==="mood") map[h.date].mood=h.mood; }});
  return {days,map};
}
function drawLineChart(canvasId, values, maxY){
  const c=$(canvasId); if(!c) return;
  const ctx=c.getContext("2d"); const w=c.width, h=c.height;
  ctx.clearRect(0,0,w,h);
  ctx.globalAlpha=0.6;
  for(let i=0;i<=4;i++){
    const y=(h-30)*(i/4)+10;
    ctx.beginPath(); ctx.moveTo(10,y); ctx.lineTo(w-10,y);
    ctx.strokeStyle="rgba(255,255,255,.18)"; ctx.stroke();
  }
  ctx.globalAlpha=1;

  const padX=18, padTop=12, padBottom=22;
  const usableW=w-padX*2, usableH=h-padTop-padBottom;

  const pts=values.map((v,i)=>{
    const x=padX+(usableW*(i/(values.length-1||1)));
    const y=padTop+usableH*(1-(v/maxY));
    return {x,y};
  });

  ctx.beginPath();
  pts.forEach((p,i)=>{ if(i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y); });
  ctx.lineWidth=3; ctx.strokeStyle="rgba(124,92,255,.95)"; ctx.stroke();

  pts.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,4,0,Math.PI*2); ctx.fillStyle="rgba(45,226,230,.95)"; ctx.fill(); });
}
function renderInsights(){
  const {days,map}=aggregateWeek();
  const quizVals=days.map(d=>map[d].quiz===null?0:map[d].quiz);
  const moodVals=days.map(d=>moodToScore(map[d].mood));
  const latestQuiz=[...quizVals].reverse().find(v=>v!==0) ?? 0;
  const latestMood=[...days].reverse().map(d=>map[d].mood).find(Boolean) || "—";
  const totalTasks=(JSON.parse(localStorage.getItem("tasks")||"[]")).length;

  if($("kpiQuiz")) $("kpiQuiz").innerText = latestQuiz ? `${latestQuiz}/8` : "—";
  if($("kpiMood")) $("kpiMood").innerText = latestMood;
  if($("kpiTasks")) $("kpiTasks").innerText = String(totalTasks);

  drawLineChart("quizChart", quizVals.map(v=>Math.min(8,Math.max(0,v))), 8);
  const moodNorm=moodVals.map(v=>v+2);
  drawLineChart("moodChart", moodNorm, 4);
}
window.addEventListener("DOMContentLoaded", renderInsights);
