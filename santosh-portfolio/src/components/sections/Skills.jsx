import { motion } from 'framer-motion'
import {
  SiAmazonwebservices,
  SiAmazonec2,
  SiAmazons3,
  SiAmazonroute53,
  SiAmazonrds,
  SiAmazoncloudwatch,
  SiKubernetes,
  SiDocker,
  SiIstio,
  SiJenkins,
  SiArgo,
  SiAnsible,
  SiTerraform,
  SiHelm,
  SiPrometheus,
  SiGrafana,
  SiDatadog,
  SiElasticsearch,
  SiVault,
  SiPagerduty,
  SiSlack,
  SiGit,
  SiBitbucket,
  SiJira,
  SiLinux,
} from 'react-icons/si'
import { skillGroups } from '../../data/skills'

const SKILL_ICONS = {
  // Cloud Platforms
  'AWS EC2':        { icon: SiAmazonec2,         color: '#FF9900' },
  'VPC':            { icon: SiAmazonwebservices,  color: '#FF9900', abbr: 'VPC' },
  'S3':             { icon: SiAmazons3,           color: '#FF9900' },
  'ELB':            { icon: SiAmazonwebservices,  color: '#FF9900', abbr: 'ELB' },
  'Route 53':       { icon: SiAmazonroute53,      color: '#FF9900' },
  'RDS':            { icon: SiAmazonrds,          color: '#FF9900' },
  'CloudFront':     { icon: SiAmazonwebservices,  color: '#FF9900', abbr: 'CF' },
  'IAM':            { icon: SiAmazonwebservices,  color: '#FF9900', abbr: 'IAM' },
  'CloudWatch':     { icon: SiAmazoncloudwatch,   color: '#FF9900' },
  // Container & Orchestration
  'Kubernetes (EKS)': { icon: SiKubernetes,       color: '#326CE5' },
  'Docker':           { icon: SiDocker,           color: '#2496ED' },
  'Calico CNI':       { abbr: 'CAL' },
  'Istio':            { icon: SiIstio,            color: '#466BB0' },
  'CoreDNS':          { abbr: 'DNS' },
  'AWS Load Balancer Controller': { icon: SiAmazonwebservices, color: '#FF9900', abbr: 'LBC' },
  // CI/CD & Automation
  'Jenkins':          { icon: SiJenkins,          color: '#D24939' },
  'ArgoCD':           { icon: SiArgo,             color: '#EF7B4D' },
  'Harness':          { abbr: 'HAR' },
  'BitBucket Pipelines': { icon: SiBitbucket,     color: '#0052CC' },
  'Ansible':          { icon: SiAnsible,          color: '#EE0000' },
  'Bash':             { abbr: 'SH' },
  // Infrastructure as Code
  'Terraform':        { icon: SiTerraform,        color: '#7B42BC' },
  'Helm':             { icon: SiHelm,             color: null },
  // Monitoring & Observability
  'Prometheus':       { icon: SiPrometheus,       color: '#E6522C' },
  'Grafana':          { icon: SiGrafana,          color: '#F46800' },
  'Loki':             { abbr: 'LOK' },
  'Datadog':          { icon: SiDatadog,          color: '#632CA6' },
  'Fluent Bit':       { abbr: 'FB' },
  'Promtail':         { abbr: 'PT' },
  'Kibana':           { icon: SiElasticsearch,    color: '#005571', abbr: 'KIB' },
  // Security & Access
  'HashiCorp Vault':  { icon: SiVault,            color: '#FFCF25' },
  'Keycloak':         { abbr: 'KC' },
  'Palo Alto Prisma Cloud': { abbr: 'PA' },
  'AWS IAM':          { icon: SiAmazonwebservices, color: '#FF9900', abbr: 'IAM' },
  'SAML SSO':         { abbr: 'SSO' },
  // Incident Management
  'PagerDuty':        { icon: SiPagerduty,        color: '#06AC38' },
  'Slack':            { icon: SiSlack,            color: '#4A154B' },
  // Tools & Practices
  'Git':              { icon: SiGit,              color: '#F05032' },
  'BitBucket':        { icon: SiBitbucket,        color: '#0052CC' },
  'JIRA':             { icon: SiJira,             color: '#0052CC' },
  'Linux':            { icon: SiLinux,            color: null },
  'SRE Practices':    { abbr: 'SRE' },
  'GitOps':           { abbr: 'GO' },
}

function SkillTile({ name }) {
  const def = SKILL_ICONS[name]
  const Icon = def?.icon
  const abbr = def?.abbr || name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()

  return (
    <div className="flex flex-col items-center justify-start gap-2 w-[72px] py-3 px-1.5 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all duration-200 cursor-default group">
      <div className="w-7 h-7 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
        {def?.imgSrc ? (
          <img src={def.imgSrc} alt={name} className="w-6 h-6 object-contain" />
        ) : Icon ? (
          def.color
            ? <Icon size={26} color={def.color} />
            : <Icon size={26} />
        ) : (
          <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center">
            <span className="text-[9px] font-bold text-teal-600 dark:text-teal-400">{abbr}</span>
          </div>
        )}
      </div>
      <span className="text-[9px] text-zinc-500 dark:text-zinc-400 text-center leading-tight w-full line-clamp-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
        {name}
      </span>
    </div>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-16 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Skills</h2>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">5+ years across cloud infrastructure, container orchestration, CI/CD automation, and SRE practices.</p>
        </motion.div>

        <div className="space-y-10">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest whitespace-nowrap">
                  {group.category}
                </p>
                <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <SkillTile key={skill} name={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
