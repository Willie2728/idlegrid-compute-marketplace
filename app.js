const baseMachines = [
  {id:'nova',name:'Nova RTX Studio',type:'Windows',cpu:'Ryzen 9 7950X',gpu:'RTX 4090 · 24GB',ram:64,price:8.4,rating:4.98,tasks:['Blender','Unreal','AI workloads'],glow:'#754cff'},
  {id:'orchard',name:'Orchard M3 Max',type:'Mac',cpu:'Apple M3 Max',gpu:'40-core GPU',ram:64,price:7.2,rating:4.96,tasks:['Xcode','Final Cut','Logic Pro'],glow:'#3dbbff'},
  {id:'forge',name:'The Forge',type:'Windows',cpu:'Threadripper Pro',gpu:'RTX 6000 Ada · 48GB',ram:128,price:14.8,rating:5.0,tasks:['CAD','Simulation','Rendering'],glow:'#ff704d'},
  {id:'velocity',name:'Velocity Gaming Rig',type:'Windows',cpu:'Core i9-14900K',gpu:'RTX 4080 Super',ram:32,price:5.9,rating:4.91,tasks:['Gaming','Streaming','VR'],glow:'#79f2c0'},
  {id:'pixel',name:'Pixel Mac Studio',type:'Mac',cpu:'Apple M2 Ultra',gpu:'76-core GPU',ram:128,price:9.6,rating:4.97,tasks:['After Effects','DaVinci','Audio'],glow:'#e86cff'},
  {id:'console',name:'Living Room Series X',type:'Console',cpu:'Xbox Series X',gpu:'Console streaming',ram:16,price:3.2,rating:4.82,tasks:['Cloud play','Game testing'],glow:'#63e16f',provider:true}
];
let machines=[...baseMachines,...JSON.parse(localStorage.getItem('idlegrid-listings')||'[]')];
let sessions=JSON.parse(localStorage.getItem('idlegrid-sessions')||'[]');
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

const routes=['market','earn','fabric','sessions','voice'];
function route(name){if(!routes.includes(name))name='market';$$('.route,.nav-link').forEach(x=>x.classList.remove('active'));$('#'+name).classList.add('active');$(`.nav-link[data-route="${name}"]`)?.classList.add('active');if(location.hash!==`#${name}`)history.replaceState(null,'',`#${name}`);window.scrollTo(0,0);if(name==='sessions')renderSessions()}
$$('[data-route]').forEach(b=>b.onclick=()=>route(b.dataset.route));
window.addEventListener('hashchange',()=>route(location.hash.slice(1)));

function renderMachines(){
 const q=$('#searchInput').value.toLowerCase(),type=$('#typeFilter').value,max=Number($('#priceFilter').value);
 const result=machines.filter(m=>(type==='all'||m.type===type)&&m.price<=max&&(`${m.name} ${m.cpu} ${m.gpu} ${m.tasks.join(' ')}`).toLowerCase().includes(q));
 $('#resultCount').textContent=`${result.length} matches`;
 $('#machineGrid').innerHTML=result.length?result.map(m=>`<article class="machine" data-id="${m.id}"><div class="machine-visual" style="--glow:${m.glow||'#79f2c0'}"><span class="status">● AVAILABLE</span><div class="device"></div></div><div class="machine-body"><div class="machine-top"><div><h3>${esc(m.name)}</h3><div class="spec">${esc(m.gpu)} · ${m.ram}GB</div></div><span class="rating">★ ${m.rating||'New'}</span></div><div class="tags">${m.tasks.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="price-row"><span class="price">$${m.price.toFixed(2)} <small>/ hour</small></span><button class="mini-btn">View</button></div></div></article>`).join(''):`<div class="empty">No machines match those filters.</div>`;
 $$('.machine').forEach(card=>card.onclick=()=>openBooking(card.dataset.id));
}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
$('#searchBtn').onclick=renderMachines;$('#searchInput').oninput=renderMachines;$('#typeFilter').onchange=renderMachines;$('#priceFilter').onchange=renderMachines;

let bookingHours=2,bookingMachine;
function openBooking(id){bookingMachine=machines.find(m=>m.id===id);bookingHours=2;drawBooking();$('#modal').hidden=false}
function drawBooking(){const m=bookingMachine,total=m.price*bookingHours;$('#modalBody').innerHTML=`<p class="eyebrow">RESERVE SECURELY</p><h2 id="modalTitle">${esc(m.name)}</h2><p class="spec">${esc(m.cpu)} · ${esc(m.gpu)} · ${m.ram}GB RAM</p><h3>Session length</h3><div class="duration">${[1,2,4,8].map(h=>`<button class="${h===bookingHours?'active':''}" data-hours="${h}">${h} hr</button>`).join('')}</div><div class="booking-summary"><div><span>Machine time</span><b>$${total.toFixed(2)}</b></div><div><span>Session protection</span><b>Included</b></div><div><span>Total</span><b>$${total.toFixed(2)}</b></div></div>${m.type==='Console'?'<p class="warning">Console access requires a supported streaming provider and game-license verification. This prototype creates the reservation but cannot start console control.</p>':'<p class="warning">A real session starts only after identity verification, owner approval, payment authorization, and connection through an isolated remote-access provider.</p>'}<button id="reserveBtn" class="primary wide">Reserve for $${total.toFixed(2)}</button>`;$$('.duration button').forEach(b=>b.onclick=()=>{bookingHours=Number(b.dataset.hours);drawBooking()});$('#reserveBtn').onclick=reserve}
function reserve(){sessions.unshift({id:crypto.randomUUID(),machine:bookingMachine.name,type:bookingMachine.type,hours:bookingHours,total:bookingMachine.price*bookingHours,status:'Awaiting provider',created:new Date().toISOString()});localStorage.setItem('idlegrid-sessions',JSON.stringify(sessions));$('#modal').hidden=true;toast('Reservation created safely');route('sessions')}
$('#closeModal').onclick=()=>$('#modal').hidden=true;$('#modal').onclick=e=>{if(e.target===$('#modal'))$('#modal').hidden=true};

function renderSessions(){if(!sessions.length){$('#sessionList').innerHTML='<div class="empty"><h3>No sessions yet</h3><p>Explore available machines and reserve one when you are ready.</p><button class="primary" onclick="route(\'market\')">Explore machines</button></div>';return}$('#sessionList').innerHTML=sessions.map(s=>`<article class="session"><div><h3>${esc(s.machine)}</h3><p>${s.hours} hour session · ${new Date(s.created).toLocaleString()}</p></div><div><strong>$${s.total.toFixed(2)}</strong> &nbsp; <span class="badge">${esc(s.status)}</span></div></article>`).join('')}

$('#earnSlider').oninput=e=>{$('#earnings').textContent=Math.round(Number(e.target.value)*4*5.7*.8)};
$('#hostForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),type=f.get('type');const suggested=type==='Console'?3.2:type==='Mac'?7.2:8.4;const listing={id:'local-'+Date.now(),name:f.get('name'),type,cpu:f.get('cpu'),gpu:f.get('gpu'),ram:Number(f.get('ram')),sharing:f.get('sharing'),disk:Number(f.get('disk')),price:suggested,rating:null,tasks:f.get('tasks').split(',').map(x=>x.trim()).filter(Boolean).slice(0,3),glow:type==='Mac'?'#3dbbff':type==='Console'?'#63e16f':'#754cff'};const locals=JSON.parse(localStorage.getItem('idlegrid-listings')||'[]');locals.push(listing);localStorage.setItem('idlegrid-listings',JSON.stringify(locals));machines=[...baseMachines,...locals];toast('Listing saved — verification required');e.target.reset();renderMachines();route('market')};

const routeProfiles={
 lite:{name:'IdleGrid LITE Linux Pool',icon:'L',className:'lite-result'},
 shared:{name:'Protected Donor Capacity',icon:'S',className:'shared-result'},
 exclusive:{name:'Exclusive Performance Machine',icon:'X',className:'exclusive-result'}
};
function recommendRoute(){
 const task=$('#taskType').value,cpu=Number($('#routeCpu').value),ram=Number($('#routeRam').value),gpu=$('#routeGpu').value,latency=$('#routeLatency').value;
 let target='lite',reason='Small non-GPU workloads stay in the efficient LITE pool.';
 if(gpu==='high'||task==='gaming'||task==='creative'||latency==='realtime'){target='exclusive';reason='High GPU or real-time interaction needs a dedicated performance session.'}
 else if(cpu>4||ram>8||gpu==='light'||task==='build'||task==='data'){target='shared';reason='This medium workload fits a protected donor slice with hard resource caps.'}
 const p=routeProfiles[target];
 $('#routeResult').className=`route-result ${p.className}`;
 $('#routeResult').innerHTML=`<span class="route-icon">${p.icon}</span><div><small>RECOMMENDED ENVIRONMENT</small><h3>${p.name}</h3><p>${reason}</p><div class="route-meta"><span>${cpu} CPU</span><span>${ram} GB</span><span>${gpu==='none'?'No GPU':gpu==='light'?'Light GPU':'High GPU'}</span></div></div>`;
}
$('#routerForm').onsubmit=e=>{e.preventDefault();recommendRoute();toast('Workload classified — simulation only')};
['taskType','routeCpu','routeRam','routeGpu','routeLatency'].forEach(id=>$('#'+id).onchange=recommendRoute);

function updateCapacity(){
 const cpu=Number($('#cpuQuota').value),ram=Number($('#ramQuota').value),disk=Number($('#diskQuota').value);
 $('#cpuValue').textContent=`${cpu} ${cpu===1?'core':'cores'}`;$('#ramValue').textContent=`${ram} GB`;$('#diskValue').textContent=`${disk} GB`;
 $('#ownerCpu').textContent=`${Math.max(1,16-cpu)} CPU cores`;$('#ownerRam').textContent=`${Math.max(4,64-ram)} GB memory`;
 $('#capacityStatus').textContent='UNSAVED';$('#capacityStatus').classList.remove('is-saved');
}
['cpuQuota','ramQuota','diskQuota'].forEach(id=>$('#'+id).oninput=updateCapacity);
$('#capacityProfile').onchange=updateCapacity;$('#autoReclaim').onchange=updateCapacity;
$('#capacityForm').onsubmit=e=>{e.preventDefault();const config={profile:$('#capacityProfile').value,cpu:Number($('#cpuQuota').value),ram:Number($('#ramQuota').value),disk:Number($('#diskQuota').value),autoReclaim:$('#autoReclaim').checked};localStorage.setItem('idlegrid-capacity-policy',JSON.stringify(config));$('#capacityStatus').textContent='SAVED LOCALLY';$('#capacityStatus').classList.add('is-saved');toast('Protected capacity policy saved')};
function loadCapacity(){try{const c=JSON.parse(localStorage.getItem('idlegrid-capacity-policy'));if(!c)return;$('#capacityProfile').value=c.profile;$('#cpuQuota').value=c.cpu;$('#ramQuota').value=c.ram;$('#diskQuota').value=c.disk;$('#autoReclaim').checked=c.autoReclaim;updateCapacity();$('#capacityStatus').textContent='SAVED LOCALLY';$('#capacityStatus').classList.add('is-saved')}catch{}}
function toast(msg){$('#toast').textContent=msg;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2600)}
renderMachines();renderSessions();recommendRoute();loadCapacity();route(location.hash.slice(1)||'market');
