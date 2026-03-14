import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'santoshmargale3103@gmail.com',
    href: 'mailto:santoshmargale3103@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/santosh311993',
    href: 'https://github.com/santosh311993',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/santosh-margale',
    href: 'https://linkedin.com/in/santosh-margale',
  },
]

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const message = form.message.value
    const subject = `Portfolio contact from ${name}`
    const body = `From: ${name} (${email})\n\n${message}`
    window.location.href = `mailto:santoshmargale3103@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section
      id="contact"
      className="py-16 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Contact</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Open to new opportunities, collaborations, or just a good conversation about tech.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-3"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-200"
              >
                <Icon size={15} className="text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">{label}</p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-200">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-teal-500 dark:bg-teal-600 text-white font-medium hover:bg-teal-600 dark:hover:bg-teal-500 transition-colors duration-200 text-sm"
              >
                <Send size={14} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
