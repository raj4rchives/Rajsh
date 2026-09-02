const modal=document.getElementById("orderModal");
const closeModal=()=>modal.classList.remove("show");
function openOrder(mode){
  modal.classList.add("show");
  if(mode==="AI") document.getElementById("idea").focus();
}
document.getElementById("createOrder").onclick=()=>openOrder();
document.getElementById("modalClose").onclick=closeModal;
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.querySelectorAll("#types button").forEach(b=>b.onclick=()=>{document.querySelectorAll("#types button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")});
document.getElementById("menuBtn").onclick=()=>document.getElementById("mobileMenu").classList.toggle("show");
document.getElementById("closeTop").onclick=()=>document.querySelector(".topbar").remove();

let orders=JSON.parse(localStorage.getItem("webnest_orders")||"[]");
function renderOrders(){
  const list=document.getElementById("ordersList");
  document.getElementById("activeCount").textContent=orders.filter(o=>o.status!=="Completed").length;
  document.getElementById("pendingCount").textContent=orders.filter(o=>o.status==="Pending").length;
  if(!orders.length){list.innerHTML=`<div class="empty"><div class="empty-icon">＋</div><h3>No projects yet.</h3><p>Your first professional website is just a few clicks away.</p><button class="btn primary" onclick="openOrder()">Create your first order →</button></div>`;return}
  list.innerHTML=orders.slice().reverse().map(o=>`<div class="order-item">
    <div class="order-symbol">✦</div><div><h3>${o.name}</h3><p>${o.id} · ${o.type} · ${o.date}</p></div>
    <span class="status">${o.status}</span><span class="view">View order →</span>
  </div>`).join("");
}
document.getElementById("submitOrder").onclick=()=>{
  const type=document.querySelector("#types button.selected")?.textContent||"Business";
  const idea=document.getElementById("idea").value.trim();
  const order={id:"WN-"+Math.floor(100000+Math.random()*900000),name:idea?idea.slice(0,34)+(idea.length>34?"…":""):"New website project",type,status:"Pending",date:new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})};
  orders.push(order);localStorage.setItem("webnest_orders",JSON.stringify(orders));renderOrders();closeModal();document.getElementById("idea").value="";
  alert("Order created successfully: "+order.id);
};
renderOrders();


// CartyWeb AI Builder demo layer. Replace generateWebsite() with a secure server-side AI API in production.
const aiPrompt=document.getElementById('aiPrompt'), aiPreview=document.getElementById('aiPreview'), aiActions=document.getElementById('aiActions'), siteCount=document.getElementById('siteCount');
let generatedSite=JSON.parse(localStorage.getItem('cartyweb_generated_site')||'null');
function renderGenerated(){if(!generatedSite)return; aiPreview.innerHTML=`<div class="generated-preview"><small>CARTYWEB AI PREVIEW · ${generatedSite.type}</small><h2>${escapeHTML(generatedSite.title)}</h2><p>${escapeHTML(generatedSite.description)}</p><span class="mock-btn">Explore website →</span></div>`;aiActions.hidden=false;siteCount.textContent='1';}
function escapeHTML(x){return String(x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
document.getElementById('generateAI')?.addEventListener('click',()=>{const prompt=aiPrompt.value.trim();if(!prompt){alert('Enter a website prompt first.');return}const title=prompt.replace(/^(create|build|make)\s+/i,'').slice(0,48)||'My AI Website';generatedSite={title,type:document.getElementById('aiType').value,description:'AI-generated starting concept based on your prompt.',prompt,createdAt:new Date().toISOString()};localStorage.setItem('cartyweb_generated_site',JSON.stringify(generatedSite));renderGenerated();alert('AI website generated. Connect your server-side AI API for real code generation.');});
document.getElementById('editAI')?.addEventListener('click',()=>{aiPrompt.focus();aiPrompt.select();});
document.getElementById('launchAI')?.addEventListener('click',()=>{if(!generatedSite)return;localStorage.setItem('cartyweb_launch_status','active');alert('Launch requested. In production this button will deploy the project to your hosting provider.');});
document.getElementById('sourceAI')?.addEventListener('click',()=>choosePlan('license'));
function choosePlan(plan){localStorage.setItem('cartyweb_checkout_intent',plan);alert(plan==='rent'?'Rental checkout selected — connect your payment gateway to activate monthly hosting.':'Source license checkout selected — connect your payment gateway to issue the one-time license and source download.');}
renderGenerated();
