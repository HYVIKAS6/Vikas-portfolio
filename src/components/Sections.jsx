import {useState} from 'react'; import {Github,Linkedin,Instagram,Mail,MapPin,ExternalLink,Send} from 'lucide-react'
import {me,about as A,skills,projects,timeline} from '../data.js'; import {Reveal,Title,Tilt} from './UI.jsx'
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
 <div className="grid md:grid-cols-3 gap-6">{projects.map(p=><Reveal key={p.t}><Tilt className="rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden h-full">
  <div className="h-44 relative" style={{background:`radial-gradient(circle at 30% 30%,${p.g.split(',')[0]}55,${p.g.split(',')[1]})`}}><div className="scan"/><span className="absolute bottom-3 left-4 font-display text-4xl text-white/80">{p.t.split(' ').map(w=>w[0]).join('')}</span></div>
  <div className="p-6"><h3 className="font-display text-xl text-white mb-2">{p.t}</h3><p className="text-zinc-400 text-sm mb-4">{p.d}</p>
   <div className="flex flex-wrap gap-2 mb-5">{p.tech.map(t=><span key={t} className="text-[11px] text-accent border border-accent/40 rounded-full px-2 py-0.5">{t}</span>)}</div>
   <div className="flex gap-5 text-sm"><a href={p.gh} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-accent"><Github size={15}/>Code</a><a href={p.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-accent"><ExternalLink size={15}/>Live Demo</a></div></div></Tilt></Reveal>)}</div></S>
export const Journey=()=><S id="journey"><Title a="Experience &" b="Education" n="04"/>
 <div className="relative border-l border-white/15 ml-2 space-y-12">{timeline.map(t=><Reveal key={t.t} y={30} className="pl-8 relative">
  <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent shadow-[0_0_14px_#ff6a1a]"/>
  <p className="text-accent text-xs tracking-widest">{t.y}</p><h3 className="font-display text-2xl text-white">{t.t}</h3><p className="text-zinc-300">{t.s}</p><p className="text-zinc-500 text-sm mt-1">{t.d}</p></Reveal>)}</div></S>
export function Contact(){const [f,setF]=useState({n:'',e:'',m:''});const [ok,setOk]=useState(false)
 const submit=e=>{e.preventDefault();window.location.href=`mailto:${me.email}?subject=${encodeURIComponent('Portfolio message from '+f.n)}&body=${encodeURIComponent(f.m+'\n\n'+f.n+' ('+f.e+')')}`;setOk(true)}
 const inp="w-full bg-transparent border-b border-white/20 focus:border-accent outline-none py-3 text-white placeholder-zinc-600 transition"
 const links=[[Mail,me.email,'mailto:'+me.email],[Github,'GitHub',me.github],[Linkedin,'LinkedIn',me.linkedin],[Instagram,'Instagram',me.instagram]]
 return <S id="contact"><Title a="Let's" b="Talk" n="05"/><div className="grid md:grid-cols-2 gap-14">
  <Reveal className="space-y-5" stagger={.1}>{links.map(([I,l,h])=><a key={l} href={h} target={h.startsWith('mailto')?undefined:'_blank'} rel="noreferrer" className="flex items-center gap-4 text-xl text-zinc-300 hover:text-accent hover:translate-x-2 transition"><I size={22}/>{l}</a>)}</Reveal>
  <Reveal><form onSubmit={submit} className="space-y-6">
   <input required className={inp} placeholder="Your name" value={f.n} onChange={e=>setF({...f,n:e.target.value})}/>
   <input required type="email" className={inp} placeholder="Your email" value={f.e} onChange={e=>setF({...f,e:e.target.value})}/>
   <textarea required rows={4} className={inp} placeholder="Your message" value={f.m} onChange={e=>setF({...f,m:e.target.value})}/>
   <button className="flex items-center gap-2 bg-accent text-black font-medium rounded-full px-7 py-3 hover:scale-105 transition"><Send size={16}/>Send Message</button>
   {ok&&<p className="text-sm text-zinc-400">Opening your email app…</p>}</form></Reveal></div></S>}
export const Footer=()=><footer className="relative overflow-hidden pt-10 pb-6 text-center border-t border-white/10">
 <p className="font-display font-bold silver text-[14vw] leading-none tracking-tighter">{me.name}</p>
 <p className="text-xs text-zinc-600 mt-4">© {new Date().getFullYear()} {me.name}. All rights reserved.</p></footer>
