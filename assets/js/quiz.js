function calculateStress(){
  const form=$("quizForm"); const data=new FormData(form);
  let score=parseInt(data.get("q1"))+parseInt(data.get("q2"))+parseInt(data.get("q3"))+parseInt(data.get("q4"));
  let label="", color="";
  if(score<=2){label="✅ Low Stress — You're doing well!"; color="var(--good)";}
  else if(score<=5){label="⚠ Medium Stress — Take breaks and relax."; color="var(--warn)";}
  else{label="❗ High Stress — Try breathing & talk to someone you trust."; color="var(--bad)";}
  $("quizResult").innerHTML=`<b>Score:</b> ${score}/8 <br><span style="color:${color}; font-weight:900;">${label}</span>`;
  const date=new Date().toISOString().slice(0,10);
  addHistoryEntry({type:"quiz", date, score});
}
function resetResult(){ $("quizResult").innerText="Your result will appear here."; }
