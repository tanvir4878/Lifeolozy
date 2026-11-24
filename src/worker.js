import ADMIN from './admin.html';
import CSS from './style.css';
const S=[
['skin','Skin Care','<circle cx="12" cy="12" r="8"/><path d="M9 10h.01M15 10h.01M9 15c1.5 1.5 4.5 1.5 6 0"/>'],
['hair','Hair Care','<path d="M6 20c0-6 2-14 6-16 4 2 6 10 6 16M9 20c0-4 1-8 3-11"/>'],
['body','Body Care','<circle cx="12" cy="5" r="2"/><path d="M12 8v7M7 11l5-3 5 3M9 21l3-6 3 6"/>'],
['mind','Mental Health','<path d="M12 4a5 5 0 0 0-5 5c-2 1-2 5 0 6 0 3 3 5 5 5s5-2 5-5c2-1 2-5 0-6a5 5 0 0 0-5-5zM12 4v16"/>'],
['food','Food & Nutrition','<path d="M12 6c-4-3-8 0-7 5s4 9 7 8c3 1 6-3 7-8s-3-8-7-5zM12 6c0-2 1-3 3-3"/>'],
['fitness','Fitness','<path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/>'],
['sleep','Sleep & Rest','<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/>'],
['fashion','Fashion & Style','<path d="M8 4l-5 4 3 3 2-1v10h8V10l2 1 3-3-5-4a4 4 0 0 1-8 0z"/>'],
['men',"Men's Lifestyle",'<circle cx="10" cy="14" r="5"/><path d="M14 10l6-6M15 4h5v5"/>'],
['women',"Women's Lifestyle",'<circle cx="12" cy="9" r="5"/><path d="M12 14v8M9 18h6"/>']];
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{'content-type':'application/json'}});
const nm=k=>(S.find(x=>x[0]==k)||[0,k])[1];
const ic=k=>`<span class="ic"><svg viewBox="0 0 24 24">${(S.find(x=>x[0]==k)||[0,0,''])[2]}</svg></span>`;
const card=a=>`<a class="card" href="/a/${a.slug}"><img loading="lazy" src="${E(a.img||'/ph.svg')}" alt="${E(a.title)}"><div class="b"><span class="tag">${nm(a.sec)}</span><h3>${E(a.title)}</h3><p>${E((a.body||'').slice(0,110))}…</p></div></a>`;
const pcard=p=>`<div class="pc"><a class="pi" href="${E(p.link)}" target="_blank" rel="sponsored noopener"><img loading="lazy" src="${E(p.img||'/ph.svg')}" alt="${E(p.name)}"></a><div class="pb"><h4>${E(p.name)}</h4><div class="pp">${E(p.price)}</div><a class="buy" href="${E(p.link)}" target="_blank" rel="sponsored noopener">Buy Now</a></div></div>`;
const pager=(pg,tot,per,base)=>{const n=Math.ceil(tot/per);if(n<2)return'';return`<div class="pg">${Array.from({length:n},(_,i)=>`<a class="${i+1==pg?'on':''}" href="${base}?page=${i+1}">${i+1}</a>`).join('')}</div>`};
const tok=async env=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(env.ADMIN_PASSWORD+'|lz')))].map(b=>b.toString(16).padStart(2,'0')).join('');
const all=(env,q,...b)=>env.DB.prepare(q).bind(...b).all().then(r=>r.results);

const PH='<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><defs><linearGradient id="g"><stop offset="0" stop-color="#046e5b"/><stop offset="1" stop-color="#3fbf9f"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><text x="300" y="215" font-size="44" fill="#fff" text-anchor="middle" font-family="Arial" font-weight="700">Lifeolozy</text></svg>';
const si=p=>`<svg class="si" viewBox="0 0 24 24">${p}</svg>`;
const SV={search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',moon:'<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',ok:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>'};
const sp=k=>si((S.find(x=>x[0]==k)||[0,0,''])[2]);
async function view(env,u,o,body){
 const s=Object.fromEntries((await all(env,'SELECT k,v FROM settings')).map(x=>[x.k,x.v]));
 body=body.replace('<!--INART-->',s.inart||'');
 const html=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${E(o.t)}</title><meta name="description" content="${E(o.d)}"><link rel="canonical" href="${u.origin}${o.c||u.pathname}"><meta property="og:title" content="${E(o.t)}"><meta property="og:description" content="${E(o.d)}"><meta property="og:type" content="website">${o.i?`<meta property="og:image" content="${E(o.i)}">`:''}<meta name="theme-color" content="#046e5b"><link rel="stylesheet" href="/style.css">${o.ld?`<script type="application/ld+json">${JSON.stringify(o.ld).replace(/</g,'\\u003c')}</script>`:''}${s.head||''}<script>document.documentElement.dataset.theme=localStorage.lzt||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')</script></head><body>
<div class="top">Free expert lifestyle guides for men &amp; women · Updated daily</div>
<header><div class="w nav"><a href="/" class="logo">Life<b>olozy</b></a><form class="sf" action="/search"><input name="q" placeholder="Search skin, hair, fitness, mind…" aria-label="Search"><button aria-label="Search">${si(SV.search)}</button></form><div class="tools"><button class="ib" id="dm" aria-label="Dark mode">${si(SV.moon)}</button><button class="ib" id="ham" aria-label="Menu">${si(SV.menu)}</button></div></div>
<div class="cats"><div class="w">${S.map(x=>`<a href="/c/${x[0]}">${sp(x[0])}${x[1]}</a>`).join('')}</div></div></header>
<div id="ov"></div><aside id="dr"><div class="dh"><b>Menu</b><button class="ib" id="cl" aria-label="Close">${si(SV.x)}</button></div><a href="/">${si(SV.home)}Home</a>${S.map(x=>`<a href="/c/${x[0]}">${sp(x[0])}${x[1]}</a>`).join('')}</aside>
<div class="ad">${s.top||''}</div><main>${body}</main>
<footer><div class="w fg"><div><div class="logo">Life<b>olozy</b></div><p>Science-minded lifestyle guides for men and women, worldwide.</p></div><div><h4>Sections</h4>${S.map(x=>`<a href="/c/${x[0]}">${x[1]}</a>`).join('')}</div><div><h4>Company</h4><a href="/">About</a><a href="/">Privacy Policy</a><a href="/">Contact</a><a href="/">Disclaimer</a></div></div><p class="cp">© ${new Date().getFullYear()} Lifeolozy. Information only, not medical advice.</p></footer>
<script>dm.onclick=()=>{const t=document.documentElement.dataset.theme=='dark'?'light':'dark';document.documentElement.dataset.theme=t;localStorage.lzt=t};ham.onclick=()=>document.body.classList.add('mo');ov.onclick=cl.onclick=()=>document.body.classList.remove('mo');dr.onclick=e=>{if(e.target.closest('a'))document.body.classList.remove('mo')}</script></body></html>`;
 return new Response(html,{headers:{'content-type':'text/html;charset=utf-8','cache-control':'public,max-age=60'}});
}
async function home(env,u){
 const pg=Math.max(1,+u.searchParams.get('page')||1),per=9;
 const tot=(await env.DB.prepare('SELECT COUNT(*) n FROM articles').first()).n;
 const L=await all(env,'SELECT * FROM articles ORDER BY created DESC LIMIT ? OFFSET ?',per,(pg-1)*per);
 let R=[],F=[],G=[];
 if(pg==1){R=await all(env,'SELECT * FROM articles ORDER BY RANDOM() LIMIT 4');F=await all(env,'SELECT * FROM products ORDER BY id DESC LIMIT 10');G=await all(env,'SELECT * FROM articles ORDER BY created DESC LIMIT 80')}
 const blocks=['skin','hair','body','mind'].map(k=>{const x=G.filter(a=>a.sec==k).slice(0,4);return x.length?`<div class="bh"><h2 class="t">${nm(k)}</h2><a href="/c/${k}">See all ›</a></div><div class="grid">${x.map(card).join('')}</div>`:''}).join('');
 const tr=[['Expert Written','Reliable guides'],['Worldwide','US, Europe & more'],['Updated Daily','Fresh stories'],['Free to Read','No sign-up']].map(x=>`<div>${si(SV.ok)}<p style="margin:0">${x[0]}<span>${x[1]}</span></p></div>`).join('');
 return view(env,u,{t:'Lifeolozy – Skin, Hair, Body, Mind & Lifestyle Guides',d:'Expert lifestyle guides on skin, hair, body, mental health, fitness, food, sleep and fashion for men and women.',c:'/',ld:{'@context':'https://schema.org','@type':'WebSite',name:'Lifeolozy',url:u.origin}},
 `<div class="w"><div class="hg"><div class="hb"><span class="pill">Trusted by readers worldwide</span><h1>Live Better. Look Better.<br>Feel Better.</h1><p>Practical guides on skin, hair, body, mind and everyday lifestyle for men and women.</p><br><a class="btn big" href="#latest">Start Reading</a> <a class="btn ghost" href="/c/skin">Skin Care</a></div>
 <div class="hs"><a class="pr1" href="/c/skin">${ic('skin')}<b>Glow Guide</b><span>Skin care routines that work</span></a><a class="pr2" href="/c/mind">${ic('mind')}<b>Calm Mind</b><span>Mental wellness tips</span></a></div></div>
 <div class="trust">${tr}</div>
 <h2 class="t">Shop by Topic</h2><div class="tg">${S.map(x=>`<a href="/c/${x[0]}">${ic(x[0])}<span>${x[1]}</span></a>`).join('')}</div>
 ${R.length?`<h2 class="t">Trending Now</h2><div class="grid">${R.map(card).join('')}</div>`:''}
 ${F.length?`<h2 class="t">Featured Products</h2><div class="prow">${F.map(pcard).join('')}</div>`:''}
 <h2 class="t" id="latest">Latest Stories</h2><div class="grid">${L.map(card).join('')||'<p class="mu">No stories yet. Add content from /admin.</p>'}</div>${pager(pg,tot,per,'/')}
 ${blocks}${pg==1?`<div class="cta"><h2>New guides every day</h2><p>Explore all 10 sections and find what fits your lifestyle.</p><a class="btn big" href="/c/fitness">Explore Fitness</a></div>`:''}</div>`);
}
async function search(env,u){const q=(u.searchParams.get('q')||'').trim().slice(0,80);
 const L=q?await all(env,'SELECT * FROM articles WHERE title LIKE ? OR body LIKE ? ORDER BY created DESC LIMIT 30','%'+q+'%','%'+q+'%'):[];
 return view(env,u,{t:`Search: ${q} | Lifeolozy`,d:'Search Lifeolozy guides',c:'/search'},`<div class="w"><h2 class="t">Results for “${E(q)}”</h2><div class="grid">${L.map(card).join('')||'<p class="mu">No results found.</p>'}</div></div>`);}
async function cat(env,u,k){
 if(!S.find(x=>x[0]==k))return new Response('Not found',{status:404});
 const pg=Math.max(1,+u.searchParams.get('page')||1),per=12;
 const tot=(await env.DB.prepare('SELECT COUNT(*) n FROM articles WHERE sec=?').bind(k).first()).n;
 const L=await all(env,'SELECT * FROM articles WHERE sec=? ORDER BY created DESC LIMIT ? OFFSET ?',k,per,(pg-1)*per);
 return view(env,u,{t:`${nm(k)} Tips & Guides | Lifeolozy`,d:`Expert ${nm(k).toLowerCase()} topics, tips and product picks for men and women.`},
 `<section class="hero sm"><div class="w">${ic(k)}<h1>${nm(k)}</h1><p>All topics about ${nm(k).toLowerCase()}.</p></div></section><div class="w"><div class="grid">${L.map(card).join('')||'<p class="mu">No topics yet.</p>'}</div>${pager(pg,tot,per,'/c/'+k)}</div>`);
}
async function art(env,u,slug){
 const a=await env.DB.prepare('SELECT * FROM articles WHERE slug=?').bind(slug).first();
 if(!a)return new Response('Not found',{status:404});
 let faq=[];try{faq=JSON.parse(a.faq||'[]')}catch{}
 const P=await all(env,'SELECT * FROM products WHERE sec=? ORDER BY id DESC LIMIT 10',a.sec);
 const R=await all(env,'SELECT * FROM articles WHERE sec=? AND id!=? ORDER BY created DESC LIMIT 3',a.sec,a.id);
 const d=a.body.replace(/\s+/g,' ').slice(0,155);
 const ld=[{'@context':'https://schema.org','@type':'Article',headline:a.title,image:a.img?new URL(a.img,u.origin).href:undefined,datePublished:new Date(a.created).toISOString(),author:{'@type':'Organization',name:'Lifeolozy'},publisher:{'@type':'Organization',name:'Lifeolozy'}}];
 if(faq.length)ld.push({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(f=>({'@type':'Question',name:f[0],acceptedAnswer:{'@type':'Answer',text:f[1]}}))});
 return view(env,u,{t:a.title+' | Lifeolozy',d,i:a.img?new URL(a.img,u.origin).href:'',ld},
 `<div class="w"><article class="art"><nav class="bc"><a href="/">Home</a> › <a href="/c/${a.sec}">${nm(a.sec)}</a></nav><h1>${E(a.title)}</h1><p class="mu">${new Date(a.created).toDateString()} · ${Math.max(1,Math.round(a.body.split(/\s+/).length/200))} min read</p><img class="hi" src="${E(a.img||'/ph.svg')}" alt="${E(a.title)}"><div class="ad"><!--INART--></div>
 <div class="txt">${a.body.split(/\n{2,}/).map(p=>`<p>${E(p)}</p>`).join('')}</div>
 ${P.length?`<h2 class="t">Recommended Products</h2><div class="prow">${P.map(pcard).join('')}</div>`:''}
 ${faq.length?`<h2 class="t">Frequently Asked Questions</h2>${faq.map(f=>`<details><summary>${E(f[0])}</summary><p>${E(f[1])}</p></details>`).join('')}`:''}</article>
 ${R.length?`<h2 class="t">Related Reading</h2><div class="grid">${R.map(card).join('')}</div>`:''}</div>`);
}
async function api(req,env,u){
 const p=u.pathname,m=req.method;
 if(!env.ADMIN_PASSWORD)return J({error:'ADMIN_PASSWORD secret not set'},500);
 if(p=='/api/login'&&m=='POST'){const b=await req.json();return b.password===env.ADMIN_PASSWORD?J({token:await tok(env)}):J({error:'Wrong password'},401)}
 if((req.headers.get('authorization')||'')!='Bearer '+await tok(env))return J({error:'Unauthorized'},401);
 if(p=='/api/data'){const s=Object.fromEntries((await all(env,'SELECT k,v FROM settings')).map(x=>[x.k,x.v]));return J({arts:await all(env,'SELECT id,title,sec,slug FROM articles ORDER BY created DESC LIMIT 100'),prods:await all(env,'SELECT * FROM products ORDER BY id DESC LIMIT 200'),s,secs:S.map(x=>[x[0],x[1]])})}
 if(p=='/api/article'&&m=='POST'){const b=await req.json();if(!b.title||!b.body)return J({error:'Title and content required'},400);
  const slug=b.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60)+'-'+Date.now().toString(36);
  await env.DB.prepare('INSERT INTO articles(slug,sec,title,img,body,faq,created) VALUES(?,?,?,?,?,?,?)').bind(slug,b.sec,b.title,b.img||'',b.body,JSON.stringify(b.faq||[]),Date.now()).run();return J({ok:1,slug})}
 if(p=='/api/article'&&m=='DELETE'){await env.DB.prepare('DELETE FROM articles WHERE id=?').bind(u.searchParams.get('id')).run();return J({ok:1})}
 if(p=='/api/product'&&m=='POST'){const b=await req.json();if(!b.name)return J({error:'Name required'},400);await env.DB.prepare('INSERT INTO products(sec,name,price,img,link) VALUES(?,?,?,?,?)').bind(b.sec,b.name,b.price||'',b.img||'',b.link||'#').run();return J({ok:1})}
 if(p=='/api/product'&&m=='DELETE'){await env.DB.prepare('DELETE FROM products WHERE id=?').bind(u.searchParams.get('id')).run();return J({ok:1})}
 if(p=='/api/settings'&&m=='POST'){const b=await req.json();for(const k of['head','top','inart','ads_txt'])await env.DB.prepare('INSERT OR REPLACE INTO settings(k,v) VALUES(?,?)').bind(k,b[k]||'').run();return J({ok:1})}
 if(p=='/api/upload'&&m=='POST'){const key=Date.now().toString(36)+Math.random().toString(36).slice(2,6);await env.BUCKET.put(key,req.body,{httpMetadata:{contentType:req.headers.get('content-type')||'image/jpeg'}});return J({url:'/img/'+key})}
 return J({error:'Not found'},404);
}
export default{async fetch(req,env){
 const u=new URL(req.url),p=u.pathname;let m;
 try{
  if(p.startsWith('/api/'))return await api(req,env,u);
  if(p.startsWith('/img/')){const o=await env.BUCKET.get(p.slice(5));if(!o)return new Response('',{status:404});return new Response(o.body,{headers:{'content-type':o.httpMetadata?.contentType||'image/jpeg','cache-control':'public,max-age=31536000'}})}
  if(p=='/style.css')return new Response(CSS,{headers:{'content-type':'text/css;charset=utf-8','cache-control':'public,max-age=300'}});
  if(p=='/admin'||p=='/admin/')return new Response(ADMIN,{headers:{'content-type':'text/html;charset=utf-8'}});
  if(p=='/ph.svg')return new Response(PH,{headers:{'content-type':'image/svg+xml'}});
  if(p=='/ads.txt'){const r=await env.DB.prepare("SELECT v FROM settings WHERE k='ads_txt'").first();return new Response(r?.v||'',{headers:{'content-type':'text/plain'}})}
  if(p=='/search')return await search(env,u);
  if(p=='/robots.txt')return new Response(`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${u.origin}/sitemap.xml`);
  if(p=='/sitemap.xml'){const A=await all(env,'SELECT slug,created FROM articles ORDER BY created DESC LIMIT 5000');return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${u.origin}/</loc></url>${S.map(x=>`<url><loc>${u.origin}/c/${x[0]}</loc></url>`).join('')}${A.map(a=>`<url><loc>${u.origin}/a/${a.slug}</loc><lastmod>${new Date(a.created).toISOString().slice(0,10)}</lastmod></url>`).join('')}</urlset>`,{headers:{'content-type':'application/xml'}})}
  if(p=='/')return await home(env,u);
  if(m=p.match(/^\/c\/([\w-]+)$/))return await cat(env,u,m[1]);
  if(m=p.match(/^\/a\/([\w-]+)$/))return await art(env,u,m[1]);
 }catch(x){return new Response('Server error: '+x.message,{status:500})}
 return new Response('Page not found',{status:404});
}};
