// ✏️ EDIT YOUR CONTENT HERE
export const me = {
  name: 'VIKAS H Y',
  role: 'Full Stack Developer | AI Enthusiast',
  college: 'Maharaja Institute of Technology',
  location: 'Mysore, India',
  email: 'hyvikas6@gmail.com',
  github: 'https://github.com/HYVIKAS6',
  linkedin: 'https://www.linkedin.com/in/vikas-h-y-290001329?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  instagram: 'https://www.instagram.com/',
  image: `${import.meta.env.BASE_URL}profile.png`
}

export const nav = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Services', 'services'],
  ['Projects', 'projects'],
  ['Experience', 'journey'],
  ['Contact', 'contact']
]

export const about = {
  intro: "I'm a full stack developer who loves turning ideas into fast, polished products — from interactive interfaces to the APIs and AI models behind them.",
  education: `Engineering student at ${me.college}, ${me.location}.`,
  interests: 'Web performance, creative coding, generative AI, and building intelligent products.',
  goals: 'To grow into an engineer who ships AI-powered products that people genuinely enjoy using.'
}

export const skills = {
  'Programming Languages': ['JavaScript', 'Python', 'Java', 'C'],
  'Frontend Development': ['React', 'Tailwind CSS', 'GSAP', 'Three.js'],
  'Backend Development': ['Node.js', 'Express', 'REST APIs', 'Auth'],
  'Databases': ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'],
  'AI & Machine Learning': ['scikit-learn', 'TensorFlow', 'PyTorch', 'LLM APIs', 'Prompt Design'],
  'Development Tools': ['Git & GitHub', 'VS Code', 'Postman', 'Vite']
}

export const projects = [
  {
    t: 'E-Waste Exchange Platform',
    d: 'Sustainable circular economy marketplace with real-time pickup logistics and ElectroAI smart recycling assistant.',
    tech: ['React', 'Node.js', 'Firebase', 'Tailwind CSS', 'ElectroAI'],
    g: '#ff6a1a,#2a0f00',
    gh: 'https://github.com/HYVIKAS6/E-waste-exchange-platform-',
    live: 'https://e-waste-ex.netlify.app',
    image: `${import.meta.env.BASE_URL}project-ewaste.png`
  },
  {
    t: 'Hostel MIT Management',
    d: 'Next-gen institutional hostel operations suite featuring smart room allocations, warden approval workflows, fee records, and live status registries.',
    tech: ['Java', 'Spring', 'MySQL', 'JavaScript', 'HTML5/CSS3'],
    g: '#8ab4ff,#050b1f',
    gh: 'https://github.com/HYVIKAS6/Hostel-mit',
    live: 'https://hyvikas6.github.io/Hostel-mit/',
    image: `${import.meta.env.BASE_URL}project-hostel.png`
  },
  {
    t: 'FundedHive Search Automation',
    d: 'High-throughput parallel search engine indexation verifier across 8 major search providers, featuring real-time X/Twitter parsing and automated HTML reporting.',
    tech: ['Python', 'Selenium', 'Async Search Engines', 'HTML Report Generator'],
    g: '#38bdf8,#03141a',
    gh: 'https://github.com/HYVIKAS6/fundedhive-search-automation',
    live: 'https://hyvikas6.github.io/fundedhive-search-automation/',
    image: `${import.meta.env.BASE_URL}project-fundedhive.png`
  },
  {
    t: 'GridShield AI',
    d: 'Industrial cyber-physical smart grid defense platform with physics-informed consistency checking, IEEE 9/14-bus simulations, and ensemble AI anomaly detection.',
    tech: ['Python', 'PyTorch LSTM', 'XGBoost', 'Pandapower', 'Streamlit'],
    g: '#d7b5ff,#15091f',
    gh: 'https://github.com/HYVIKAS6/Gridshield-AI',
    live: 'https://hyvikas6.github.io/Gridshield-AI/',
    image: `${import.meta.env.BASE_URL}project-gridshield.png`
  }
]

export const timeline = [
  { y: 'Present', t: 'B.E. Computer Science & Engineering', s: me.college, d: 'Core CS, software engineering, systems design, and AI coursework.' },
  { y: 'Certification', t: 'Data Structures in C', s: 'University of Michigan | Coursera', d: 'Course covering pointers, arrays, C structures, linked lists and dynamic memory allocation.', certificate: 'https://www.coursera.org/account/accomplishments/verify/GTDWPHR3Q7P9' },
  { y: '2026', t: 'FundedHive Automated Indexation Suite', s: 'Engineering Project', d: 'Architected high-speed multi-engine indexation & social media crawlers.' },
  { y: '2026', t: 'GridShield AI Research & Development', s: 'AI & Systems Defense', d: 'Authored multi-model intrusion detection pipelines & physics-informed ML models.' }
]
