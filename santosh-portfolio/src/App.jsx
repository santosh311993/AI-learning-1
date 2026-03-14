import { ThemeProvider } from './context/ThemeContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/sections/Home'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'

function App() {
  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 min-h-screen">
        <Header />
        <main>
          <Home />
          <Skills />
          <Projects />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
