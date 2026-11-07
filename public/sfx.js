// Efek suara lucu, dibuat langsung di browser (tanpa file audio).
(()=>{const AC=window.AudioContext||window.webkitAudioContext;let ctx,out,on=true;
try{on=localStorage.getItem('sfx')!=='0'}catch{}
function c(){if(!AC)return null;if(!ctx){ctx=new AC();const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=6500;out=ctx.createGain();out.gain.value=.75;const cp=ctx.createDynamicsCompressor();lp.connect(cp);cp.connect(out);out.connect(ctx.destination);ctx._in=lp}if(ctx.state==='suspended')ctx.resume();return ctx}
function tone(f,t,d,v,ty='sine',to){const x=c();if(!x)return;const o=x.createOscillator(),g=x.createGain(),s=x.currentTime+t;o.type=ty;o.frequency.setValueAtTime(f,s);if(to)o.frequency.exponentialRampToValueAtTime(to,s+d);
 g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(v,s+.01);g.gain.exponentialRampToValueAtTime(.0001,s+d);o.connect(g);g.connect(x._in);o.start(s);o.stop(s+d+.05)}
const bell=(f,t,d,v)=>{tone(f,t,d,v);tone(f*2.76,t,d*.4,v*.25);tone(f*4,t,d*.25,v*.12)};
const S={
 tap:()=>tone(1400,0,.04,.03,'triangle'),
 add:()=>{tone(420,0,.1,.09,'sine',900);tone(1320,.09,.09,.04)},            // pop! bloop naik
 rem:()=>tone(800,0,.12,.07,'sine',300),                                      // bloop turun
 order:()=>[1047,1319,1568,2093,2637].forEach((f,i)=>bell(f,i*.07,.5,.06)),    // kilau naik
 wait:()=>{bell(784,0,.35,.05);bell(988,.18,.45,.05)},                         // ting-ting lembut
 success:()=>{[523,659,784,1047].forEach((f,i)=>bell(f,i*.1,.5,.07));[2093,2637,3136].forEach((f,i)=>tone(f,.45+i*.06,.2,.03))},
 done:()=>{[784,988,1175,1568].forEach((f,i)=>bell(f,i*.09,.55,.07));tone(300,.4,.12,.05,'sine',900);tone(500,.5,.12,.04,'sine',1200)}, // ta-da + boing naik
 bad:()=>{tone(500,0,.3,.08,'sine',140);tone(420,.28,.34,.07,'sine',110)}      // boing sedih
};
const api={play(n){if(on&&S[n])try{S[n]()}catch{}},on:()=>on,
 toggle(){on=!on;if(!on)api.alarm(0);try{localStorage.setItem('sfx',on?'1':'0')}catch{}if(on)api.play('add');ui();return on}};
let al=null,at=null;
api.alarm=s=>{if(al){clearInterval(al);clearTimeout(at);al=null}if(!s||!on)return;
 const r=()=>{bell(1319,0,.9,.18);bell(1047,.4,1.3,.18)};r();al=setInterval(r,4500);at=setTimeout(()=>api.alarm(0),90000)}; // ting-tong pintu
function ui(){document.querySelectorAll('[data-sfx-btn]').forEach(b=>{b.textContent=on?'♪ Suara':'Suara mati';b.title=on?'Matikan suara':'Nyalakan suara'})}
window.sfx=api;
const unlock=()=>{c()};['pointerdown','keydown','touchstart'].forEach(e=>addEventListener(e,unlock,{passive:true}));
document.addEventListener('click',e=>{if(e.target.closest('[data-sfx-btn]'))api.toggle();else if(e.target.closest('.chips a'))api.play('tap')});
document.addEventListener('DOMContentLoaded',ui);ui();
})();
