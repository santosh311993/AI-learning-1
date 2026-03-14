import { motion } from 'framer-motion'

export default function About() {
  return (
    <section
      id="about"
      className="py-16 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">About</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl"
        >
          <p>
            I&apos;m a Senior Software Developer with{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">7.5 years of experience</span>{' '}
            building high-quality, scalable applications that drive real business outcomes.
          </p>
          <p>
            My expertise spans the full stack — from crafting performant{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">React</span> frontends and
            robust <span className="text-zinc-900 dark:text-zinc-100 font-medium">Node.js</span> backends
            to designing efficient database schemas with{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">PostgreSQL and MongoDB</span>.
          </p>
          <p>
            I&apos;m passionate about the intersection of software and AI. I&apos;ve built production AI systems
            using{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">
              LangChain, LangGraph, and OpenAI GPT models
            </span>
            , including an AI chatbot that won first place at the 2025 Tech9 AI Hackathon.
          </p>
          <p>
            I thrive in Agile environments and have collaborated with distributed global teams to
            deliver solutions for enterprise clients including{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Autodesk, DHL, and MonetaGo</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
