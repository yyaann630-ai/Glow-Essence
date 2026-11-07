// Backsound kotak musik lembut (C - Am - F - G), dibuat langsung di browser tanpa file lagu.
// Browser mewajibkan satu ketukan pertama agar suara bisa mulai. Pilihan nyala/mati disimpan.
(()=>{
const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
let ctx,master,sendG,timer,run=false,started=false,step=0,next=0,on=true;
try{on=localStorage.getItem('bgm')!=='0'}catch{}
const BPM=84,SD=60/BPM/4,LEVEL=.5,hz=m=>440*2**((m-69)/12),r=Math.random;
const CH=[[60,64,67,71],[57,60,64,67],[53,57,60,64],[55,59,62,64]],BASS=[48,45,41,43],ARP=[0,1,2,3,2,1,2,1],SPK=[84,86,88,91,93];
const MEL=[[[0,79],[3,76],[6,79],[8,84],[12,81]],[[0,81],[3,76],[6,72],[8,76],[12,79]],[[0,84],[3,81],[6,79],[8,81],[12,76]],[[0,79],[4,81],[6,79],[8,76],[10,74],[12,72]]];
function init(){if(ctx)return;ctx=new AC();master=ctx.createGain();master.gain.value=0;
 const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=4200;const cp=ctx.createDynamicsCompressor();
 master.connect(lp);lp.connect(cp);cp.connect(ctx.destination);
 const dl=ctx.createDelay(1);dl.delayTime.value=60/BPM*.75;const fl=ctx.createBiquadFilter();fl.type='lowpass';fl.frequency.value=2400;
 const fb=ctx.createGain();fb.gain.value=.38;sendG=ctx.createGain();sendG.gain.value=.45;
 sendG.connect(dl);dl.connect(fl);fl.connect(fb);fb.connect(dl);fl.connect(master)}
function note(m,t,dur,v,o={}){const f=hz(m),g=ctx.createGain(),o1=ctx.createOscillator(),o2=ctx.createOscillator(),g2=ctx.createGain(),a=o.att||.006;
 o1.frequency.value=f;o2.frequency.value=f*(o.pad?1.004:4);g2.gain.value=o.pad?.5:.1;o1.connect(g);o2.connect(g2);g2.connect(g);
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+a);if(o.pad)g.gain.setValueAtTime(v,t+dur*.6);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
 g.connect(master);if(o.echo)g.connect(sendG);o1.start(t);o2.start(t);o1.stop(t+dur+.05);o2.stop(t+dur+.05)}
function play(s,t){const bar=(s>>4)&3,st=s&15,ch=CH[bar];
 if(st===0){ch.forEach(m=>note(m-12,t,3.4,.028,{pad:1,att:.5}));note(BASS[bar],t,1.6,.1)}
 if(st%2===0)note(ch[ARP[st/2]],t,1,.04,{echo:1});
 MEL[bar].forEach(([x,m])=>{if(x===st)note(m,t,1.2,.075,{echo:1})});
 if(st%4===2&&r()<.12)note(SPK[r()*SPK.length|0],t,.6,.03,{echo:1})}
function tick(){while(next<ctx.currentTime+.4){play(step,next);next+=SD;step=(step+1)&63}}
function start(){init();if(!run){run=true;next=ctx.currentTime+.1;step=0;const t=ctx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setValueAtTime(master.gain.value,t);master.gain.linearRampToValueAtTime(LEVEL,t+2.5);clearInterval(timer);timer=setInterval(tick,120);tick()}return ctx.resume()}
function stop(){if(!run)return;run=false;clearInterval(timer);const t=ctx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setValueAtTime(master.gain.value,t);master.gain.linearRampToValueAtTime(0,t+.6);setTimeout(()=>{if(!run)ctx.suspend()},800)}
function ui(){document.querySelectorAll('[data-bgm-btn]').forEach(b=>{b.textContent=on?'♫ Musik':'Musik mati';b.title=on?'Matikan musik':'Nyalakan musik'})}
document.addEventListener('click',e=>{if(!e.target.closest('[data-bgm-btn]'))return;on=!on;try{localStorage.setItem('bgm',on?'1':'0')}catch{}if(on)start();else stop();ui()});
const G=['pointerup','touchend','click','keydown'],unlock=()=>{if(!on)return;start().then(()=>{if(ctx.state==='running'){started=true;G.forEach(e=>removeEventListener(e,unlock))}}).catch(()=>{})};
G.forEach(e=>addEventListener(e,unlock,{passive:true}));
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else if(on&&started)start()});
document.addEventListener('DOMContentLoaded',ui);ui();
window.bgm={start,stop,on:()=>on};
})();
