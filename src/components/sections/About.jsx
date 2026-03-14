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
            I&apos;m a{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">DevOps & Site Reliability Engineer</span>{' '}
            with 5+ years of hands-on experience optimizing software development lifecycles and enhancing
            infrastructure scalability across high-traffic production environments.
          </p>
          <p>
            My core expertise includes{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">CI/CD pipeline design</span>,{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">container orchestration</span>, and{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">workflow automation</span>. I am
            proficient in AWS, Terraform, and Ansible for cloud infrastructure management, with deep expertise
            in Docker and Kubernetes for scalable microservices deployment.
          </p>
          <p>
            I have a proven track record in{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">cost reduction</span>,{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">zero-downtime deployments</span>, and
            cross-functional team leadership — including leading a Graviton migration at Paytm that achieved
            92% workload adoption and a{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">40% reduction in infrastructure costs</span>.
          </p>
          <p>
            I&apos;m experienced with the full observability stack —{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">
              Datadog, Prometheus, Grafana, Loki, and Fluent Bit
            </span>{' '}
            — and incident management using PagerDuty. I also mentor junior engineers and lead knowledge
            transfer sessions to accelerate team ramp-up.
          </p>
          <p>
            I hold an{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">
              AWS Certified Solutions Architect – Associate
            </span>{' '}
            certification and a B.E. in Computer Engineering from Pune Institute of Computer Technology.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
