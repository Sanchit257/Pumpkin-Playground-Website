import About from './components/About'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Inspiration from './components/Inspiration'
import Navbar from './components/Navbar'
import Schedule from './components/Schedule'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Inspiration />
        <Schedule />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
