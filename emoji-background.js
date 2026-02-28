// Create emoji container
const container = document.createElement("div");

container.style.position = "fixed";
container.style.top = "0";
container.style.left = "0";
container.style.width = "100%";
container.style.height = "100%";
container.style.pointerEvents = "none";
container.style.zIndex = "-1";

document.body.appendChild(container);

// Emoji list
const emojis = ["😊","😌","😇","✨","💙","🌿","☁️"];

// Create emoji function
function createEmoji(){

const emoji = document.createElement("div");

emoji.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];

emoji.style.position = "absolute";
emoji.style.left = Math.random()*100 + "%";
emoji.style.bottom = "-50px";
emoji.style.fontSize = (20 + Math.random()*40) + "px";
emoji.style.opacity = "0.3";

container.appendChild(emoji);

let pos = -50;

const interval = setInterval(()=>{

pos++;

emoji.style.bottom = pos + "px";

if(pos > window.innerHeight){

emoji.remove();
clearInterval(interval);

}

},20);

}

// Repeat
setInterval(createEmoji,1000);