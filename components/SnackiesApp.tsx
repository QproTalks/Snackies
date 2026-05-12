'use client';
import { useEffect, useMemo, useState } from 'react';
import { Heart, ShoppingBag, Star, User } from 'lucide-react';
import { products, categories, regions } from '@/lib/products';
import { currencies, money } from '@/lib/currency';
import { languages, Lang, t } from '@/lib/i18n';

type Cart = Record<string, number>;
const reviews = [
  {name:'Lina', text:'The international box felt premium and arrived beautifully packed.', stars:5},
  {name:'Mats', text:'Finally one shop for Dutch classics and Korean chips.', stars:5},
  {name:'Sofia', text:'Luxury vibe, easy checkout, dangerous wishlist.', stars:4}
];
function load<T>(key:string, fallback:T):T{ if(typeof window==='undefined') return fallback; try{return JSON.parse(localStorage.getItem(key)||'') as T}catch{return fallback} }
export default function SnackiesApp(){
 const [lang,setLang]=useState<Lang>('en'); const [currency,setCurrency]=useState('EUR'); const [query,setQuery]=useState(''); const [cat,setCat]=useState('All'); const [region,setRegion]=useState('All');
 const [cart,setCart]=useState<Cart>({}); const [wish,setWish]=useState<string[]>([]); const [email,setEmail]=useState(''); const [logged,setLogged]=useState(false); const [notice,setNotice]=useState('');
 useEffect(()=>{setLang(load('snackies_lang','en')); setCurrency(load('snackies_currency','EUR')); setCart(load('snackies_cart',{})); setWish(load('snackies_wish',[])); const e=load('snackies_user',''); if(e){setEmail(e); setLogged(true); const saved=load<Cart>(`snackies_cart_${e}`,{}); if(Object.keys(saved).length){setCart(saved); setNotice(t[lang].recovery)}}},[]);
 useEffect(()=>{localStorage.setItem('snackies_cart',JSON.stringify(cart)); if(logged && email)localStorage.setItem(`snackies_cart_${email}`,JSON.stringify(cart));},[cart,logged,email]);
 useEffect(()=>{localStorage.setItem('snackies_wish',JSON.stringify(wish)); localStorage.setItem('snackies_lang',JSON.stringify(lang)); localStorage.setItem('snackies_currency',JSON.stringify(currency));},[wish,lang,currency]);
 const visible=useMemo(()=>products.filter(p=>(cat==='All'||p.category===cat)&&(region==='All'||p.region===region)&&(p.name+p.description+p.tags.join(' ')).toLowerCase().includes(query.toLowerCase())),[query,cat,region]);
 const cartItems=Object.entries(cart).map(([id,quantity])=>({product:products.find(p=>p.id===id)!,quantity})).filter(x=>x.product); const subtotal=cartItems.reduce((s,x)=>s+x.product.priceEur*x.quantity,0);
 function add(id:string){setCart(c=>({...c,[id]:(c[id]||0)+1}))} function remove(id:string){setCart(c=>{const n={...c}; if((n[id]||0)<=1) delete n[id]; else n[id]--; return n})}
 async function checkout(){ const res=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:cartItems.map(x=>({id:x.product.id,quantity:x.quantity})),customerEmail:logged?email:undefined})}); const data=await res.json(); if(data.url) location.href=data.url; else alert(data.error||'Checkout failed'); }
 function login(){ if(!email.includes('@')) return alert('Enter an email address'); localStorage.setItem('snackies_user',JSON.stringify(email)); setLogged(true); setNotice('Logged in. Basket recovery is active.'); }
 function logout(){localStorage.removeItem('snackies_user'); setLogged(false);}
 const copy=t[lang];
 return <main><nav className="nav"><div className="brand"><span className="mark">S</span><b>Snackies</b></div><div className="controls"><select value={lang} onChange={e=>setLang(e.target.value as Lang)}>{languages.map(l=><option key={l}>{l}</option>)}</select><select value={currency} onChange={e=>setCurrency(e.target.value)}>{Object.keys(currencies).map(c=><option key={c}>{c}</option>)}</select><a href="/admin">{copy.admin}</a><a href="/legal">Legal</a></div></nav>
 <section className="hero"><p className="eyebrow">Snackies International Market</p><h1>{copy.hero}</h1><p>{copy.subtitle}</p><div className="login"><User size={18}/>{logged?<><span>{email}</span><button onClick={logout}>{copy.logout}</button></>:<><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@domain.com"/><button onClick={login}>{copy.login}</button></>}</div>{notice&&<p className="notice">{notice}</p>}</section>
 <section className="toolbar"><input placeholder={copy.search} value={query} onChange={e=>setQuery(e.target.value)}/><select value={cat} onChange={e=>setCat(e.target.value)}><option>All</option>{categories.map(c=><option key={c}>{c}</option>)}</select><select value={region} onChange={e=>setRegion(e.target.value)}><option>All</option>{regions.map(r=><option key={r}>{r}</option>)}</select></section>
 <section className="layout"><div className="products">{visible.map(p=><article className="card" key={p.id}><button className="heart" onClick={()=>setWish(w=>w.includes(p.id)?w.filter(x=>x!==p.id):[...w,p.id])}><Heart fill={wish.includes(p.id)?'currentColor':'none'} size={18}/></button><div className="emoji">{p.image}</div><small>{p.region} · {p.category}</small><h3>{p.name}</h3><p>{p.description}</p><div className="row"><b>{money(p.priceEur,currency)}</b><span>{p.stock} left</span></div><button className="primary" onClick={()=>add(p.id)}>Add to {copy.cart}</button></article>)}</div>
 <aside className="basket"><h2><ShoppingBag/> {copy.cart}</h2>{cartItems.length===0?<p>Your basket is empty.</p>:cartItems.map(x=><div className="cartrow" key={x.product.id}><span>{x.product.image} {x.product.name}</span><div><button onClick={()=>remove(x.product.id)}>-</button><b>{x.quantity}</b><button onClick={()=>add(x.product.id)}>+</button></div></div>)}<hr/><div className="row"><b>Subtotal</b><b>{money(subtotal,currency)}</b></div><p className="tiny">Checkout is charged in EUR. Display currencies are approximate until a live FX provider is added.</p><button disabled={!cartItems.length} onClick={checkout} className="checkout">{copy.checkout}</button><h3>{copy.wishlist}</h3><p>{wish.length} saved snacks</p></aside></section>
 <section className="reviews"><h2>{copy.reviews}</h2>{reviews.map(r=><article key={r.name} className="review"><div>{Array.from({length:r.stars}).map((_,i)=><Star key={i} size={16} fill="currentColor"/> )}</div><b>{r.name}</b><p>{r.text}</p></article>)}</section>
 <footer>Snackies · Luxury international snacks · Taxes handled by Stripe Tax when configured · No crypto</footer></main>
}
