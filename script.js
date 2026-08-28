const menuToggle=document.getElementById("menuToggle"),navLinks=document.getElementById("navLinks");
menuToggle?.addEventListener("click",()=>navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const filters=document.querySelectorAll(".filter"),cards=document.querySelectorAll(".website-card"),search=document.getElementById("searchInput");
let activeFilter="all";
function filterCards(){const q=(search?.value||"").toLowerCase();cards.forEach(card=>{const okCat=activeFilter==="all"||card.dataset.cat===activeFilter;const okSearch=card.dataset.name.includes(q);card.style.display=okCat&&okSearch?"block":"none"})}
filters.forEach(f=>f.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));f.classList.add("active");activeFilter=f.dataset.filter;filterCards()}));
search?.addEventListener("input",filterCards);

const modal=document.getElementById("briefModal"),toast=document.getElementById("toast"),success=document.getElementById("successMessage"),form=document.getElementById("briefForm");
function openModal(){modal.classList.add("show");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
["projectBtn","briefBtn","finalBrief"].forEach(id=>document.getElementById(id)?.addEventListener("click",openModal));
document.getElementById("modalClose")?.addEventListener("click",closeModal);
document.querySelector(".modal-backdrop")?.addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
form?.addEventListener("submit",e=>{e.preventDefault();success.style.display="block";form.reset();setTimeout(closeModal,2200)});

function showToast(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2600)}
document.querySelectorAll(".view-btn,.login-btn,.signup-btn,.dev-card .btn,.faq-grid .btn").forEach(btn=>btn.addEventListener("click",e=>{
  if(btn.closest(".website-card")) showToast("Website details page is ready to connect to your product database.");
  else if(btn.classList.contains("login-btn")) showToast("Login screen can be connected to your authentication system.");
  else if(btn.classList.contains("signup-btn")) openModal();
  else showToast("This demo action is ready to connect to your backend.");
}));
document.querySelector(".announcement-close")?.addEventListener("click",e=>e.currentTarget.parentElement.remove());

/* ===== Dashboard integration ===== */
const publicMain=document.querySelector("body > main");
const publicFooter=document.querySelector("body > footer");
const dashboard=document.getElementById("clientDashboard");
const loginButtons=document.querySelectorAll(".login-btn");
const dashModal=document.getElementById("dashOrderModal");
const dashIdea=document.getElementById("dashIdea");
let dashOrders=JSON.parse(localStorage.getItem("webnest_client_orders")||"[]");

function showDashboard(){
  if(!dashboard) return;
  if(publicMain) publicMain.style.display="none";
  if(publicFooter) publicFooter.style.display="none";
  dashboard.hidden=false;
  window.scrollTo({top:0,behavior:"instant"});
  renderDashOrders();
}
function showPublic(){
  if(!dashboard) return;
  dashboard.hidden=true;
  if(publicMain) publicMain.style.display="";
  if(publicFooter) publicFooter.style.display="";
  window.scrollTo({top:0,behavior:"instant"});
}
loginButtons.forEach(b=>b.addEventListener("click",showDashboard));
document.querySelectorAll(".dash-actions #dashBrowse").forEach(b=>b.addEventListener("click",()=>{
  showPublic(); document.getElementById("websites")?.scrollIntoView({behavior:"smooth"});
}));
function openDashOrder(){dashModal.hidden=false;document.body.style.overflow="hidden"}
function closeDashOrder(){dashModal.hidden=true;document.body.style.overflow=""}
document.getElementById("dashCreateOrder")?.addEventListener("click",openDashOrder);
document.querySelectorAll("[data-order-mode]").forEach(b=>b.addEventListener("click",openDashOrder));
document.getElementById("dashModalClose")?.addEventListener("click",closeDashOrder);
document.querySelector(".dash-modal-backdrop")?.addEventListener("click",closeDashOrder);
document.querySelectorAll("#dashTypes button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll("#dashTypes button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");
}));
document.getElementById("dashSubmitOrder")?.addEventListener("click",()=>{
  const type=document.querySelector("#dashTypes button.selected")?.textContent||"Business";
  const idea=dashIdea.value.trim();
  const order={id:"WN-"+Math.floor(100000+Math.random()*900000),name:idea?(idea.length>38?idea.slice(0,38)+"…":idea):"New website project",type,status:"Pending",date:new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})};
  dashOrders.push(order);localStorage.setItem("webnest_client_orders",JSON.stringify(dashOrders));
  dashIdea.value="";document.querySelectorAll("#dashTypes button").forEach(x=>x.classList.remove("selected"));
  closeDashOrder();renderDashOrders();
  showDashToast("Order "+order.id+" created successfully.");
});
function renderDashOrders(){
  const list=document.getElementById("dashOrdersList"); if(!list)return;
  const active=dashOrders.filter(o=>o.status!=="Completed").length;
  const pending=dashOrders.filter(o=>o.status==="Pending").length;
  document.getElementById("dashActive").textContent=active;
  document.getElementById("dashPending").textContent=pending;
  if(!dashOrders.length){
    list.innerHTML='<div class="dash-empty"><div class="dash-empty-icon">＋</div><h3>No projects yet.</h3><p>Your first professional website is just a few clicks away.</p><button class="dash-btn dash-primary" onclick="openDashOrder()">Create your first order →</button></div>';
    return;
  }
  list.innerHTML=dashOrders.slice().reverse().map(o=>`<div class="dash-order-item"><div class="dash-order-icon">✦</div><div><h3>${escapeDash(o.name)}</h3><p>${o.id} · ${escapeDash(o.type)} · ${o.date}</p></div><span class="dash-status">${o.status}</span><span class="dash-view">View order →</span></div>`).join("");
}
function escapeDash(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function showDashToast(msg){
  let t=document.getElementById("dashToast");
  if(!t){t=document.createElement("div");t.id="dashToast";t.style.cssText="position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#222431;color:#fff;padding:12px 17px;border-radius:11px;font:700 11px 'DM Sans';z-index:100;box-shadow:0 10px 30px rgba(0,0,0,.2)";document.body.appendChild(t)}
  t.textContent=msg;t.style.display="block";clearTimeout(window.__dashToast);window.__dashToast=setTimeout(()=>t.style.display="none",2600);
}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!dashModal.hidden)closeDashOrder()});
