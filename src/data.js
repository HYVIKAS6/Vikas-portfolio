export const asset = (name) => import.meta.env.BASE_URL + name

export const me = {
  name: 'Vikas H Y',
  role: 'Full-stack developer',
  location: 'Mysore, India',
  college: 'Maharaja Institute of Technology',
  degree: 'B.E. in Computer Science and Engineering (Artificial Intelligence)',
  email: 'hyvikas6@gmail.com',
  github: 'https://github.com/HYVIKAS6',
  linkedin: 'https://www.linkedin.com/in/vikas-h-y-290001329',
  resume: asset('Vikas-H-Y-Resume.pdf'),
}

export const certificate = {
  title: 'Data Structures in C',
  issuer: 'University of Michigan',
  date: '30 January 2026',
  url: 'https://www.coursera.org/account/accomplishments/verify/GTDWPHR3Q7P9',
}

export const projects = [
  {
    id: 'gridshield',
    name: 'GridShield AI',
    field: 'Machine learning',
    description:
      'A voltage reading makes more sense beside the rest of the grid. GridShield compares simulated bus telemetry with electrical constraints and anomaly models, then plots the signals together.',
    tech: ['Python', 'Streamlit', 'PyTorch'],
    alt: 'GridShield simulator showing grid frequency, voltage and a live telemetry chart.',
    demo: 'https://gridshield-ai-9rfgltanyslf9tuihswpd2.streamlit.app/',
    action: 'Open live project',
    source: me.github + '/Gridshield-AI',
  },
  {
    id: 'ewaste',
    name: 'E-Waste Exchange',
    field: 'Web application',
    description:
      'A pickup starts with a device someone no longer uses. Electro_HUB brings item listings, scrap dealers and pickup scheduling into one recycling workflow.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    alt: 'Electro_HUB homepage with the recycling introduction and the link to list a device.',
    demo: 'https://e-waste-ex.netlify.app/',
    action: 'Visit platform',
    source: me.github + '/E-waste-exchange-platform-',
  },
  {
    id: 'fundedhive',
    name: 'FundedHive Search Automation',
    field: 'Browser automation',
    description:
      'A Python tool runs the same query across search engines and records what each returns. The HTML report keeps result titles, links and screenshots together for inspection.',
    tech: ['Python', 'Selenium', 'CSV'],
    alt: 'Published FundedHive search report with individual engine results and browser captures.',
    demo: 'https://hyvikas6.github.io/fundedhive-search-automation/',
    action: 'Read report',
    source: me.github + '/fundedhive-search-automation',
  },
  {
    id: 'hostel',
    name: 'Hostel MIT',
    field: 'Campus software',
    description:
      'Separate student and administrator views cover two sides of hostel life. Students can view their room and raise complaints. Administrators manage rooms, allocations and student records.',
    tech: ['Java', 'JavaScript', 'HTML'],
    alt: 'Hostel MIT sign-in page offering separate student and administrator entrances.',
    demo: 'https://hyvikas6.github.io/Hostel-mit/frontend/',
    action: 'Open interface',
    source: me.github + '/Hostel-mit',
  },
]
