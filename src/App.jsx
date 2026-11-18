import {useEffect} from 'react'; import gsap from 'gsap'; import {ScrollTrigger} from 'gsap/ScrollTrigger'; import Lenis from 'lenis'
import Hero from './components/Hero.jsx'; import {Nav} from './components/UI.jsx'; import {About,Skills,Projects,Journey,Contact,Footer} from './components/Sections.jsx'
gsap.registerPlugin(ScrollTrigger)
export default function App(){
 useEffect(()=>{const l=new Lenis({lerp:.09});l.on('scroll',ScrollTrigger.update);const t=s=>l.raf(s*1000);gsap.ticker.add(t);gsap.ticker.lagSmoothing(0)
  const click=e=>{const a=e.target.closest('a[href^="#"]');if(a){e.preventDefault();l.scrollTo(a.getAttribute('href'))}};document.addEventListener('click',click)
  return()=>{gsap.ticker.remove(t);document.removeEventListener('click',click);l.destroy()}},[])
 return <><Nav/><main><Hero/><About/><Skills/><Projects/><Journey/><Contact/></main><Footer/></>}
