import { useState } from 'react'
import { Github, Linkedin, Mail, Download, ArrowRight, X, Briefcase, Award, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { blogs } from '../../data/blogs'
import { experiences } from '../../data/experience'
import { certificates } from '../../data/certificates'

/* ── Certificate image modal ── */
function CertModal({ cert, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className="absolute inset-0 bg-black/70" onClick={onClose} />
        <motion.div
          className="relative z-10 max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-700"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{cert.title}</p>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            >
              <X size={15} />
            </button>
          </div>
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full object-contain max-h-[70vh]"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Company logo ── */
function CompanyLogo({ src, fallback, size = 'md' }) {
  const [err, setErr] = useState(false)
  const cls = size === 'sm'
    ? 'w-8 h-8 rounded-lg'
    : 'w-9 h-9 rounded-full'
  if (!src || err) {
    return (
      <div className={`${cls} bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 dark:text-zinc-400 flex-shrink-0`}>
        {fallback}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={fallback}
      onError={() => setErr(true)}
      className={`${cls} object-contain bg-white dark:bg-zinc-800 flex-shrink-0 p-0.5`}
    />
  )
}

export default function Home() {
  const [selectedCert, setSelectedCert] = useState(null)
  const [selectedBlog, setSelectedBlog] = useState(null)

  const latestPosts = blogs.slice(0, 3)

  return (
    <section id="home" className="pt-20 pb-10 bg-white dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-8 mb-16"
        >
          {/* Left */}
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
              Santosh Margale
            </h1>
            <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mb-6">
              Site Reliability Engineer · DevOps · AWS · Kubernetes
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mb-6">
              DevOps Engineer with 5+ years of experience optimizing software development lifecycles
              and infrastructure scalability. Skilled in CI/CD, container orchestration, AWS cloud,
              and SRE practices.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2">
              <a href="https://github.com/santosh311993" target="_blank" rel="noopener noreferrer"
                className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200" aria-label="GitHub">
                <Github size={19} />
              </a>
              <a href="https://linkedin.com/in/santosh-margale" target="_blank" rel="noopener noreferrer"
                className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin size={19} />
              </a>
              <a href="mailto:santoshmargale3103@gmail.com"
                className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200" aria-label="Email">
                <Mail size={19} />
              </a>
            </div>
          </div>

          {/* Right: photo */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-700">
              <img src="/my_profile_pic.jpeg" alt="Santosh Margale" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: Latest Posts */}
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-5">Latest Posts</h2>
            <div className="space-y-0 divide-y divide-zinc-100 dark:divide-zinc-800">
              {latestPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="group py-5 cursor-pointer"
                  onClick={() => setSelectedBlog(post)}
                >
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1.5 flex items-center gap-1.5">
                    <span className="w-px h-3 bg-teal-500 dark:bg-teal-400 inline-block rounded" />
                    {post.date}
                  </p>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-200 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-teal-500 dark:text-teal-400 font-medium group-hover:gap-2 transition-all duration-200">
                    Read article <ArrowRight size={12} />
                  </span>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Right: Work + Certificates sidebar */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0 space-y-4">

            {/* Work card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                <Briefcase size={14} className="text-zinc-400 dark:text-zinc-500" />
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Work</h2>
              </div>
              <div className="divide-y divide-zinc-50 dark:divide-zinc-800/60">
                {experiences.map((exp) => (
                  <a
                    key={exp.id}
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-150"
                  >
                    <CompanyLogo src={exp.logo} fallback={exp.logoFallback} size="sm" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{exp.company}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{exp.role}</p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{exp.period}</p>
                    </div>
                    <ExternalLink size={11} className="text-zinc-400 dark:text-zinc-500 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-150 flex-shrink-0 mt-0.5" />
                  </a>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
                <a
                  href="/Santosh_Margale_CV.pdf"
                  download="Santosh_Margale_CV.pdf"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
                >
                  <Download size={13} />
                  Download CV
                </a>
              </div>
            </motion.div>

            {/* Certificates card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                <Award size={14} className="text-zinc-400 dark:text-zinc-500" />
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Certificates & Achievements</h2>
              </div>
              <div className="divide-y divide-zinc-50 dark:divide-zinc-800/60">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className={`group flex items-center gap-3 px-4 py-3 ${cert.image ? 'cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50' : ''} transition-colors duration-150`}
                    onClick={() => cert.image && setSelectedCert(cert)}
                  >
                    {/* issuer logo */}
                    <CompanyLogo src={cert.logoSrc} fallback={cert.issuer.slice(0, 2).toUpperCase()} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${cert.image ? 'text-zinc-900 dark:text-zinc-100 hover:text-teal-500 dark:hover:text-teal-400' : 'text-zinc-700 dark:text-zinc-300'}`}>
                        {cert.title}
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">{cert.year}</p>
                      {cert.image && (
                        <ExternalLink size={11} className="text-zinc-400 dark:text-zinc-500 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-150" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Blog modal */}
      {selectedBlog && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedBlog(null)} />
            <motion.div
              className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 sm:p-8">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selectedBlog.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">{tag}</span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 pr-6">{selectedBlog.title}</h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-5 pb-4 border-b border-zinc-100 dark:border-zinc-800">{selectedBlog.date} · {selectedBlog.readTime}</p>
                <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {selectedBlog.content.split('\n\n').map((block, i) => {
                    if (block.startsWith('## ')) return <h3 key={i} className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-4">{block.replace('## ', '')}</h3>
                    if (block.startsWith('```')) {
                      const code = block.replace(/```[\w]*/g, '').trim()
                      return <pre key={i} className="bg-zinc-950 text-zinc-200 rounded-lg p-4 overflow-x-auto text-xs font-mono"><code>{code}</code></pre>
                    }
                    return <p key={i} dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-900 dark:text-zinc-100 font-medium">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs font-mono">$1</code>') }} />
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Certificate modal */}
      {selectedCert && <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />}
    </section>
  )
}
