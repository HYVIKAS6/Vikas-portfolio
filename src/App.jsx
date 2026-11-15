import {useEffect,useRef,useState} from 'react'; import gsap from 'gsap'; import {ScrollTrigger} from 'gsap/ScrollTrigger'; import Lenis from 'lenis'
import Hero from './components/Hero.jsx'; import {Nav} from './components/UI.jsx'; import {About,Skills,Projects,Journey,Contact,Footer} from './components/Sections.jsx'
gsap.registerPlugin(ScrollTrigger)
function Loader(){const r=useRef(),[n,setN]=useState(0)
 useEffect(()=>{const o={v:0};gsap.timeline().to(o,{v:100,duration:1.6,ease:'power2.inOut',onUpdate:()=>setN(Math.round(o.v))})
  .to(r.current,{yPercent:-100,duration:.9,ease:'power4.inOut'}).set(r.current,{display:'none'})},[])
 return <div ref={r} className="fixed inset-0 z-[100] bg-black flex items-end justify-between p-8"><span className="font-display text-xs tracking-[.4em] text-zinc-500">LOADING</span><span className="font-display text-8xl text-accent">{n}</span></div>}
export default function App(){
 useEffect(()=>{const l=new Lenis({lerp:.09});l.on('scroll',ScrollTrigger.update);const t=s=>l.raf(s*1000);gsap.ticker.add(t);gsap.ticker.lagSmoothing(0)
  const click=e=>{const a=e.target.closest('a[href^="#"]');if(a){e.preventDefault();l.scrollTo(a.getAttribute('href'))}};document.addEventListener('click',click)
  return()=>{gsap.ticker.remove(t);document.removeEventListener('click',click);l.destroy()}},[])
 return <><Loader/><Nav/><main><Hero/><About/><Skills/><Projects/><Journey/><Contact/></main><Footer/></>}
