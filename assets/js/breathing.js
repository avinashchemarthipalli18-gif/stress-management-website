let breathingInterval; let count=0; let phase="inhale";
function setBar(p){ const b=$("bar"); if(b) b.style.width=p+"%"; }
function startBreathing(){
  stopBreathing(); count=0; phase="inhale";
  const breathText=$("breathText"); const timer=$("timer");
  breathingInterval=setInterval(()=>{
    count++;
    if(phase==="inhale"){
      breathText.innerText="Inhale 🌬";
      const t=4-(count%4); timer.innerText=String(t).padStart(2,"0");
      setBar(((4-t)/4)*100); if(count%4===0) phase="hold";
    }else if(phase==="hold"){
      breathText.innerText="Hold ✋";
      const t=4-(count%4); timer.innerText=String(t).padStart(2,"0");
      setBar(((4-t)/4)*100); if(count%4===0) phase="exhale";
    }else{
      breathText.innerText="Exhale 😮‍💨";
      const t=6-(count%6); timer.innerText=String(t).padStart(2,"0");
      setBar(((6-t)/6)*100); if(count%6===0) phase="inhale";
    }
  },1000);
}
function stopBreathing(){ clearInterval(breathingInterval); $("breathText").innerText="Ready?"; $("timer").innerText="00"; setBar(0); }
