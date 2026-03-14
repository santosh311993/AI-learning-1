import { Github, Linkedin, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: Github, href: 'https://github.com/santosh311993', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/santosh-margale', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:santoshmargale3103@gmail.com', label: 'Email' },
]

export default function Footer() {
  const handleNav = (href) => {
    if (href === '#home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-5">
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} Santosh Margale
          </p>
        </div>
      </div>
    </footer>
  )
}
