// ✏️ EDIT YOUR CONTENT HERE
export const me={name:'VIKAS H Y',role:'Full Stack Developer | AI Enthusiast',college:'Maharaja Institute of Technology',location:'Mysore, India',
email:'hyvikas6@gmail.com',github:'https://github.com/HYVIKAS6',
linkedin:'https://www.linkedin.com/in/vikas-h-y-290001329?utm_source=share_via&utm_content=profile&utm_medium=member_android',
instagram:'https://www.instagram.com/',image:`${import.meta.env.BASE_URL}profile.png`}
export const nav=[['Home','home'],['About','about'],['Services','services'],['Projects','projects'],['Components','journey'],['Contact','contact']]
export const about={intro:"I'm a full stack developer who loves turning ideas into fast, polished products — from interactive interfaces to the APIs and AI models behind them.",
education:`Engineering student at ${me.college}, ${me.location}.`,interests:'Web performance, creative coding, generative AI, and building intelligent products.',goals:'To grow into an engineer who ships AI-powered products that people genuinely enjoy using.'}
export const skills={'Programming Languages':['JavaScript','Python','Java','C'],'Frontend Development':['React','Tailwind CSS','GSAP','Three.js'],
'Backend Development':['Node.js','Express','REST APIs','Auth'],'Databases':['MongoDB','MySQL','PostgreSQL','Firebase'],
'AI & Machine Learning':['scikit-learn','TensorFlow','LLM APIs','Prompt Design'],'Development Tools':['Git & GitHub','VS Code','Postman','Vite']}
export const projects=[
{t:'AI Chat Assistant',d:'A conversational assistant with streaming replies, memory and a clean chat UI.',tech:['React','Node.js','LLM API'],g:'#ff6a1a,#2a0f00',gh:me.github,live:me.github},
{t:'Smart Dashboard',d:'Real-time analytics dashboard with charts, filters and role-based access.',tech:['React','Express','MongoDB'],g:'#8ab4ff,#050b1f',gh:me.github,live:me.github},
{t:'ML Prediction App',d:'Train-and-predict web app exposing a machine learning model through a REST API.',tech:['Python','Flask','scikit-learn'],g:'#b0ffd0,#03140a',gh:me.github,live:me.github}]
export const timeline=[
{y:'Present',t:'B.E. Engineering',s:me.college,d:'Core CS, software engineering and AI coursework.'},
{y:'Add year',t:'Internship',s:'Company name',d:'Describe what you built and learned here.'},
{y:'Add year',t:'Certification',s:'Issuer',d:'Add your certifications (cloud, AI, web).'},
{y:'Add year',t:'Projects & Hackathons',s:'Personal / Team',d:'Shipped full stack and AI projects end-to-end.'}]
