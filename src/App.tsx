import About from './components/About'
import Hero from './components/Hero'
import Inspiration from './components/Inspiration'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Inspiration />
      </main>
    </>
  )
}
