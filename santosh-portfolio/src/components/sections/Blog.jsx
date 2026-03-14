import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight, X, Calendar } from 'lucide-react'
import { blogs } from '../../data/blogs'

function BlogModal({ blog, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-6 sm:p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            >
              <X size={16} />
            </button>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 pr-6">
              {blog.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500 mb-6 pb-5 border-b border-zinc-100 dark:border-zinc-800">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {blog.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {blog.readTime}
              </span>
            </div>

            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {blog.content.split('\n\n').map((block, i) => {
                if (block.startsWith('## ')) {
                  return (
                    <h3 key={i} className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-5 mb-1">
                      {block.replace('## ', '')}
                    </h3>
                  )
                }
                if (block.startsWith('```')) {
                  const code = block.replace(/```[\w]*/g, '').trim()
                  return (
                    <pre key={i} className="bg-zinc-950 text-zinc-200 rounded-lg p-4 overflow-x-auto text-xs font-mono">
                      <code>{code}</code>
                    </pre>
                  )
                }
                return (
                  <p key={i} dangerouslySetInnerHTML={{
                    __html: block
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-900 dark:text-zinc-100 font-medium">$1</strong>')
                      .replace(/`(.*?)`/g, '<code class="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
                  }} />
                )
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function BlogCard({ blog, index, onClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group grid grid-cols-[140px_1fr] gap-8 py-7 border-b border-zinc-100 dark:border-zinc-800 last:border-0 cursor-pointer"
      onClick={onClick}
    >
      {/* Date + read time */}
      <div className="pt-0.5 text-right">
        <p className="text-sm text-zinc-400 dark:text-zinc-500">{blog.date}</p>
        <p className="text-xs text-zinc-300 dark:text-zinc-600 mt-1 flex items-center justify-end gap-1">
          <Clock size={10} />
          {blog.readTime}
        </p>
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base leading-snug mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200">
          {blog.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
          {blog.excerpt}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 dark:text-teal-400 group-hover:gap-2 transition-all duration-200">
          Read article <ArrowRight size={13} />
        </span>
      </div>
    </motion.article>
  )
}

export default function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null)

  return (
    <section
      id="blog"
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
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Blog</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Thoughts on AI, full-stack development, and lessons from the field.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              index={index}
              onClick={() => setSelectedBlog(blog)}
            />
          ))}
        </div>
      </div>

      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </section>
  )
}
