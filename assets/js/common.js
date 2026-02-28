function $(id){ return document.getElementById(id); }
function getTheme(){ return localStorage.getItem("theme") || "dark"; }
function setTheme(theme){
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}
function toggleTheme(){
  const t = getTheme()==="dark" ? "light" : "dark";
  setTheme(t);
  const btn = $("themeBtn");
  if(btn) btn.innerText = t==="dark" ? "🌙" : "☀️";
}
window.addEventListener("DOMContentLoaded", () => {
  setTheme(getTheme());
  const btn = $("themeBtn");
  if(btn) btn.innerText = getTheme()==="dark" ? "🌙" : "☀️";
});
