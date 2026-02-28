function addTask(){
  const input=$("taskInput");
  const taskText=input.value.trim();
  if(!taskText) return;
  let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value="";
  loadTasks();
}
function loadTasks(){
  let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
  const list=$("taskList"); list.innerHTML="";
  tasks.forEach((t,i)=>{
    const li=document.createElement("li");
    li.innerHTML=`<span>${t}</span> <button class="btn2 danger" onclick="deleteTask(${i})">Delete</button>`;
    list.appendChild(li);
  });
}
function deleteTask(i){
  let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
  tasks.splice(i,1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
function clearTasks(){ localStorage.removeItem("tasks"); loadTasks(); }
window.onload=loadTasks;
