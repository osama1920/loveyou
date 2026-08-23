const PASSWORD="2408";
const START_DATE=new Date("2026-03-28T00:00:00");
const passwordScreen=document.getElementById("passwordScreen");
const passwordInput=document.getElementById("passwordInput");
const passwordError=document.getElementById("passwordError");
const giftScreen=document.getElementById("giftScreen");
const surpriseScreen=document.getElementById("surpriseScreen");
const memoriesScreen=document.getElementById("memoriesScreen");


function unlockGift(){
 if(passwordInput.value.trim()===PASSWORD){
  passwordScreen.classList.add("hidden");
  giftScreen.classList.remove("hidden");
  particles(20);
 }else{
  passwordError.textContent="الباسورد مش صح 😘 جربي تاني";
  passwordInput.value="";
 }
}
document.getElementById("unlockBtn").addEventListener("click",unlockGift);
passwordInput.addEventListener("keydown",e=>{if(e.key==="Enter")unlockGift()});

function particles(n){
 const wrap=document.getElementById("particles");
 for(let i=0;i<n;i++){
  const p=document.createElement("span");p.textContent="💖";p.style.position="fixed";
  p.style.left=Math.random()*100+"%";p.style.bottom="0";p.style.fontSize="24px";
  p.style.transition="3s";wrap.appendChild(p);
  requestAnimationFrame(()=>{p.style.transform="translateY(-100vh)";p.style.opacity="0"});
  setTimeout(()=>p.remove(),3000);
 }
}
document.getElementById("giftBox").addEventListener("click",()=>{
 particles(35);
 setTimeout(()=>{giftScreen.classList.add("hidden");surpriseScreen.classList.remove("hidden")},500);
});
document.getElementById("showMemories").addEventListener("click",()=>{
 surpriseScreen.classList.add("hidden");memoriesScreen.classList.remove("hidden");
 updateCounter();setInterval(updateCounter,1000);
});
function updateCounter(){
 let x=Math.max(0,Date.now()-START_DATE),d=86400000,h=3600000,m=60000;
 const days=Math.floor(x/d);x%=d;
 const hours=Math.floor(x/h);x%=h;
 const mins=Math.floor(x/m);x%=m;
 const secs=Math.floor(x/1000);
 document.getElementById("days").textContent=days;
 document.getElementById("hours").textContent=String(hours).padStart(2,"0");
 document.getElementById("minutes").textContent=String(mins).padStart(2,"0");
 document.getElementById("seconds").textContent=String(secs).padStart(2,"0");
}
