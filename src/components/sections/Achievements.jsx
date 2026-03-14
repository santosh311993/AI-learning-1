import { motion } from 'framer-motion'
import { achievements } from '../../data/achievements'

export default function Achievements() {
  return (
    <section
      id="achievements"
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
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Achievements</h2>
        </motion.div>

        {/* Scrollable container like surajadsul.me certificates section */}
        <div className="max-h-80 overflow-y-auto pr-1 space-y-3 scrollbar-thin">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors duration-200"
            >
              {/* Icon */}
              <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 text-base">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 flex-shrink-0">
                    {item.date}
                  </p>
                </div>
                <p className="text-xs text-teal-500 dark:text-teal-400 font-medium mt-0.5">
                  {item.issuer}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
