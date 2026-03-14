import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Blog', href: '#blog' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (href) => {
    setMenuOpen(false)
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Left: profile photo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex-shrink-0"
            aria-label="Back to top"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-700">
              <img
                src="/my_profile_pic.jpeg"
                alt="Santosh Margale"
                className="w-full h-full object-cover"
              />
            </div>
          </button>

          {/* Center: pill nav */}
          <nav className="hidden md:flex items-center rounded-full border border-zinc-200 dark:border-zinc-700 px-1.5 py-1 gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="px-4 py-1 text-sm rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: theme + mobile menu */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-3 border-t border-zinc-100 dark:border-zinc-800">
            <nav className="flex flex-col pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-2 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
