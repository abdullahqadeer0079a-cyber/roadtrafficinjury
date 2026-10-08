(function(){
var q=function(s,r){return (r||document).querySelector(s)},qa=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var bg=q('.burger');if(bg)bg.onclick=function(){q('.menu').classList.toggle('open')};
var hd=q('header'),tb=q('.topbtn'),sp=q('.sp');
function onScroll(){var y=window.scrollY,h=document.documentElement.scrollHeight-innerHeight;
hd.classList.toggle('sc',y>40);tb.classList.toggle('show',y>600);sp.style.width=(h>0?y/h*100:0)+'%';
var o=q('.orb');if(o&&y<900)o.style.translate='0 '+(y*-0.05)+'px'}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
tb.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
/* floating help button */
var fab=q('.fab'),fm=q('.fab-menu');
fab.onclick=function(e){e.stopPropagation();var o=fm.classList.toggle('open');fab.textContent=o?'\u2715':'?'};
document.addEventListener('click',function(){if(fm.classList.contains('open')){fm.classList.remove('open');fab.textContent='?'}});
var ct;function closeFab(){fm.classList.remove('open');fab.textContent='?'}
[fab,fm].forEach(function(el){el.addEventListener('mouseenter',function(){clearTimeout(ct)});el.addEventListener('mouseleave',function(){clearTimeout(ct);ct=setTimeout(closeFab,250)})});


qa('form[data-demo]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();q('.ok',f).style.display='block';f.reset()})});
/* multi-step claim form */
(function(){var f=q('form[data-steps]');if(!f)return;
var st=qa('.stp',f),pr=qa('.prog span'),i=0,nx=q('.next',f),bk=q('.back',f),sb=q('.sub-btn',f);
function show(){st.forEach(function(s,k){s.classList.toggle('on',k==i)});pr.forEach(function(p,k){p.classList.toggle('on',k<=i)});
bk.style.display=i?'':'none';nx.style.display=i<st.length-1?'':'none';sb.style.display=i==st.length-1?'':'none'}
nx.onclick=function(){var ok=true;qa('input,select',st[i]).forEach(function(x){if(!x.checkValidity()){if(ok)x.reportValidity();ok=false}});if(ok){i++;show()}};
bk.onclick=function(){i--;show()};
f.addEventListener('submit',function(e){e.preventDefault();q('.ok',f).style.display='block';f.reset();i=0;show()});show()})();
/* hero slider + synced photo */
(function(){var s=qa('.slide'),d=q('.dots'),im=qa('.orb img'),k=0,t;if(!s.length)return;
s.forEach(function(_,n){var x=document.createElement('i');x.onclick=function(){go(n)};d.appendChild(x)});
function go(n){k=n;s.forEach(function(e,m){e.classList.toggle('on',m==k)});im.forEach(function(e,m){e.classList.toggle('on',m==k)});qa('i',d).forEach(function(e,m){e.classList.toggle('on',m==k)});clearInterval(t);t=setInterval(function(){go((k+1)%s.length)},6500)}go(0)})();
/* reveal + counters */
function count(e){if(e.dataset.done)return;e.dataset.done=1;var n=+e.dataset.n,sfx=e.dataset.s||'',t=0,stp=Math.max(1,Math.ceil(n/60));var iv=setInterval(function(){t=Math.min(n,t+stp);e.textContent=t+sfx;if(t>=n)clearInterval(iv)},24)}
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;var e=x.target;e.classList.add('in');
qa('[data-n]',e).forEach(count);io.unobserve(e)})},{threshold:.12});
qa('.rv,.steps').forEach(function(e){io.observe(e)});
/* card tilt + hero glow */
if(matchMedia('(hover:hover)').matches){qa('.card').forEach(function(c){c.classList.add('tilt');c.addEventListener('mousemove',function(e){if(!c.classList.contains('in'))return;var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(700px) rotateX('+(-y*8)+'deg) rotateY('+(x*8)+'deg) translateY(-8px)'});c.addEventListener('mouseleave',function(){c.style.transform=''})});
var hr=q('.hero');if(hr)hr.addEventListener('mousemove',function(e){var r=hr.getBoundingClientRect();hr.style.setProperty('--mx',(e.clientX-r.left)+'px');hr.style.setProperty('--my',(e.clientY-r.top)+'px')})}
/* professional touches: magnetic buttons, page transitions */
if(matchMedia('(hover:hover)').matches){qa('.btn').forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.12)+'px '+((e.clientY-r.top-r.height/2)*.18)+'px'});b.addEventListener('mouseleave',function(){b.style.translate=''})})}
qa('a[href]').forEach(function(a){var h=a.getAttribute('href');if(!h||h.charAt(0)=='#'||/^(mailto:|tel:|http)/.test(h)||a.target)return;a.addEventListener('click',function(e){if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();document.body.classList.add('pgo');setTimeout(function(){location.href=h},220)})});
window.addEventListener('pageshow',function(e){if(e.persisted)document.body.classList.remove('pgo')});
})();
