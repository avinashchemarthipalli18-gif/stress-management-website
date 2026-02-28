function getUsers(){ return JSON.parse(localStorage.getItem("cs_users") || "[]"); }
function saveUsers(users){ localStorage.setItem("cs_users", JSON.stringify(users)); }
function setSession(email){ localStorage.setItem("cs_session", JSON.stringify({ email, at: Date.now() })); }
function getSession(){ try{return JSON.parse(localStorage.getItem("cs_session")||"null");}catch(e){return null;} }
function clearSession(){ localStorage.removeItem("cs_session"); }
function getCurrentUser(){
  const session = getSession();
  if(!session) return null;
  const users = getUsers();
  return users.find(u => u.email === session.email) || null;
}
function updateUserUI(){
  const user = getCurrentUser();
  const slot = $("userSlot");
  if(!slot) return;
  if(user){
    slot.innerHTML = `<span class="badge">👤 ${user.name}</span>
      <a class="back" href="../auth/profile.html">Profile</a>
      <button class="icon-btn" onclick="logout()">Logout</button>`;
  }else{
    slot.innerHTML = `<a class="back" href="../auth/login.html">Login</a>
      <a class="back" href="../auth/register.html">Sign up</a>`;
  }
}
function logout(){ clearSession(); window.location.href = "../index.html"; }
function register(){
  const name = $("name").value.trim();
  const email = $("email").value.trim().toLowerCase();
  const pass = $("password").value;
  if(!name || !email || !pass){ $("authMsg").innerHTML="⚠ Please fill all fields."; return; }
  const users = getUsers();
  if(users.some(u=>u.email===email)){ $("authMsg").innerHTML="❗ Email already registered. Try login."; return; }
  users.push({ name, email, pass, createdAt: Date.now() });
  saveUsers(users);
  setSession(email);
  window.location.href = "../auth/profile.html";
}
function login(){
  const email = $("email").value.trim().toLowerCase();
  const pass = $("password").value;
  const users = getUsers();
  const user = users.find(u=>u.email===email && u.pass===pass);
  if(!user){ $("authMsg").innerHTML="❗ Invalid email or password."; return; }
  setSession(email);
  window.location.href = "../index.html";
}
