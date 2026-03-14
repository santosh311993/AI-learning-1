import { motion } from 'framer-motion'
import { experiences } from '../../data/experience'

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 bg-white dark:bg-zinc-900 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Work</h2>
        </motion.div>

        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="group flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors duration-200"
            >
              {/* Company logo placeholder */}
              <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {exp.logo}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                    {exp.company}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 flex-shrink-0">
                    {exp.period}
                  </p>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{exp.role}</p>

                {/* Highlights - shown on hover or always visible */}
                <ul className="mt-3 space-y-1.5">
                  {exp.highlights.map((point, i) => (
                    <li key={i} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5 leading-relaxed">
                      <span className="text-zinc-300 dark:text-zinc-600 mt-0.5 flex-shrink-0">—</span>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
