import Hero from './components/Hero'
import { Nav } from './components/UI'
import { About, Projects, Certifications, Contact, Footer } from './components/Sections'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex="-1">
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
