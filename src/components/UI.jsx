import {useEffect,useRef,useState} from 'react'; import gsap from 'gsap'; import {ScrollTrigger} from 'gsap/ScrollTrigger'; import {Menu,X} from 'lucide-react'; import {me,nav} from '../data.js'
gsap.registerPlugin(ScrollTrigger)
export function Reveal({children,className='',y=50,delay=0,stagger}){const r=useRef()
 useEffect(()=>{const t=stagger?r.current.children:r.current;const a=gsap.from(t,{y,opacity:0,duration:1,delay,stagger:stagger||0,ease:'power3.out',scrollTrigger:{trigger:r.current,start:'top 85%'}});return()=>{a.scrollTrigger?.kill();a.kill()}},[])
 return <div ref={r} className={className}>{children}</div>}
export function Title({a,b,n}){return <Reveal className="mb-14"><p className="text-accent text-xs tracking-[.4em] mb-3">{n} /</p>
 <h2 className="font-display font-bold text-5xl md:text-7xl silver leading-none">{a} <span style={{WebkitTextFillColor:'#ff6a1a'}}>{b}</span></h2></Reveal>}
export function Tilt({children,className=''}){const r=useRef()
 const mv=e=>{const b=r.current.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5
  gsap.to(r.current,{rotateY:x*14,rotateX:-y*14,duration:.4,transformPerspective:900})}
 return <div ref={r} onMouseMove={mv} onMouseLeave={()=>gsap.to(r.current,{rotateX:0,rotateY:0,duration:.6})} className={className}>{children}</div>}
export function Nav(){const [o,setO]=useState(false)
 return(<header className="fixed top-0 inset-x-0 z-50 flex justify-between items-center px-6 md:px-12 py-5 mix-blend-difference">
  <a href="#home" className="font-display font-bold tracking-widest text-white">{me.name}</a>
  <nav className="hidden md:flex gap-8 text-xs uppercase tracking-widest">{nav.map(([n,id])=><a key={id} href={'#'+id} className="text-white hover:text-accent transition">{n}</a>)}</nav>
  <button className="md:hidden text-white" aria-label="menu" onClick={()=>setO(!o)}>{o?<X/>:<Menu/>}</button>
  {o&&<div className="md:hidden fixed inset-0 top-0 bg-black flex flex-col items-center justify-center gap-7 text-2xl font-display">{nav.map(([n,id])=><a key={id} href={'#'+id} onClick={()=>setO(false)} className="text-white hover:text-accent">{n}</a>)}</div>}
 </header>)}
