import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const socials = [
  { icon: Github, href: 'https://github.com/santosh311993', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/santosh-margale', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:santoshmargale3103@gmail.com', label: 'Email' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-24 pb-16 bg-white dark:bg-zinc-900 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Text */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
              Santosh Margale
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed max-w-lg">
              Site Reliability Engineer with 5+ years of experience in DevOps, Kubernetes, AWS, and
              CI/CD automation. Passionate about infrastructure reliability and scalability.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Profile photo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-2 ring-zinc-100 dark:ring-zinc-800">
              <img
                src="/my_profile_pic.jpeg"
                alt="Santosh Margale"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
