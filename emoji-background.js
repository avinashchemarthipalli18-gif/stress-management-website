const emojis = ["😊","😌","🌿","💙","✨","☁️"];

const container = document.createElement("div");

container.style.position="fixed";
container.style.top="0";
container.style.left="0";
container.style.width="100%";
container.style.height="100%";
container.style.pointerEvents="none";
container.style.zIndex="-1";

document.body.appendChild(container);

function createEmoji(){

const emoji=document.createElement("div");

emoji.innerHTML=emojis[Math.floor(Math.random()*emojis.length)];

emoji.style.position="absolute";
emoji.style.left=Math.random()*100+"%";
emoji.style.bottom="-50px";
emoji.style.fontSize="30px";
emoji.style.opacity="0.3";

container.appendChild(emoji);

let pos=-50;

let interval=setInterval(()=>{

pos++;

emoji.style.bottom=pos+"px";

if(pos>window.innerHeight){

clearInterval(interval);
emoji.remove();

}

},20);

}

setInterval(createEmoji,1000);
