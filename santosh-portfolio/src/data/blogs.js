export const blogs = [
  {
    id: 1,
    title: 'Canary Upgrades for EKS — Lessons from Production',
    slug: 'canary-upgrades-eks-production',
    date: 'February 2025',
    readTime: '8 min read',
    excerpt:
      'Upgrading EKS clusters in production without downtime is not magic — it is process. At 6Sense I built a canary upgrade framework with Ansible that handles node group lifecycle, health validation, and automatic rollback. Here is how it works and what I learned.',
    tags: ['Kubernetes', 'EKS', 'Ansible', 'SRE'],
    content: `
## Why EKS Upgrades Are Risky

Every EKS version upgrade touches three things: the control plane, the node groups, and the add-ons (CoreDNS, kube-proxy, VPC CNI). Get the order wrong, skip a validation step, or upgrade all nodes simultaneously, and you are looking at a partial outage.

The standard approach — upgrade everything at once during a maintenance window — works for small clusters. But at 6Sense, we run multi-cluster EKS environments serving production traffic 24/7. We needed something better.

## The Canary Upgrade Pattern

The core idea: **never upgrade all node groups at once**. Promote one node group, validate, then roll forward.

\`\`\`
Control Plane Upgrade (managed by AWS)
    ↓
Canary Node Group Upgrade (10% of capacity)
    ↓
Health Validation (pods, nodes, networking checks)
    ↓
Rollback if unhealthy | Roll forward if healthy
    ↓
Remaining Node Groups (in batches)
    ↓
Add-on Upgrades (CoreDNS, kube-proxy, AWS LBC)
\`\`\`

## Building It with Ansible

I chose Ansible for this because it is idempotent, human-readable, and already in our toolchain. The upgrade playbook has five phases:

**Phase 1: Pre-flight checks**
\`\`\`yaml
- name: Validate cluster health before upgrade
  kubernetes.core.k8s_info:
    kind: Node
  register: node_info

- name: Assert all nodes are Ready
  assert:
    that: "{{ node_info.resources | selectattr('status.conditions', 'defined') | ... }}"
    fail_msg: "Cluster has unhealthy nodes — aborting upgrade"
\`\`\`

**Phase 2: Control plane upgrade** — triggered via AWS CLI, then wait for ACTIVE status.

**Phase 3: Canary node group** — launch a new node group at the target version, cordon and drain the old canary nodes, wait for workloads to reschedule.

**Phase 4: Health validation loop**
\`\`\`yaml
- name: Wait for all pods to be Running
  kubernetes.core.k8s_info:
    kind: Pod
    namespace: "{{ item }}"
  retries: 20
  delay: 30
  until: >
    pods.resources | selectattr('status.phase', 'ne', 'Running') | list | length == 0
\`\`\`

**Phase 5: Roll forward or rollback** — if validation fails after 10 retries, the playbook tears down the canary node group and re-adds the old nodes. Zero manual intervention needed.

## Key Lessons

**Lesson 1: Upgrade add-ons last.** CoreDNS and kube-proxy have version compatibility matrices with the control plane. Upgrade them before nodes and you can break DNS resolution mid-upgrade.

**Lesson 2: PodDisruptionBudgets are not optional.** Without PDBs on critical services, draining a node can take a healthy pod below its minimum replicas. We enforce PDBs as part of the upgrade pre-flight check.

**Lesson 3: Calico requires special handling.** Calico CNI has its own upgrade path separate from the AWS-managed add-ons. We pin Calico versions per EKS minor version and upgrade it as a separate step.

**Lesson 4: Test the rollback path.** We intentionally trigger rollbacks in staging once a quarter. If your rollback has never run, it will fail when you need it most.

## The Result

Before this framework, EKS upgrades required a 4-hour maintenance window and 2 engineers. Now they run unattended during business hours with no user-visible impact. Upgrade time went from 4 hours to 90 minutes for a 10-node-group cluster.
    `.trim(),
  },
  {
    id: 2,
    title: 'Graviton Migration: From x86 to ARM64 at Scale',
    slug: 'graviton-migration-x86-arm64-scale',
    date: 'October 2024',
    readTime: '7 min read',
    excerpt:
      'At Paytm, I led the migration of Kubernetes workloads from x86 to AWS Graviton (ARM64) processors. We hit 92% adoption and 40% cost reduction. Here is the practical playbook: what works, what breaks, and how to validate before you cut over.',
    tags: ['AWS', 'Cost Optimisation', 'Kubernetes', 'Graviton'],
    content: `
## Why Graviton?

AWS Graviton3 instances offer up to 40% better price-performance than equivalent x86 instances. For Kubernetes workloads that are CPU-bound and stateless, this is essentially free money — but the migration is not trivial.

At Paytm, our Kubernetes clusters ran hundreds of microservices across dozens of node groups. The goal was to move as many workloads as possible to Graviton without service disruption.

## What "ARM64 Compatible" Actually Means

Most people assume ARM64 compatibility is a binary yes/no. It is not. There are four layers to check:

1. **Container images** — must be built for linux/arm64 or linux/amd64,arm64 (multi-arch)
2. **Language runtimes** — JVM, Node.js, Python are fine. Native extensions (C FFI, Rust bindings) need recompilation
3. **Third-party dependencies** — npm/pip/maven packages with native code need ARM64 builds
4. **Infrastructure tooling** — monitoring agents, log shippers, sidecar containers must all have ARM64 images

## The Migration Playbook

**Step 1: Inventory and classify workloads**

We built a spreadsheet mapping every deployment to its image source, language runtime, and known native dependencies. Red/amber/green classification:
- Green: pure JVM/Node.js/Python, public image with multi-arch support → migrate directly
- Amber: custom base images or native deps → rebuild and test first
- Red: legacy C extensions or x86-only vendor images → skip for now

**Step 2: Add ARM64 node groups (do not remove x86 yet)**

\`\`\`yaml
# eksctl node group config
nodeGroups:
  - name: graviton-general
    instanceType: m7g.2xlarge   # Graviton3
    amiFamily: AmazonLinux2
    labels:
      kubernetes.io/arch: arm64
    taints:
      - key: arch
        value: arm64
        effect: NoSchedule
\`\`\`

The taint means nothing lands on Graviton nodes until you explicitly tolerate it. This lets you migrate workload by workload.

**Step 3: Rebuild multi-arch images**

\`\`\`dockerfile
# In your Jenkins pipeline
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag myregistry/myapp:latest \
  --push .
\`\`\`

**Step 4: Add tolerations and nodeSelectors to workloads**

\`\`\`yaml
spec:
  tolerations:
    - key: arch
      value: arm64
      effect: NoSchedule
  affinity:
    nodeAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 80
          preference:
            matchExpressions:
              - key: kubernetes.io/arch
                operator: In
                values: [arm64]
\`\`\`

Using \`preferred\` instead of \`required\` means the pod falls back to x86 if no ARM64 node is available — safer during the transition.

**Step 5: Validate in staging, promote to production**

We ran each migrated workload on Graviton in staging for 48 hours, watching error rates, latency P99, and memory usage. ARM64 can have different memory characteristics for some workloads.

## What We Found

**Java services**: Smooth. OpenJDK 17+ is excellent on ARM64. JVM startup time actually improved.

**Node.js services**: Smooth for pure JS. Two services had native npm packages (bcrypt, sharp) that needed ARM64-compatible versions.

**Go services**: Fastest migration. Go cross-compiles to ARM64 trivially — just set GOARCH=arm64 in your build.

**Python services**: Fine for pure Python. Two ML services using TensorFlow needed the ARM64-specific TF build.

## The Numbers

After 6 months: 92% of Kubernetes workloads running on Graviton. 40% reduction in EC2 costs for those workloads. Total annual saving: significant enough to fund two additional engineering hires.

The 8% remaining on x86 is mostly third-party vendor software with no ARM64 support. We keep x86 node groups for them but have stopped growing them.
    `.trim(),
  },
  {
    id: 3,
    title: 'GitOps with ArgoCD — AutoSync in Practice',
    slug: 'gitops-argocd-autosync-practice',
    date: 'June 2024',
    readTime: '6 min read',
    excerpt:
      'ArgoCD AutoSync turns your Git repository into the single source of truth for Kubernetes deployments. At Paytm I moved 50+ services from Jenkins push-based deployments to ArgoCD pull-based GitOps. Here is the practical setup, gotchas, and how we handle rollbacks.',
    tags: ['ArgoCD', 'GitOps', 'CI/CD', 'Kubernetes'],
    content: `
## Push vs Pull: Why It Matters

Traditional CI/CD (Jenkins, GitHub Actions) pushes deployments to Kubernetes — the pipeline has cluster credentials and runs kubectl apply. This works but has two problems: credential sprawl across CI systems, and no persistent reconciliation (drift goes undetected).

ArgoCD flips this. The cluster pulls its desired state from Git. ArgoCD continuously compares what is in Git against what is running in the cluster, and reconciles any difference.

## Setting Up ArgoCD at Paytm

We installed ArgoCD into a dedicated ops cluster, then used App of Apps pattern to manage applications across 3 Kubernetes clusters (dev, staging, prod).

**App of Apps structure:**
\`\`\`
gitops-repo/
├── apps/
│   ├── root-app.yaml          # The parent Application
│   ├── payment-service.yaml
│   ├── notification-service.yaml
│   └── api-gateway.yaml
└── manifests/
    ├── payment-service/
    │   ├── deployment.yaml
    │   ├── service.yaml
    │   └── hpa.yaml
    └── ...
\`\`\`

The root application watches \`apps/\` and creates child Applications for each service. Adding a new service is as simple as adding a YAML file to \`apps/\`.

## AutoSync Configuration

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: payment-service
  namespace: argocd
spec:
  project: production
  source:
    repoURL: https://github.com/paytm/gitops-repo
    targetRevision: main
    path: manifests/payment-service
  destination:
    server: https://kubernetes.default.svc
    namespace: payments
  syncPolicy:
    automated:
      prune: true          # Remove resources deleted from Git
      selfHeal: true       # Re-apply if someone manually edits the cluster
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
      - RespectIgnoreDifferences=true
\`\`\`

**prune: true** means if you delete a resource from Git, ArgoCD removes it from the cluster. **selfHeal: true** means if someone does a manual \`kubectl edit\`, ArgoCD immediately reverts it. This enforces Git as the single source of truth.

## Handling Rollbacks

Rollback in GitOps is a Git operation. If a bad deployment goes out:

\`\`\`bash
# Option 1: Revert the commit
git revert HEAD~1
git push origin main
# ArgoCD detects the change and re-syncs automatically

# Option 2: ArgoCD UI rollback to a previous sync
# In the ArgoCD UI: select the application → History → rollback to SHA
\`\`\`

We prefer option 1 (Git revert) because it creates an audit trail. ArgoCD UI rollback is useful for emergencies but leaves no Git history.

## Integration with Jenkins

We did not replace Jenkins — we changed its role. Jenkins still handles CI (build, test, push image). But instead of running kubectl apply, it now commits the new image tag to the gitops-repo:

\`\`\`bash
# In Jenkinsfile — after image push
git clone https://github.com/paytm/gitops-repo
sed -i "s|image: payment-service:.*|image: payment-service:\${BUILD_TAG}|" \
  manifests/payment-service/deployment.yaml
git commit -am "ci: bump payment-service to \${BUILD_TAG}"
git push origin main
\`\`\`

ArgoCD picks up the commit and deploys within 3 minutes (our default sync interval). Jenkins is now just a code factory; the cluster manages its own state.

## Lessons Learned

- **Start with selfHeal: false** in non-prod environments where developers often make manual fixes. Enable it once you are confident in your manifests.
- **RBAC in ArgoCD is non-trivial** — spend time on this. Project-scoped apps with team-specific RBAC prevents accidental cross-team deployments.
- **Image updater is worth the setup** — ArgoCD Image Updater automatically commits new image tags to Git when a new image is pushed to ECR, removing the Jenkins sed step.
    `.trim(),
  },
  {
    id: 4,
    title: 'Building Observability with Prometheus, Grafana & Loki',
    slug: 'observability-prometheus-grafana-loki',
    date: 'January 2025',
    readTime: '9 min read',
    excerpt:
      'Deploying Prometheus, Grafana, and Loki as a unified observability stack for Kubernetes — covering metrics, logs, and dashboards. At 6Sense I automated this entire stack as code. Here is the architecture, the Helm values that matter, and the dashboards we actually use.',
    tags: ['Prometheus', 'Grafana', 'Loki', 'Monitoring', 'Kubernetes'],
    content: `
## The Three Pillars We Use

At 6Sense, our observability stack covers two of the three pillars:
- **Metrics**: Prometheus + Grafana
- **Logs**: Loki + Promtail + Fluent Bit
- **Traces**: Datadog APM (separate stack)

Everything is deployed into dedicated \`monitoring\` and \`logging\` namespaces on EKS, managed via Helm.

## Prometheus: What to Scrape and What to Ignore

The biggest mistake I see with Prometheus is scraping everything at high frequency and ending up with a cardinality explosion that tanks performance.

Our scrape config philosophy:
- **Infrastructure metrics** (node-exporter, kube-state-metrics): 30s interval
- **Application metrics**: 15s interval for critical paths, 60s for background jobs
- **Cardinality budget**: Alert if any single metric family exceeds 100k time series

\`\`\`yaml
# values.yaml for kube-prometheus-stack
prometheus:
  prometheusSpec:
    retention: 15d
    retentionSize: "50GB"
    scrapeInterval: 30s
    evaluationInterval: 30s
    resources:
      requests:
        memory: 4Gi
        cpu: 500m
      limits:
        memory: 8Gi
    storageSpec:
      volumeClaimTemplate:
        spec:
          storageClassName: gp3
          resources:
            requests:
              storage: 100Gi
\`\`\`

## Loki: Log Aggregation Without the Cost

Loki's key differentiator is that it indexes only labels, not log content. This makes it dramatically cheaper than Elasticsearch for log storage at scale.

**Promtail** collects logs from Kubernetes pods via the node's log directory and ships to Loki. For custom log pipelines and multi-line parsing, we use **Fluent Bit** as the aggregator before Promtail.

\`\`\`yaml
# Loki deployment (simple-scalable mode for production)
loki:
  auth_enabled: false
  commonConfig:
    replication_factor: 1
  storage:
    type: s3
    s3:
      bucketnames: our-loki-chunks
      region: us-east-1
  schema_config:
    configs:
      - from: 2024-01-01
        store: tsdb
        object_store: s3
        schema: v12
        index:
          prefix: loki_index_
          period: 24h
\`\`\`

Storing chunks in S3 is the key cost optimisation — you only pay for S3 storage, not EBS volumes.

## Grafana Dashboards We Actually Use

We have 40+ dashboards but 5 are open all the time:

1. **Cluster Overview** — node CPU/memory, pod count, PVC usage. First stop during any incident.
2. **Application SLO Dashboard** — request rate, error rate, P99 latency per service. Based on the RED method.
3. **EKS Node Group Dashboard** — per-node-group utilisation, helpful during upgrades.
4. **Loki Log Explorer** — live log tailing with label-based filtering. Replaces \`kubectl logs\` for multi-pod services.
5. **Cost Dashboard** — custom dashboard using node-exporter data + instance pricing to estimate per-namespace compute cost.

## The Alert That Saves Us Every Quarter

\`\`\`yaml
- alert: PodCrashLooping
  expr: rate(kube_pod_container_status_restarts_total[5m]) > 0
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Pod {{ $labels.pod }} is crash looping"
    description: "Container {{ $labels.container }} in {{ $labels.namespace }} has restarted {{ $value }} times in 5 minutes"
\`\`\`

Simple, but this alert has caught bad deployments, OOM kills, and misconfigured readiness probes before they impacted users.

## Lessons from Running This in Production

**Scale Prometheus with recording rules** — pre-compute expensive PromQL queries as recording rules. Our dashboard load time went from 8 seconds to under 1 second after moving complex aggregations to recording rules.

**Loki label discipline** — only use low-cardinality values as labels (namespace, app, level). Never use request IDs or user IDs as Loki labels — that is what log content is for.

**Grafana Alerting vs AlertManager** — we use AlertManager for Prometheus alerts (routed to PagerDuty) and Grafana Alerting for Loki-based alerts (routed to Slack). Keep them separate to avoid routing confusion.
    `.trim(),
  },
  {
    id: 5,
    title: 'HashiCorp Vault: Secrets Management Patterns on AWS',
    slug: 'hashicorp-vault-secrets-aws',
    date: 'September 2023',
    readTime: '7 min read',
    excerpt:
      'Hardcoded secrets in environment variables are a security incident waiting to happen. At MPL, I deployed HashiCorp Vault across AWS and on-prem environments to centralise secrets management. Here is the architecture, auth methods, and Kubernetes integration patterns.',
    tags: ['Vault', 'AWS', 'Security', 'Kubernetes'],
    content: `
## Why You Need a Secrets Manager

The most common secrets anti-pattern I see: database passwords and API keys stored as Kubernetes Secrets, base64-encoded (not encrypted), committed to Git "by mistake" at some point, rotated never.

HashiCorp Vault solves this by:
- Centralising all secrets in one audited store
- Generating dynamic, short-lived credentials (database passwords that expire in 1 hour)
- Providing a full audit log of who accessed what and when
- Integrating natively with Kubernetes via the Vault Agent Injector

## Vault Architecture at MPL

We ran a 3-node Vault cluster in HA mode, backed by AWS DynamoDB for storage and AWS KMS for auto-unseal.

\`\`\`
┌─────────────────────────────────────────┐
│            AWS Vault Cluster            │
│  ┌──────────┐  ┌──────────┐  ┌───────┐ │
│  │ Vault-1  │  │ Vault-2  │  │Vault-3│ │
│  │ (active) │  │(standby) │  │(stby) │ │
│  └──────────┘  └──────────┘  └───────┘ │
│              ↓ DynamoDB HA              │
│              ↓ KMS Auto-Unseal         │
└─────────────────────────────────────────┘
             ↓
    ┌─────────────────┐
    │   EKS Clusters  │
    │  (Vault Agent   │
    │   Injector)     │
    └─────────────────┘
\`\`\`

**AWS KMS auto-unseal** is critical for production. Without it, every Vault restart requires manual unseal — which is a 3am problem during an incident.

## Auth Methods We Use

**Kubernetes Auth** — the primary method for applications running in EKS:

\`\`\`bash
vault auth enable kubernetes

vault write auth/kubernetes/config \
  kubernetes_host="https://\${KUBERNETES_PORT_443_TCP_ADDR}:443" \
  token_reviewer_jwt="\$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
  kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
\`\`\`

Each service gets a Vault role tied to its Kubernetes ServiceAccount:

\`\`\`bash
vault write auth/kubernetes/role/payment-service \
  bound_service_account_names=payment-service \
  bound_service_account_namespaces=payments \
  policies=payment-service-policy \
  ttl=1h
\`\`\`

**AWS IAM Auth** — for EC2 instances and Lambda functions outside Kubernetes.

## Vault Agent Injector: Secrets Without SDK Changes

The Vault Agent Injector is a Kubernetes mutating webhook that injects a Vault Agent sidecar into your pod. The agent authenticates to Vault and writes secrets to a shared in-memory volume — your app reads them as files, no Vault SDK needed.

\`\`\`yaml
# Annotations on your Deployment
annotations:
  vault.hashicorp.com/agent-inject: "true"
  vault.hashicorp.com/role: "payment-service"
  vault.hashicorp.com/agent-inject-secret-db-creds: "database/creds/payment-db"
  vault.hashicorp.com/agent-inject-template-db-creds: |
    {{- with secret "database/creds/payment-db" -}}
    DATABASE_URL=postgres://{{ .Data.username }}:{{ .Data.password }}@db-host:5432/payments
    {{- end }}
\`\`\`

The secret is written to \`/vault/secrets/db-creds\` and the application reads it at startup. When the lease expires, the agent automatically renews it and writes the new credentials — zero restart required.

## Dynamic Database Credentials

This is the most powerful Vault feature and the most underused. Instead of a static password that lives forever, Vault creates a temporary database user for each application instance:

\`\`\`bash
vault secrets enable database

vault write database/config/payment-db \
  plugin_name=postgresql-database-plugin \
  connection_url="postgresql://{{username}}:{{password}}@db-host:5432/payments" \
  allowed_roles="payment-db-role" \
  username="vault-admin" \
  password="vault-admin-password"

vault write database/roles/payment-db-role \
  db_name=payment-db \
  creation_statements="CREATE ROLE \"{{name}}\" ... VALID UNTIL '{{expiration}}';" \
  default_ttl="1h" \
  max_ttl="24h"
\`\`\`

Each pod gets a unique database user that expires in 1 hour. If credentials leak, they are useless within the hour. If a pod is killed, its user is gone at TTL expiry.

## Lessons Learned

**Start with KV secrets, migrate to dynamic.** Do not try to implement dynamic secrets on day one. Get applications using Vault for static secrets first, then migrate to dynamic creds service by service.

**Audit log everything.** Vault's audit log is your compliance evidence. Ship it to your SIEM from day one, not after the security review.

**Vault is stateful infrastructure.** Treat it like your database — backups, DR plan, runbooks for unseal failures. A Vault outage is an application outage.
    `.trim(),
  },
  {
    id: 6,
    title: 'Unified SSO with Keycloak: Integrating AWS, Jenkins & JIRA',
    slug: 'keycloak-sso-aws-jenkins-jira',
    date: 'April 2024',
    readTime: '6 min read',
    excerpt:
      'Managing separate credentials for AWS console, Jenkins, and JIRA is an operational and security nightmare. At Paytm I implemented Keycloak as a central identity provider with SAML SSO across all three. Here is the practical setup — clients, mappers, and the AWS federation piece.',
    tags: ['Keycloak', 'SAML', 'IAM', 'SSO'],
    content: `
## The Problem: Credential Sprawl

Before Keycloak, engineers at Paytm managed:
- AWS IAM users with access keys (rotated manually, or never)
- Jenkins local accounts (different passwords for everyone)
- JIRA Atlassian accounts (some connected to Google, some not)

Security audit time was a nightmare. Off-boarding took 45 minutes per person across systems. Password resets required contacting three different teams.

Keycloak solved this with a single identity provider — one account, one password, federated everywhere.

## Keycloak Architecture

We deployed Keycloak on AWS ECS (Fargate) backed by RDS Aurora (PostgreSQL). High availability via two Keycloak instances behind an ALB.

\`\`\`
Users → Keycloak IdP
           ↓ SAML 2.0 / OIDC
    ┌──────┬──────────┬────────┐
    │  AWS │ Jenkins  │  JIRA  │
    │ SSO  │  SAML    │  SAML  │
    └──────┴──────────┴────────┘
\`\`\`

User directory: synced from our corporate LDAP/Active Directory via Keycloak's built-in LDAP federation. Add someone to AD → they can log in to everything within 15 minutes.

## AWS SSO Integration

AWS IAM Identity Center (formerly AWS SSO) supports external SAML IdPs. Keycloak acts as the SAML IdP:

1. In Keycloak: create a Client for AWS SSO, set the ACS URL and Entity ID from AWS
2. Configure SAML mappers to send the required attributes:
   - \`https://aws.amazon.com/SAML/Attributes/Role\` → the IAM Role ARN + IdP ARN
   - \`https://aws.amazon.com/SAML/Attributes/RoleSessionName\` → username

\`\`\`
# Keycloak SAML mapper for AWS role attribute
Mapper Type: Role List
Role attribute name: https://aws.amazon.com/SAML/Attributes/Role
Friendly name: AWS Roles
Single Role Attribute: false
\`\`\`

3. In AWS: configure the SAML provider and create IAM roles with SAML trust policies
4. In Keycloak: assign Keycloak roles that map to AWS IAM roles (e.g., \`aws-developer-role\` in Keycloak → \`arn:aws:iam::ACCOUNT:role/Developer\` in AWS)

Result: engineers log in to the AWS console via Keycloak. No IAM users, no access keys, just SAML federation.

## Jenkins SAML Plugin

The Jenkins SAML plugin handles SP-initiated SSO:

1. Install SAML Plugin in Jenkins
2. Configure with Keycloak's SAML metadata URL
3. Map SAML attributes to Jenkins roles:

\`\`\`
# In Jenkins SAML config
IdP Metadata URL: https://keycloak.company.com/realms/main/protocol/saml/descriptor
Display Name Attribute: displayName
Groups Attribute: memberOf
Username Attribute: uid
Email Attribute: email

# Role Strategy Plugin mapping:
memberOf=jenkins-admin → admin
memberOf=jenkins-developer → developer
\`\`\`

Key detail: use **SP-initiated SSO** so users can go directly to Jenkins → get redirected to Keycloak → come back authenticated. The alternative (IdP-initiated) is harder to use day-to-day.

## JIRA SAML Integration

Atlassian JIRA Cloud and Data Center both support SAML SSO. For JIRA Data Center (our setup):

1. In JIRA: Security → SAML SSO → Add configuration
2. Set Keycloak as the IdP using the metadata URL
3. Map the SAML NameID to the JIRA username (we use email)
4. Enable "Just-In-Time" user provisioning — first login creates the JIRA account automatically

The JIT provisioning is the key operational win. New hires get JIRA access on their first login — no manual account creation.

## Off-boarding: From 45 Minutes to 2 Minutes

The operational payoff:
- Disable the user in Active Directory
- LDAP sync propagates to Keycloak within 15 minutes
- All SAML sessions expire at next token refresh (configurable, we use 1 hour)
- User loses access to AWS, Jenkins, and JIRA automatically

That 45-minute manual off-boarding process became a 2-minute AD operation.

## Lessons Learned

**Plan your realm structure carefully.** We use one realm per environment (dev, staging, prod). Sharing a realm across environments causes headaches when you want different SSO policies per environment.

**Set appropriate session timeouts.** SAML sessions outlive what users expect. We set max session lifetime to 8 hours for production AWS access — long enough for a work day, short enough to enforce re-auth.

**Monitor Keycloak like production infrastructure.** Keycloak outage = nobody can log in to anything. We have PagerDuty alerts on Keycloak health endpoints and a runbook for emergency IAM user creation.
    `.trim(),
  },
]
