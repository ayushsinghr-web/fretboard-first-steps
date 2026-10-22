// @ts-nocheck
/* Original interactive home page markup + engine, ported verbatim. */
export const homeTop = "\n<canvas id=\"fx\" aria-hidden=\"true\"></canvas>\n\n\n<header class=\"wrap hero\"><h1><span style=\"--i:1\">See the chord.</span><span style=\"--i:2\">Hear the chord.</span><span style=\"--i:3\">Play the song.</span></h1>\n<p class=\"sub\">Tune up with the built-in tuner, then pick a beginner song, study each chord shape, press play to hear it, then strum along with a live metronome. Move your cursor across the strings behind this page to pluck them.</p>\n<div class=\"cta\"><a class=\"btn\" href=\"#tuner\">Tune your guitar</a><a href=\"#studio\">Practice a song</a><a href=\"#habits\">Read the three habits</a></div></header>\n\n";
export const homeBottom = "<section id=\"studio\" class=\"wrap\">\n<div class=\"pn\"><h2>Pick a song</h2><div class=\"tabs\" id=\"tabs\"></div>\n<div class=\"tr\"><button class=\"play\" id=\"go\" aria-label=\"Start or stop the metronome\"></button>\n<div class=\"bpm\"><div><span>Tempo</span><span><b id=\"bv\">100</b> BPM</span></div><input type=\"range\" id=\"bpm\" min=\"60\" max=\"120\" aria-label=\"Tempo in beats per minute\"></div>\n<div class=\"beats\" aria-label=\"Beat indicator\"><i>1</i><i>2</i><i>3</i><i>4</i></div>\n<div class=\"sw\"><label><input type=\"checkbox\" id=\"clk\" checked>Metronome click</label><label><input type=\"checkbox\" id=\"snd\" checked>Play chord sound</label><label><input type=\"checkbox\" id=\"anim\" checked>Animate strumming</label></div></div></div>\n<div class=\"pn\"><h2>Learn the shapes</h2><div class=\"chords\" id=\"chords\"></div></div>\n<div class=\"pn\"><h2>Strum along</h2><div class=\"strum\" id=\"strum\"></div>\n<div class=\"key\"><span>Down strum</span><span>Up strum</span><span>Muted slap</span><span>Dot: rest</span></div>\n<div class=\"tip\"><b id=\"tt\"></b><br><span id=\"tp\"></span></div></div>\n</section>\n<section id=\"habits\" class=\"wrap hb\"><h2>Three habits that make chord changes easier</h2><div class=\"hg\">\n<article><h3>The Pivot Finger</h3><p>When you switch from Am to C, keep your index and middle fingers glued to the fretboard. Only your ring finger moves, from the 2nd fret of the G string up to the 3rd fret of the A string.</p></article>\n<article><h3>The Hover Rule</h3><p>Keep your fingers curved and hovering just above the frets between chords. The shorter the trip back to the strings, the faster and cleaner the change.</p></article>\n<article><h3>The 2-Minute Silent Switch</h3><p>Set a timer and swap between two chord shapes without strumming at all. Go slowly, check that every string rings, then repeat. This is how muscle memory gets built.</p></article></div></section>\n";
export function bootHome(SIG: AbortSignal) {

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const PL='<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',SP='<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>';
const C={Am:{n:'A minor',f:[-1,0,2,2,1,0],g:[0,0,2,3,1,0]},G:{n:'G major',f:[3,2,0,0,0,3],g:[2,1,0,0,0,3]},C:{n:'C major',f:[-1,3,2,0,1,0],g:[0,3,2,0,1,0]},Em:{n:'E minor',f:[0,2,2,0,0,0],g:[0,2,3,0,0,0]},D:{n:'D major',f:[-1,-1,0,2,3,2],g:[0,0,0,1,3,2]}};
const S={riptide:{t:'Riptide',a:'Vance Joy',bpm:102,c:['Am','G','C'],p:'D.DU.UDU',tt:'The Pivot Finger',tp:'Am to C: keep your index and middle fingers glued down. Only the ring finger hops to the 3rd fret.'},
stand:{t:'Stand By Me',a:'Ben E. King',bpm:118,c:['G','Em','C','D'],p:'D...DxDU',tt:'Lead the change',tp:'Start moving on the “&” after 4 so your hand lands exactly on beat 1.'},
zombie:{t:'Zombie',a:'The Cranberries',bpm:84,c:['Em','C','G','D'],p:'D.D..UDU',tt:'Swap, don’t lift',tp:'Em to C: your middle and ring fingers swap strings, so slide them across together instead of lifting off.'}};
const AR={D:'M12 5v34M4 29l8 11 8-11',U:'M12 43V9M4 19l8-11 8 11',x:'M5 17l14 14M19 17L5 31','.':'M12 24h.01'};
let ctx,master,song,bpm=100,run=0,step=0,bar=0,nxt=0,tm;
const op=[82.41,110,146.83,196,246.94,329.63],cache={};
/* ---------- audio ---------- */
function init(){if(!ctx){ctx=new(window.AudioContext||window.webkitAudioContext)();const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=4200;master=ctx.createGain();master.gain.value=.8;master.connect(lp).connect(ctx.destination)}ctx.resume()}
function buf(f){if(cache[f])return cache[f];const sr=ctx.sampleRate,n=sr*2|0,b=ctx.createBuffer(1,n,sr),d=b.getChannelData(0),p=Math.round(sr/f);for(let i=0;i<p;i++)d[i]=Math.random()*2-1;for(let i=p;i<n;i++)d[i]=.4985*(d[i-p]+d[i-p+1]);return cache[f]=b}
function note(f,at,v,d){const s=ctx.createBufferSource(),g=ctx.createGain();s.buffer=buf(f);g.gain.setValueAtTime(v,at);g.gain.exponentialRampToValueAtTime(.001,at+d);s.connect(g).connect(master);s.start(at);s.stop(at+d)}
function strum(n,t,dir,dur=1.2){const c=C[n];let l=[0,1,2,3,4,5].filter(i=>c.f[i]>=0);if(dir=='U')l=l.reverse().slice(0,4);l.forEach((s,k)=>note(op[s]*2**(c.f[s]/12),t+k*.012,dir=='U'?.1:.16,dur))}
function click(t,acc){const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=acc?1500:1000;g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+.05);o.connect(g).connect(ctx.destination);o.start(t);o.stop(t+.06)}
/* ---------- metronome + strum engine ---------- */
function tick(){while(nxt<ctx.currentTime+.12){const s=step,b=bar,t=nxt,ch=song.p[s];
if(s%2==0&&$('#clk').checked)click(t,s==0);
if($('#snd').checked&&ch!='.')strum(song.c[b],t,ch=='U'?'U':'D',ch=='x'?.07:1.2);
setTimeout(()=>ui(s,b,ch),Math.max(0,(t-ctx.currentTime)*1e3));
nxt+=30/bpm;step=(step+1)%8;if(!step)bar=(bar+1)%song.c.length}
tm=setTimeout(tick,25)}
function clr(){$$('.slot.on,.beats i.on,.chord.cur').forEach(e=>e.classList.remove('on','cur'))}
function ui(s,b,ch){if(!run)return;clr();if($('#anim').checked)$$('.slot')[s]?.classList.add('on');if(s%2==0)$$('.beats i')[s/2].classList.add('on');$$('.chord')[b]?.classList.add('cur');if(song.c[b]&&(ch=='D'||ch=='U'))pulse(song.c[b],ch)}
function go(){if(run){run=0;clearTimeout(tm);clr()}else{init();run=1;step=0;bar=0;nxt=ctx.currentTime+.1;tick()}
$('#go').classList.toggle('on',!!run);$('#go').innerHTML=run?SP:PL}
/* ---------- rendering ---------- */
function dia(f,g){let s='<svg class="dia" viewBox="0 0 120 164" role="img"><rect class="nut" x="15" y="33" width="90" height="4" rx="2"/>';
for(let i=0;i<6;i++){const x=15+i*18,y=37+(f[i]-.5)*24;s+=`<line x1="${x}" x2="${x}" y1="37" y2="157"/>`;
if(f[i]<0)s+=`<path class="mk" d="M${x-5} 17l10 10m0-10l-10 10"/>`;else if(!f[i])s+=`<circle class="mk" cx="${x}" cy="22" r="5"/>`;
else s+=`<g class="dot" style="--d:${i*70}ms"><circle cx="${x}" cy="${y}" r="9"/><text x="${x}" y="${y+4}">${g[i]}</text></g>`}
for(let j=1;j<=5;j++)s+=`<line class="fr" x1="15" x2="105" y1="${37+j*24}" y2="${37+j*24}"/>`;return s+'</svg>'}
function load(k){song=S[k];bar=0;bpm=song.bpm;$('#bpm').value=bpm;$('#bv').textContent=bpm;clr();
$('#tabs').innerHTML=Object.keys(S).map(x=>`<button class="tab${x==k?' on':''}" data-k="${x}">${S[x].t}<small>${S[x].a}</small></button>`).join('');
$('#chords').innerHTML=song.c.map((n,i)=>`<div class="chord"><em>Bar ${i+1}</em><h3>${n}</h3><small>${C[n].n}</small>${dia(C[n].f,C[n].g)}<button class="pl" data-n="${n}">Hear it</button></div>`).join('');
$('#strum').innerHTML=[...song.p].map((c,i)=>`<div class="slot ${c=='.'?'r':c}"><svg viewBox="0 0 24 48"><path d="${AR[c]}"/></svg><b>${'1&2&3&4&'[i].replace('&','&amp;')}</b></div>`).join('');
$('#tt').textContent=song.tt;$('#tp').textContent=song.tp}
/* ---------- events ---------- */
document.addEventListener('click',e=>{if(!document.getElementById('studio'))return;const t=e.target.closest('.tab,.pl,#go,#th');if(!t)return;
if(t.id=='go')return go();
if(t.id=='th'){const r=document.documentElement;r.dataset.theme=r.dataset.theme=='light'?'dark':'light';return}
if(t.classList.contains('tab'))return load(t.dataset.k);
init();strum(t.dataset.n,ctx.currentTime,'D');pulse(t.dataset.n,'D');const c=t.closest('.chord');c.classList.add('cur');setTimeout(()=>c.classList.remove('cur'),900)},{signal:SIG});
$('#bpm').oninput=e=>{bpm=+e.target.value;$('#bv').textContent=bpm};
/* ---------- live strings canvas ---------- */
const cv=$('#fx'),cx=cv.getContext('2d'),amp=[0,0,0,0,0,0],last=[0,0,0,0,0,0],RM=matchMedia('(prefers-reduced-motion:reduce)').matches,
M=Array.from({length:36},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.6+.4,v:Math.random()*.03+.01}));
let W,H,D;
function rs(){D=Math.min(devicePixelRatio||1,2);W=cv.width=innerWidth*D;H=cv.height=innerHeight*D}
function pulse(n,d){C[n].f.forEach((f,i)=>{if(f>=0&&(d!='U'||i>1))amp[i]=Math.max(amp[i],d=='U'?.55:1)})}
function draw(ms){const t=ms/1e3,L=document.documentElement.dataset.theme=='light',rgb=L?'184,116,26':'240,180,90';
cx.clearRect(0,0,W,H);cx.globalCompositeOperation=L?'source-over':'lighter';
M.forEach(p=>{p.y=(p.y-p.v/60+1)%1;cx.fillStyle=`rgba(${rgb},${.25+.2*Math.sin(t*2+p.x*9)})`;cx.beginPath();cx.arc(p.x*W,p.y*H,p.r*D,0,7);cx.fill()});
for(let i=0;i<6;i++){const y0=H*(.16+i*.13),a=amp[i];amp[i]*=.957;
const gr=cx.createLinearGradient(0,0,W,0);gr.addColorStop(0,`rgba(${rgb},0)`);gr.addColorStop(.5,`rgba(${rgb},${.14+a*.6})`);gr.addColorStop(1,`rgba(${rgb},0)`);
cx.strokeStyle=gr;cx.lineWidth=(1+(5-i)*.5+a*1.5)*D;cx.shadowColor=`rgba(${rgb},.9)`;cx.shadowBlur=a>.04?22*a*D:0;cx.beginPath();
for(let x=0;x<=W;x+=14*D){const e=Math.sin(Math.PI*x/W),y=y0+e*D*(Math.sin(x/W*6+t*1.1+i)*3+a*42*Math.sin(t*(36-i*3)));x?cx.lineTo(x,y):cx.moveTo(x,y)}
cx.stroke()}
cx.shadowBlur=0;if(!RM&&!SIG.aborted)requestAnimationFrame(draw)}
addEventListener('pointermove',e=>{const f=e.clientY/innerHeight,i=Math.round((f-.16)/.13);if(i<0||i>5||Math.abs(f-(.16+i*.13))*innerHeight>20)return;const n=performance.now();if(n-last[i]<350)return;last[i]=n;amp[i]=Math.max(amp[i],.7);if(ctx&&ctx.state=='running')note(op[i],ctx.currentTime,.08,1.2)},{signal:SIG});
addEventListener('resize',rs,{signal:SIG});rs();requestAnimationFrame(draw);
$('#go').innerHTML=PL;load('riptide');

SIG.addEventListener('abort',()=>{run=0;clearTimeout(tm);if(ctx)ctx.close()});

}
