import {useState} from 'react';
import {Github,Linkedin,Instagram,Mail,MapPin,ExternalLink,Send,Radio} from 'lucide-react'
import {me,about as A,skills,projects,timeline} from '../data.js';
import {Reveal,Title,Tilt} from './UI.jsx'

const S=({id,children})=><section id={id} className="relative px-6 md:px-12 py-28 max-w-7xl mx-auto">{children}</section>

export const About=()=><S id="about"><Title a="About" b="Me" n="01"/>
 <div className="grid md:grid-cols-5 gap-12 items-center">
  <Reveal className="md:col-span-2"><Tilt><div className="relative rounded-2xl overflow-hidden border border-white/10"><img src={me.image} alt={me.name} className="w-full grayscale hover:grayscale-0 transition duration-700"/><div className="scan"/></div></Tilt></Reveal>
  <Reveal className="md:col-span-3 space-y-8" stagger={.12}>
   <p className="text-2xl md:text-3xl font-display font-light text-white leading-snug">{A.intro}</p>
   {[['Education',A.education],['Interests',A.interests],['Career Goals',A.goals]].map(([k,v])=><div key={k} className="border-l-2 border-accent pl-5"><h3 className="text-accent text-xs tracking-[.3em] uppercase mb-1">{k}</h3><p className="text-zinc-400">{v}</p></div>)}
   <p className="flex items-center gap-2 text-zinc-500 text-sm"><MapPin size={16}/>{me.location}</p></Reveal></div></S>

export const Skills=()=><S id="services"><Title a="Skills &" b="Services" n="02"/>
 <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={.1}>{Object.entries(skills).map(([k,v])=>
  <Tilt key={k} className="group rounded-2xl border border-white/10 bg-white/[.03] p-6 hover:border-accent/60 hover:bg-accent/5 transition-colors">
   <h3 className="font-display text-xl text-white mb-4 group-hover:text-accent transition">{k}</h3>
   <div className="flex flex-wrap gap-2">{v.map(s=><span key={s} className="text-xs px-3 py-1 rounded-full border border-white/15 text-zinc-300 group-hover:-translate-y-0.5 transition">{s}</span>)}</div></Tilt>)}</Reveal></S>

export const Projects=()=><S id="projects"><Title a="Selected" b="Projects" n="03"/>
 <div className="grid md:grid-cols-2 gap-8">{projects.map(p=><Reveal key={p.t}><Tilt className="group rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden h-full flex flex-col justify-between hover:border-accent/50 transition-all duration-300">
  <div>
   {/* Project Cover Image */}
   <div className="relative h-56 sm:h-64 overflow-hidden bg-zinc-900 border-b border-white/10">
    {p.image ? (
     <img
      src={p.image}
      alt={p.t}
      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
     />
    ) : (
     <div className="w-full h-full flex items-center justify-center" style={{background:`radial-gradient(circle at 30% 30%,${p.g.split(',')[0]}55,${p.g.split(',')[1]})`}}>
      <span className="font-display text-5xl text-white/80">{p.t.split(' ').map(w=>w[0]).join('')}</span>
     </div>
    )}
    <div className="scan"/>
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-70"/>
    <span className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-black/75 border border-white/15 text-emerald-400 backdrop-blur-md">
     <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>LIVE
    </span>
   </div>

   {/* Project Details */}
   <div className="p-6">
    <h3 className="font-display text-2xl text-white mb-2 group-hover:text-accent transition-colors">
     <a href={p.live || p.gh} target="_blank" rel="noreferrer" className="flex items-center justify-between">
      <span>{p.t}</span>
     </a>
    </h3>
    <p className="text-zinc-400 text-sm mb-5 leading-relaxed">{p.d}</p>
    <div className="flex flex-wrap gap-2 mb-6">
     {p.tech.map(t=><span key={t} className="text-[11px] text-accent/90 border border-accent/30 bg-accent/5 rounded-full px-2.5 py-0.5">{t}</span>)}
    </div>
   </div>
  </div>

  {/* Actions */}
  <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between gap-4">
   <a
    href={p.gh}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors py-2 px-3 rounded-lg border border-white/10 hover:border-white/25"
   >
    <Github size={14}/><span>Source Code</span>
   </a>
   {p.live && (
    <a
     href={p.live}
     target="_blank"
     rel="noreferrer"
     className="flex items-center gap-1.5 text-xs text-black font-semibold bg-accent hover:bg-accent/90 transition-all py-2 px-4 rounded-lg shadow-[0_0_15px_rgba(255,106,26,0.25)] hover:shadow-[0_0_20px_rgba(255,106,26,0.45)]"
    >
     <Radio size={14} className="animate-pulse"/><span>Live Demo</span><ExternalLink size={13}/>
    </a>
   )}
  </div>
 </Tilt></Reveal>)}</div></S>

export const Journey=()=><S id="journey"><Title a="Experience &" b="Education" n="04"/>
 <div className="relative border-l border-white/15 ml-2 space-y-12">{timeline.map(t=><Reveal key={t.t} y={30} className="pl-8 relative">
  <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent shadow-[0_0_14px_#ff6a1a]"/>
  <p className="text-accent text-xs tracking-widest">{t.y}</p><h3 className="font-display text-2xl text-white">{t.t}</h3><p className="text-zinc-300">{t.s}</p><p className="text-zinc-500 text-sm mt-1">{t.d}</p>{t.certificate && <a href={t.certificate} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-sm text-accent hover:underline">View Certificate <ExternalLink size={14}/></a>}</Reveal>)}</div></S>

export function Contact(){
 const [f,setF]=useState({n:'',e:'',m:''});
 const [status,setStatus]=useState('idle');
 const [error,setError]=useState('');
 const submit=async e=>{
  e.preventDefault();
  if(status==='sending')return;
  setStatus('sending');setError('');
  try{
   const response=await fetch('https://formspree.io/f/xzerrjgk',{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({name:f.n,email:f.e,message:f.m})
   });
   if(!response.ok){
    const data=await response.json().catch(()=>null);
    throw new Error(data?.errors?.map(item=>item.message).join(' ')||'Unable to send your message. Please try again.');
   }
   setStatus('success');
   setF({n:'',e:'',m:''});
  }catch(err){
   setStatus('error');
   setError(err.message||'Unable to send your message. Please try again.');
  }
 };
 const inp="w-full bg-transparent border-b border-white/20 focus:border-accent outline-none py-3 text-white placeholder-zinc-600 transition";
 const links=[[Mail,me.email,'mailto:'+me.email],[Github,'GitHub',me.github],[Linkedin,'LinkedIn',me.linkedin],[Instagram,'Instagram',me.instagram]];
 return <S id="contact"><Title a="Let's" b="Talk" n="05"/><div className="grid md:grid-cols-2 gap-14">
  <Reveal className="space-y-5" stagger={.1}>{links.map(([I,l,h])=><a key={l} href={h} target={h.startsWith('mailto')?undefined:'_blank'} rel="noreferrer" className="flex items-center gap-4 text-xl text-zinc-300 hover:text-accent hover:translate-x-2 transition"><I size={22}/>{l}</a>)}</Reveal>
  <Reveal><form onSubmit={submit} className="space-y-6">
   <input required name="name" autoComplete="name" className={inp} placeholder="Your name" value={f.n} onChange={e=>setF({...f,n:e.target.value})}/>
   <input required name="email" type="email" autoComplete="email" className={inp} placeholder="Your email" value={f.e} onChange={e=>setF({...f,e:e.target.value})}/>
   <textarea required name="message" rows={4} className={inp} placeholder="Your message" value={f.m} onChange={e=>setF({...f,m:e.target.value})}/>
   <button disabled={status==='sending'} className="flex items-center gap-2 bg-accent text-black font-medium rounded-full px-7 py-3 hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"><Send size={16}/>{status==='sending'?'Sending…':'Send Message'}</button>
   <div role="status" aria-live="polite">
    {status==='success'&&<p className="text-sm text-emerald-400">Message sent successfully! Thank you for reaching out.</p>}
    {status==='error'&&<p className="text-sm text-red-400">{error}</p>}
   </div>
  </form></Reveal></div></S>
}

export const Footer=()=><footer className="relative overflow-hidden pt-10 pb-6 text-center border-t border-white/10">
 <p className="font-display font-bold silver text-[14vw] leading-none tracking-tighter">{me.name}</p>
 <p className="text-xs text-zinc-600 mt-4">© {new Date().getFullYear()} {me.name}. All rights reserved.</p></footer>
