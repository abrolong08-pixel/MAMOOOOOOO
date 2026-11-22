(function(){
'use strict';
const $=id=>document.getElementById(id);
function toast(t,ms){const e=$('ts');e.textContent=t;e.classList.add('on');clearTimeout(toast.k);toast.k=setTimeout(()=>e.classList.remove('on'),ms||2600);}
window.addEventListener('error',e=>toast('⚠️ '+e.message,9000));
if(typeof THREE==='undefined'){toast('⚠️ No cargó Three.js: revisa tu conexión',9000);return;}

/* ===== 1. TEXTOS (edítalos aquí) ===== */
const TX={
letters:[
{t:'Estoy orgulloso de ti 💗',b:'Cachetoncita, quiero que lo sepas: estoy muy orgulloso de ti. No solo por lo que logras, sino por cómo lo haces: con tu corazón, con tu esfuerzo y con esa forma tuya de no rendirte.<br>Tu dino te admira todos los días. 🦕'},
{t:'Tu esfuerzo ⭐',b:'Estrellita, veo cuánto te esfuerzas, aun en los días en que estás cansada y quisieras soltarlo todo. Cada paso que das cuenta, y yo los veo todos.<br>Estoy orgulloso de la persona que eres y de la que sigues construyendo.'},
{t:'Tu forma de ser 🌙',b:'Lunita, eres de las personas más lindas que conozco. Cuidas, escuchas y llevas luz a donde llegas.<br>Me hace muy feliz que seas mía y me enorgullece que el mundo tenga a alguien como tú.'},
{t:'Cuando dudes 🧸',b:'Osita preciosa, si algún día dudas de ti, vuelve a esta carta. Eres capaz de mucho más de lo que crees, y yo voy a estar aquí aplaudiéndote en cada paso, grande o pequeño.'},
{t:'Tus logros 🎉',b:'TD, cada meta que cumples me llena el pecho de orgullo. Y las que todavía no cumples, también, porque sé que llegarán.<br>Celebro todo de ti, hasta lo que tú misma no celebras.'},
{t:'Gracias 💞',b:'Gracias por ser tú, por tu paciencia, por tu risa y por tus abrazos. Haces mejor todo lo que tocas, y a mí me hiciste mejor persona.<br>Estoy orgulloso de caminar a tu lado.'},
{t:'Mi promesa 🦖',b:'Cachetoncita, te prometo seguir creyendo en ti, apoyarte y presumirte con todo el mundo. Eres mi persona favorita y mi mayor orgullo.<br><br>Con todo mi amor,<br><b>tu dino</b> 💗'}],
hearts:[
'Estoy orgulloso de lo mucho que te esfuerzas. 💗','Eres más fuerte de lo que crees, estrellita. ⭐','Tu sonrisa es mi lugar favorito. 😊','Cada meta que cumples me hace aplaudir fuerte. 👏','Lunita, me enorgullece la persona que eres. 🌙','Gracias por no rendirte, ni en los días difíciles. 🌷','Tú puedes con todo, y tu dino te lo cree. 🦖','Eres mi persona favorita en todo el mundo. 💞','Presumo de ti con todos, osita preciosa. 🧸','¡Último corazón! Te amo mucho, cachetoncita. ❤️'],
giraffe:['¡Cachetoncita, te quiero mucho! 💗','Estoy muy orgullosa de ti 🦒','¡Tú puedes con todo! ✨','Eres la mejor, estrellita ⭐','Un abrazo de jirafita 🤗'],
final:{t:'¡Lo lograste, cachetoncita! 🎉',b:'Encontraste todas las cartas y todos los corazones.<br>Que lo sepas siempre: estoy orgulloso de ti, hoy y todos los días.<br><br>— <b>tu dino</b> 🦖💗'}};

/* ===== 2. PROGRESO ===== */
const KEY='habNina2',S={l:[],h:[],w:0};
try{if(/[?&]reset/.test(location.search))localStorage.removeItem(KEY);Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
const upd=()=>{$('lc').textContent='✉️ '+S.l.length+'/7';$('cnt').textContent='💗 '+S.h.length+'/10';};

/* ===== 3. ESCENA ===== */
const v3=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const clamp=(a,lo,hi)=>Math.max(lo,Math.min(hi,a));
const R=new THREE.WebGLRenderer({antialias:true,alpha:true});R.setClearColor(0,0);
R.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
$('c').appendChild(R.domElement);
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,1,.1,100);
const M=(c,e)=>new THREE.MeshLambertMaterial({color:c,emissive:e||0});
function bx(w,h,d,c,x,y,z,p){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),M(c));m.position.set(x,y,z);(p||sc).add(m);return m;}
function cy(rt,rb,h,c,x,y,z,p){const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,16),M(c));m.position.set(x,y,z);(p||sc).add(m);return m;}
function sp(r,c,x,y,z,p,e){const m=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),M(c,e));m.position.set(x,y,z);(p||sc).add(m);return m;}

const amb=new THREE.AmbientLight(0xffffff,.75),sun=new THREE.DirectionalLight(0xfff0f5,.8),lamp=new THREE.PointLight(0xffd9a0,0,7);
sun.position.set(4,8,6);lamp.position.set(2.5,1.9,-3.3);sc.add(amb,sun,lamp);

/* corazón 3D */
const hs=new THREE.Shape();
hs.moveTo(0,.25);hs.bezierCurveTo(0,.5,-.5,.55,-.5,.15);hs.bezierCurveTo(-.5,-.15,-.1,-.3,0,-.55);
hs.bezierCurveTo(.1,-.3,.5,-.15,.5,.15);hs.bezierCurveTo(.5,.55,0,.5,0,.25);
const HG=new THREE.ExtrudeGeometry(hs,{depth:.18,bevelEnabled:true,bevelSize:.04,bevelThickness:.05,bevelSegments:2,curveSegments:12});HG.center();
const heart=(c,e,s)=>{const m=new THREE.Mesh(HG,M(c,e));m.scale.setScalar(s);sc.add(m);return m;};

/* habitación */
const clk=[];
for(let i=0;i<8;i++)bx(8,.2,1,i%2?0xf6cfdc:0xf0bfd1,0,-.1,-3.5+i);
const fl=new THREE.Mesh(new THREE.PlaneGeometry(8,8),new THREE.MeshBasicMaterial({visible:false}));
fl.rotation.x=-Math.PI/2;sc.add(fl);
bx(8,4,.2,0xffe3ee,0,2,-4.1);bx(.2,4,8,0xfdd5e6,-4.1,2,0);bx(.2,4,8,0xfbe0f2,4.1,2,0);
cy(2.3,2.3,.04,0xcdb4f0,0,.03,.9);cy(1.6,1.6,.05,0xfff2fa,0,.04,.9);cy(.9,.9,.06,0xf7b6d2,0,.05,.9);
/* ventana */
function skyTex(d){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');
const g=x.createLinearGradient(0,0,0,256);
(d?[[0,'#c3b1f0'],[.5,'#f6c6e3'],[.8,'#ffdcc4'],[1,'#fff0d6']]:[[0,'#0c0e2b'],[.55,'#2a1f5e'],[1,'#6a4192']]).forEach(s=>g.addColorStop(s[0],s[1]));
x.fillStyle=g;x.fillRect(0,0,256,256);
if(d){const r=x.createRadialGradient(190,70,4,190,70,60);r.addColorStop(0,'#fffbe0');r.addColorStop(.25,'#ffe9a0');r.addColorStop(1,'rgba(255,233,160,0)');x.fillStyle=r;x.fillRect(0,0,256,256);
x.fillStyle='rgba(255,255,255,.92)';[[50,70,26],[75,66,20],[28,74,18],[170,150,22],[195,146,16],[150,152,14]].forEach(p=>{x.beginPath();x.arc(p[0],p[1],p[2],0,7);x.fill();});
x.strokeStyle='#7a4a8c';x.lineWidth=2;[[110,40],[130,52],[100,58]].forEach(p=>{x.beginPath();x.moveTo(p[0]-6,p[1]);x.quadraticCurveTo(p[0]-3,p[1]-5,p[0],p[1]);x.quadraticCurveTo(p[0]+3,p[1]-5,p[0]+6,p[1]);x.stroke();});}
else{x.fillStyle='#fffbd0';for(let i=0;i<50;i++)x.fillRect(Math.random()*256,Math.random()*170,1+Math.random()*2,1+Math.random()*2);
x.fillStyle='#fff3b0';x.beginPath();x.arc(80,60,22,0,7);x.fill();x.fillStyle='#2a1f5e';x.beginPath();x.arc(90,54,20,0,7);x.fill();}
x.fillStyle=d?'#f2a7c6':'#2b1b52';x.beginPath();x.moveTo(0,200);x.quadraticCurveTo(70,150,140,195);x.quadraticCurveTo(200,170,256,190);x.lineTo(256,256);x.lineTo(0,256);x.fill();
x.fillStyle=d?'#a6dcb9':'#1c1240';x.beginPath();x.moveTo(0,225);x.quadraticCurveTo(90,195,170,222);x.quadraticCurveTo(220,205,256,215);x.lineTo(256,256);x.lineTo(0,256);x.fill();
if(d){x.fillStyle='#ff7aa8';[[40,240],[100,236],[170,242],[220,234]].forEach(p=>{x.fillRect(p[0],p[1],2,10);x.beginPath();x.arc(p[0]+1,p[1],4,0,7);x.fill();});}
return new THREE.CanvasTexture(c);}
const skyD=skyTex(true),skyN=skyTex(false);
const glass=new THREE.Mesh(new THREE.BoxGeometry(1.7,1.7,.04),new THREE.MeshBasicMaterial({map:skyD}));glass.position.set(1.6,2.8,-3.97);sc.add(glass);
bx(2,.12,.1,0xffffff,1.6,3.75,-3.94);bx(2,.12,.1,0xffffff,1.6,1.85,-3.94);bx(.12,1.9,.1,0xffffff,.65,2.8,-3.94);bx(.12,1.9,.1,0xffffff,2.55,2.8,-3.94);
bx(1.7,.07,.08,0xffffff,1.6,2.8,-3.93);bx(.07,1.7,.08,0xffffff,1.6,2.8,-3.93);
bx(.4,2.2,.14,0xffc2d9,.4,2.75,-3.9);bx(.4,2.2,.14,0xffc2d9,2.8,2.75,-3.9);
const night=new THREE.Group();sc.add(night);
{const q=[];for(let i=0;i<160;i++)q.push((Math.random()-.5)*28,Math.random()*15,-9-Math.random()*4);
const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(q,3));night.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xfff6c8,size:.14})));}
sp(.9,0xfff3b0,-6.5,7,-10,night,0xfff3b0);
const clouds=new THREE.Group();sc.add(clouds);
for(let i=0;i<6;i++){const c=new THREE.Group();[[0,0,1],[.9,-.1,.8],[-.9,-.1,.75],[.4,.4,.7]].forEach(p=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.8*p[2],12,10),new THREE.MeshBasicMaterial({color:0xffffff}));m.position.set(p[0],p[1],0);m.scale.y=.7;c.add(m);});c.position.set(-9+i*3.6,5+(i%3)*1.6,-7-(i%2)*2);clouds.add(c);}
/* cama */
bx(2.6,.5,3.4,0xffffff,-2.4,.3,-2.2);bx(2.4,.3,3.2,0xffc2d9,-2.4,.7,-2.2);bx(2.5,.2,2,0xc8a8f0,-2.4,.88,-1.5);
bx(1.4,.25,.7,0xffffff,-2.4,.95,-3.3);bx(2.6,1.3,.2,0xe8b4cc,-2.4,.95,-3.85);
/* armario */
bx(1.2,3,2.2,0xffffff,-3.4,1.5,1.8);bx(.04,2.8,.03,0xe8c2d2,-2.78,1.5,1.8);
sp(.06,0xf0c84b,-2.76,1.5,1.65);sp(.06,0xf0c84b,-2.76,1.5,1.95);
/* espejo */
const mir=new THREE.Mesh(new THREE.CircleGeometry(.95,32),new THREE.MeshBasicMaterial({color:0xd9f0ff}));mir.position.set(3.9,2.2,-.8);mir.rotation.y=-Math.PI/2;sc.add(mir);
const fr=new THREE.Mesh(new THREE.TorusGeometry(1,.08,8,32),M(0xf7a8c8));fr.position.copy(mir.position);fr.rotation.y=-Math.PI/2;sc.add(fr);
/* estantería */
bx(.06,3,2.4,0xe9b8a0,3.95,1.5,1.8);bx(.9,3,.08,0xe9b8a0,3.5,1.5,.65);bx(.9,3,.08,0xe9b8a0,3.5,1.5,2.95);
[.05,1.05,2.05,3].forEach(y=>bx(.9,.08,2.3,0xdca78e,3.5,y,1.8));
const bc=[0xff8fb1,0xb28cf0,0xffd36e,0x8fd3c8,0xff6f91];
[1.09,2.09].forEach(y=>{for(let z=.8;z<2.8;z+=.22){const h=.45+Math.random()*.4;bx(.3,h,.12,bc[(Math.random()*5)|0],3.55,y+h/2,z);}});
/* escritorio y lámpara */
bx(2.4,.12,1.1,0xffffff,1.8,1.1,-3.4);[[-1,-.4],[1,-.4],[-1,.4],[1,.4]].forEach(p=>bx(.1,1.05,.1,0xe8c2d2,1.8+p[0]*1.1,.55,-3.4+p[1]));
cy(.18,.18,.06,0xb28cf0,2.5,1.19,-3.3);cy(.03,.03,.5,0xb28cf0,2.5,1.45,-3.3);
const shade=new THREE.Mesh(new THREE.CylinderGeometry(.12,.28,.35,16),M(0xffe6a8));shade.position.set(2.5,1.8,-3.3);sc.add(shade);
bx(.6,.04,.45,0xfff0f6,1.1,1.18,-3.3);
/* tulipanes */
cy(.35,.28,.5,0xffb3a7,3.2,.25,-3.2);
[[-.15,0xff5c8a],[0,0xffa6c9],[.15,0xffd36e]].forEach((t,i)=>{cy(.03,.03,.9,0x6fcf97,3.2+t[0],.95,-3.2);const h=sp(.17,t[1],3.2+t[0],1.5+i*.05,-3.2);h.scale.y=1.3;});
/* detalles */
bx(8,.25,.1,0xffffff,0,.12,-3.95);bx(.1,.25,8,0xffffff,-3.95,.12,0);bx(.1,.25,8,0xffffff,3.95,.12,0);
bx(1.1,.8,.06,0xffffff,-2.4,2.9,-3.95);bx(.95,.65,.07,0xffd1e3,-2.4,2.9,-3.93);heart(0xff5c8a,0x551133,.4).position.set(-2.4,2.9,-3.86);
bx(.6,.45,.06,0xffffff,-.9,2.4,-3.95);bx(.5,.35,.07,0xe5d4fb,-.9,2.4,-3.93);
const ck=cy(.35,.35,.06,0xffffff,-.2,3.2,-3.93);ck.rotation.x=Math.PI/2;bx(.03,.22,.02,0x7a3b8f,-.2,3.28,-3.88);bx(.16,.03,.02,0x7a3b8f,-.12,3.2,-3.88);
cy(.5,.5,.5,0xb28cf0,2.3,.25,2.5);cy(.4,.4,.08,0xd9c2fa,2.3,.52,2.5);
sp(.28,0xd9a073,-1.8,1.15,-1.3);sp(.2,0xd9a073,-1.8,1.55,-1.3);sp(.07,0xd9a073,-1.95,1.72,-1.3);sp(.07,0xd9a073,-1.65,1.72,-1.3);sp(.08,0xf3d3b5,-1.8,1.52,-1.13);
/* luces */
const bulbs=[];for(let i=0;i<19;i++){const x=-3.8+i*.42;const b=new THREE.Mesh(new THREE.SphereGeometry(.07,8,8),new THREE.MeshBasicMaterial({color:0xffffff}));b.position.set(x,3.85-.18*Math.sin(i/18*Math.PI*3),-3.88);sc.add(b);bulbs.push(b);}

/* ===== 4. JIRAFITA ===== */
const G=new THREE.Group(),Y=0xffd36e,BR=0xc98a3c;sc.add(G);
sp(.5,Y,0,1.25,0,G).scale.set(1.5,.95,.95);
const nk=cy(.16,.24,1.1,Y,.62,1.9,0,G);nk.rotation.z=-.25;
const hd=sp(.3,Y,.8,2.55,0,G);hd.scale.set(1.25,1,1);
sp(.2,0xffe8b0,1.1,2.48,0,G).scale.set(1.2,.85,.9);
[-1,1].forEach(s=>{sp(.045,0x222222,1.0,2.63,.2*s,G);sp(.07,0xff9db8,.98,2.5,.25*s,G);cy(.03,.03,.3,BR,.72,2.9,.1*s,G);sp(.06,BR,.72,3.07,.1*s,G);sp(.08,Y,.62,2.7,.3*s,G).scale.z=.5;});
const tl=cy(.03,.03,.6,Y,-.75,1.2,0,G);tl.rotation.z=.5;sp(.07,BR,-.95,.95,0,G);
[[.3,1.4],[-.3,1.1],[.1,1.0],[-.45,1.4]].forEach(p=>[-1,1].forEach(s=>{const o=sp(.13,BR,p[0],p[1],.44*s,G);o.scale.z=.2;}));
const LG=[[.45,.25],[.45,-.25],[-.45,.25],[-.45,-.25]].map(p=>{const g=new THREE.Group();g.position.set(p[0],.85,p[1]);G.add(g);cy(.09,.08,.85,Y,0,-.42,0,g);cy(.1,.1,.1,BR,0,-.85,0,g);return g;});
const bh=heart(0xff5c8a,0x551133,.28);bh.position.set(.15,1.2,.47);G.remove(bh);G.add(bh);
const bh2=heart(0xff5c8a,0x551133,.28);bh2.position.set(.15,1.2,-.47);G.remove(bh2);G.add(bh2);
const gh=new THREE.Mesh(new THREE.BoxGeometry(2.2,3.2,1.1),new THREE.MeshBasicMaterial({visible:false}));gh.position.set(.3,1.6,0);gh.userData={k:'g'};G.add(gh);clk.push(gh);
G.scale.setScalar(.8);G.position.set(0,0,2);
let go=null,face=0,jt=1,tr=0;

/* ===== 5. CARTAS, CORAZONES, DECORACIÓN ===== */
const LP=[[-2.4,1.8,-3],[1.6,2.8,-3.5],[3.3,2.2,-.8],[-3,3.45,1.8],[3.35,3.45,1.8],[.6,1.7,-2.8],[3.2,1.9,-3]];
const env=LP.map((p,i)=>{const g=new THREE.Group(),b=bx(.7,.46,.08,S.l.includes(i)?0xe9ddf5:0xfff5f8,0,0,0,g);
const f1=bx(.42,.04,.09,0xffc2d9,-.17,.17,.01,g),f2=bx(.42,.04,.09,0xffc2d9,.17,.17,.01,g);f1.rotation.z=-.6;f2.rotation.z=.6;
const hh=heart(0xff4d6d,0x55111f,.16);sc.remove(hh);hh.position.set(0,-.02,.07);g.add(hh);
const hit=new THREE.Mesh(new THREE.SphereGeometry(.75,8,8),new THREE.MeshBasicMaterial({visible:false}));hit.userData={k:'l',i};g.add(hit);clk.push(hit);
g.position.set(p[0],p[1],p[2]);g.userData={b,y:p[1]};sc.add(g);return g;});
const HP=[[-2.4,.55,-.3],[.2,3.3,-3.8],[3.6,.6,-2.2],[-3.3,3.3,1.8],[0,.6,1.2],[3,2.0,1.8],[1,1.5,-3.3],[3.6,3.6,.7],[-3.2,.6,3.2],[3.3,.6,3.2]];
const hrt=HP.map((p,i)=>{const m=heart(0xff1f4b,0x8a0a24,.55);m.position.set(p[0],p[1],p[2]);m.userData={k:'h',i,y:p[1]};
if(S.h.includes(i))m.visible=false;else clk.push(m);return m;});
const dec=[];for(let i=0;i<8;i++){const m=heart(0xffb3d1,0x7a3550,.3);m.position.set(-3+Math.random()*6,1+Math.random()*2.6,-2+Math.random()*5);m.userData={k:'d',y:m.position.y,ph:Math.random()*6};dec.push(m);clk.push(m);}

/* partículas de corazones */
const fx=[],FM=[0xff5c8a,0xffa6c9,0xc9a7ff,0xffd36e].map(c=>M(c,c));
function burst(p,n,big){for(let i=0;i<n;i++){const m=new THREE.Mesh(HG,FM[(Math.random()*4)|0]);const s=(big?.2:.1)+Math.random()*.12;m.scale.setScalar(s);m.position.copy(p);sc.add(m);
fx.push({m,s,v:v3((Math.random()-.5)*(big?5:2),1.5+Math.random()*(big?5:2),(Math.random()-.5)*(big?5:2)),a:0,l:1.1+Math.random()*.8});}}

/* ===== 6. VENTANA DE MENSAJES ===== */
let after=null;
function openM(t,b,cb){$('mt').textContent=t;$('mb').innerHTML=b;$('m').classList.add('show');after=cb||null;}
function closeM(){$('m').classList.remove('show');const f=after;after=null;if(f)f();}
$('mx').onclick=closeM;$('m').addEventListener('click',e=>{if(e.target.id==='m')closeM();});
addEventListener('keydown',e=>{if(e.key==='Escape')closeM();});
function winCheck(){if(!S.w&&S.l.length>=7&&S.h.length>=10){S.w=1;save();burst(v3(0,2,0),70,true);openM(TX.final.t,TX.final.b);}}

function onHit(o){const u=o.userData;
if(u.k==='l'){const g=o.parent,i=u.i;if(!S.l.includes(i)){S.l.push(i);save();upd();}g.userData.b.material.color.setHex(0xe9ddf5);burst(g.position,8);openM(TX.letters[i].t,TX.letters[i].b,winCheck);}
else if(u.k==='h'){if(S.h.includes(u.i))return;S.h.push(u.i);save();upd();o.visible=false;clk.splice(clk.indexOf(o),1);burst(o.position,16,true);openM('Corazón '+S.h.length+'/10 💗',TX.hearts[u.i],winCheck);}
else if(u.k==='d'){burst(o.position,10);sc.remove(o);clk.splice(clk.indexOf(o),1);}
else if(u.k==='g'){jt=0;burst(v3(G.position.x,2.8,G.position.z),8);toast(TX.giraffe[(Math.random()*TX.giraffe.length)|0],2200);}}

/* ===== 7. CÁMARA, TOQUES, BOTONES ===== */
let yaw=0,pitch=.45,dist=17,dr=null;const tg=v3(0,1.9,0),ray=new THREE.Raycaster(),ndc=new THREE.Vector2();
function rs(){const w=innerWidth,h=innerHeight;R.setSize(w,h);cam.aspect=w/h;dist=w<h?17:12;cam.updateProjectionMatrix();}
addEventListener('resize',rs);rs();
let mus=true,ok=false,si=0;const SRC=['assets/musica.mp3','assets/Ebrio de Amor - Efecto Elegante (Lyric Video).mp3'].map(encodeURI);
const au=new Audio(SRC[0]);au.loop=true;au.volume=.5;
au.addEventListener('error',()=>{if(++si<SRC.length){au.src=SRC[si];if(mus)au.play().catch(()=>{});}else toast('🎵 No encuentro la música: ponla en assets/musica.mp3',6000);});
const play=()=>{if(!mus||ok)return;const p=au.play();if(p)p.then(()=>{ok=true;}).catch(()=>{});};
['pointerup','touchend','click'].forEach(n=>addEventListener(n,play));
R.domElement.addEventListener('pointerdown',e=>{dr={x:e.clientX,y:e.clientY,m:0};play();$('hint').style.opacity=0;});
addEventListener('pointermove',e=>{if(!dr)return;const dx=e.clientX-dr.x,dy=e.clientY-dr.y;dr.m+=Math.abs(dx)+Math.abs(dy);dr.x=e.clientX;dr.y=e.clientY;yaw=clamp(yaw-dx*.006,-1,1);pitch=clamp(pitch+dy*.005,.15,1.1);});
addEventListener('pointerup',e=>{if(dr&&dr.m<8)tap(e);dr=null;});
R.domElement.addEventListener('wheel',e=>{dist=clamp(dist+e.deltaY*.01,7,20);},{passive:true});
function tap(e){if($('m').classList.contains('show'))return;
const r=R.domElement.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(ndc,cam);
const h=ray.intersectObjects(clk,false)[0];if(h){onHit(h.object);return;}
const f=ray.intersectObject(fl,false)[0];if(f)go=v3(clamp(f.point.x,-3.4,3.4),0,clamp(f.point.z,-3.4,3.4));}

let day=true;
function setDay(d){day=d;document.body.style.background=d?'linear-gradient(#c9b8f2,#f8c9e2 55%,#ffe3c8)':'linear-gradient(#0c0e2b,#2a1f5e 60%,#5b3a85)';amb.intensity=d?.75:.4;sun.intensity=d?.8:.15;lamp.intensity=d?0:1.2;
glass.material.map=d?skyD:skyN;clouds.visible=d;night.visible=!d;shade.material.emissive.setHex(d?0:0xffc866);$('dn').textContent=d?'🌙':'☀️';}
$('dn').onclick=()=>{setDay(!day);play();};
$('snd').onclick=()=>{mus=!mus;if(mus)au.play().catch(()=>{});else au.pause();$('snd').textContent=mus?'🔊':'🔇';};
$('ht').onclick=()=>{const left=hrt.filter(h=>h.visible);if(!left.length){toast('¡Ya encontraste todos los corazones! 💗');return;}
left.sort((a,b)=>a.position.distanceTo(G.position)-b.position.distanceTo(G.position));
const p=left[0].position.clone().project(cam),r=$('ring');
r.style.left=((p.x+1)/2*innerWidth)+'px';r.style.top=((1-p.y)/2*innerHeight)+'px';r.classList.add('on');clearTimeout(r.k);r.k=setTimeout(()=>r.classList.remove('on'),3500);};

/* ===== 8. BUCLE ===== */
const clock=new THREE.Clock();
function loop(){requestAnimationFrame(loop);const dt=Math.min(clock.getDelta(),.05),t=clock.elapsedTime;
cam.position.set(tg.x+dist*Math.sin(yaw)*Math.cos(pitch),tg.y+dist*Math.sin(pitch),tg.z+dist*Math.cos(yaw)*Math.cos(pitch));cam.lookAt(tg);
env.forEach((g,i)=>{g.position.y=g.userData.y+Math.sin(t*2+i)*.09;g.rotation.y=Math.sin(t+i)*.35;});
hrt.forEach(h=>{if(h.visible){h.rotation.y=t*1.6;h.position.y=h.userData.y+Math.sin(t*2+h.userData.i)*.07;}});
dec.forEach(h=>{h.rotation.y=t+h.userData.ph;h.position.y=h.userData.y+Math.sin(t+h.userData.ph)*.15;});
clouds.children.forEach(c=>{c.position.x+=dt*.25;if(c.position.x>11)c.position.x=-11;});
bulbs.forEach((b,i)=>b.material.color.setHSL((i*.07+t*.05)%1,1,.55+.25*Math.sin(t*3+i)));
/* jirafita */
let sw=0,walk=false;
if(go){const dx=go.x-G.position.x,dz=go.z-G.position.z,d=Math.hypot(dx,dz);
if(d<.1)go=null;else{walk=true;G.position.x+=dx/d*2.3*dt;G.position.z+=dz/d*2.3*dt;
const a=Math.atan2(-dz,dx),df=((a-face+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;face+=df*Math.min(1,dt*8);
sw=Math.sin(t*10)*.5;tr-=dt;if(tr<=0){tr=.35;burst(v3(G.position.x,.4,G.position.z),1);}}}
G.rotation.y=face;LG[0].rotation.z=LG[3].rotation.z=sw;LG[1].rotation.z=LG[2].rotation.z=-sw;
let y=walk?Math.abs(Math.sin(t*10))*.05:0;if(jt<1){y+=Math.sin(jt*Math.PI)*.8;jt+=dt*2.2;}G.position.y=y;
hd.position.y=2.55+Math.sin(t*2)*.02;
for(let i=fx.length-1;i>=0;i--){const f=fx[i];f.a+=dt;f.v.y-=4*dt;f.m.position.addScaledVector(f.v,dt);f.m.rotation.y+=dt*4;f.m.scale.setScalar(Math.max(.001,f.s*(1-f.a/f.l)));
if(f.a>=f.l){sc.remove(f.m);fx.splice(i,1);}}
R.render(sc,cam);}
setDay(true);upd();loop();
if(S.w===1&&S.l.length>=7)toast('💗 Ya completaste todo. ¡Puedes seguir paseando!',4000);
setTimeout(()=>{$('hint').style.opacity=0;},9000);
})();
