import {useEffect,useRef} from 'react'; import * as THREE from 'three'; import gsap from 'gsap'; import {me} from '../data.js'
const vs=`attribute vec3 aS;attribute float aC;varying float vC;uniform float uP,uT,uG,uS;uniform vec2 uM;
void main(){vec3 p=mix(aS,position,uP);p.z+=sin(uT+position.x*3.)*.03*uP;
vec2 d=p.xy-uM;float f=smoothstep(.9,0.,length(d))*uP;p.xy+=normalize(d+1e-4)*f*.5;p.z+=f*.6;
float b=step(.96,fract(sin(floor(p.y*14.+floor(uT*9.))*43758.5)))*uG;p.x+=b*.45;
vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=uS*(1.6+f*2.)*5./-mv.z;vC=aC;gl_Position=projectionMatrix*mv;}`
const fs=`varying float vC;void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;gl_FragColor=vec4(vec3(vC),smoothstep(.5,.1,r));}`
export default function Hero(){
 const box=useRef(),title=useRef()
 useEffect(()=>{
  const el=box.current;let dead=false
  const r=new THREE.WebGLRenderer({antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(el.clientWidth,el.clientHeight);el.appendChild(r.domElement)
  const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,el.clientWidth/el.clientHeight,.1,100)
  const fit=()=>{cam.aspect=el.clientWidth/el.clientHeight;cam.position.z=cam.aspect<1?9:6;cam.updateProjectionMatrix();r.setSize(el.clientWidth,el.clientHeight)};fit()
  const u={uP:{value:0},uM:{value:new THREE.Vector2(99,99)},uT:{value:0},uG:{value:0},uS:{value:r.getPixelRatio()}}
  const img=new Image();img.src=me.image
  img.onload=()=>{if(dead)return;const N=230,cv=document.createElement('canvas');cv.width=cv.height=N
   const x=cv.getContext('2d');x.drawImage(img,0,0,N,N);const d=x.getImageData(0,0,N,N).data,pos=[],st=[],col=[]
   for(let i=0;i<N;i++)for(let j=0;j<N;j++){const k=(i*N+j)*4,l=(d[k]+d[k+1]+d[k+2])/765
    if(1-l<.1||Math.random()>.6)continue
    pos.push((j/N-.5)*4.8,(.5-i/N)*4.8,(Math.random()-.5)*.3)
    const a=Math.random()*6.28,rad=3+Math.random()*5;st.push(Math.cos(a)*rad,Math.sin(a)*rad,(Math.random()-.5)*8)
    col.push(Math.min(1,.28+l*.9+Math.random()*.12))}
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('aS',new THREE.Float32BufferAttribute(st,3));g.setAttribute('aC',new THREE.Float32BufferAttribute(col,1))
   sc.add(new THREE.Points(g,new THREE.ShaderMaterial({vertexShader:vs,fragmentShader:fs,uniforms:u,transparent:true,depthWrite:false})))
   gsap.to(u.uP,{value:1,duration:3.2,ease:'power3.inOut',delay:1.6})}
  const glitch=()=>{gsap.timeline({delay:2+Math.random()*3,onComplete:glitch}).to(u.uG,{value:1,duration:.05}).to(u.uG,{value:0,duration:.18,delay:.1})};glitch()
  const mv=e=>{const b=el.getBoundingClientRect(),hh=Math.tan(Math.PI/8)*cam.position.z
   u.uM.value.set(((e.clientX-b.left)/b.width*2-1)*hh*cam.aspect,-((e.clientY-b.top)/b.height*2-1)*hh)}
  const lv=()=>u.uM.value.set(99,99);el.addEventListener('pointermove',mv);el.addEventListener('pointerleave',lv);addEventListener('resize',fit)
  const tick=t=>{u.uT.value=t/1000;sc.rotation.y=Math.sin(t/2500)*.08;r.render(sc,cam)};gsap.ticker.add(tick)
  gsap.from(title.current.children,{yPercent:110,opacity:0,stagger:.06,duration:1.2,ease:'power4.out',delay:2.4})
  gsap.from('.hero-sub',{opacity:0,y:20,stagger:.15,duration:1,delay:3.2})
  return()=>{dead=true;gsap.ticker.remove(tick);removeEventListener('resize',fit);r.dispose();el.removeChild(r.domElement)}},[])
 return(<section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
  <h1 ref={title} aria-label="Portfolio" className="glitch silver font-display font-bold absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 flex justify-center overflow-hidden text-[19vw] leading-none tracking-tighter select-none">
   {'PORTFOLIO'.split('').map((c,i)=><span key={i} className={i>5?'text-accent':''} style={i>5?{WebkitTextFillColor:'#ff6a1a'}:{}}>{c}</span>)}</h1>
  <div ref={box} className="absolute inset-0 z-10"/>
  <div className="noise z-20"/><div className="scan z-20"/>
  <div className="absolute bottom-10 inset-x-0 z-30 text-center px-4">
   <p className="hero-sub font-display tracking-[.3em] text-xs sm:text-sm text-zinc-300 uppercase">{me.role}</p>
   <a href="#contact" className="hero-sub mt-5 inline-block border border-white/30 hover:bg-accent hover:border-accent hover:text-black rounded-full px-6 py-2 text-xs tracking-widest uppercase transition">Contact Me</a></div>
 </section>)}
