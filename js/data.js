// ============================================================
// OneSystem MVP — Mock Data Store
// ============================================================

const MOCK = {

  // ── Screen A: Dashboard ────────────────────────────────────
  orgHealth: {
    efficiency:       { value: 92, label: "Overall Efficiency",       unit: "%", color: "var(--emerald)" },
    anomalies:        { value: 2,  label: "Active Anomalies",         unit: "",  color: "var(--amber)"   },
    automationRate:   { value: 78, label: "Workflow Automation Rate",  unit: "%", color: "var(--cyan)"    },
  },

  aiFeed: [
    {
      id: "ai-1",
      icon: "🚨",
      type: "risk",
      title: "Risk Detected",
      body: "Q3 European Sales are trending <strong>14% below target</strong>. Correlation found: Supply chain delays in Logistics Dept affecting product availability.",
      action: "View Graph",
      time: "12 min ago",
    },
    {
      id: "ai-2",
      icon: "💡",
      type: "optimization",
      title: "Optimization Opportunity",
      body: "Reallocating <strong>3 engineers</strong> from <em>Project Alpha</em> to <em>Project Beta</em> will prevent a projected <strong>2-week launch delay</strong>.",
      action: "Apply Recommendation",
      time: "34 min ago",
    },
    {
      id: "ai-3",
      icon: "📊",
      type: "insight",
      title: "Trend Insight",
      body: "Engineering team velocity increased <strong>18%</strong> after adopting the new CI/CD pipeline last sprint. Recommend rolling out to remaining 4 teams.",
      action: "View Analysis",
      time: "1 hr ago",
    },
    {
      id: "ai-4",
      icon: "⚠️",
      type: "risk",
      title: "Compliance Alert",
      body: "GDPR data retention policy for <em>Customer Analytics DB</em> expires in <strong>14 days</strong>. 3 datasets require review before auto-archival.",
      action: "Review Datasets",
      time: "2 hr ago",
    },
  ],

  activityStream: [
    {
      group: "Employee Onboarding — Sarah Jenkins",
      automated: true,
      events: [
        { dept: "HR",       icon: "👤", text: "Sarah Jenkins onboarded (Role: Senior Dev)",              time: "09:14 AM", status: "completed" },
        { dept: "IT",       icon: "💻", text: "Provisioned MacBook Pro for Sarah Jenkins",               time: "09:16 AM", status: "completed" },
        { dept: "Security", icon: "🔐", text: "Granted Sarah Jenkins access to GitHub Repo 'Core-Backend'", time: "09:17 AM", status: "completed" },
        { dept: "Ops",      icon: "📧", text: "Welcome email & Slack channels configured",              time: "09:18 AM", status: "completed" },
      ],
    },
    {
      group: "Infrastructure Alert — US-East Region",
      automated: false,
      events: [
        { dept: "IT",       icon: "🖥️", text: "CPU spike detected on prod-server-12 (92% utilization)", time: "10:44 AM", status: "warning" },
        { dept: "Ops",      icon: "🔄", text: "Auto-scaling triggered: 2 additional instances launched",  time: "10:45 AM", status: "completed" },
        { dept: "Finance",  icon: "💰", text: "Estimated cost impact: +$320/day until scale-down",       time: "10:46 AM", status: "info" },
      ],
    },
  ],

  // Charts data
  departmentBudget: {
    labels: ["Engineering", "Marketing", "Sales", "Operations", "HR", "Legal"],
    allocated: [4200000, 1800000, 2100000, 1500000, 900000, 600000],
    spent:     [3800000, 1650000, 1900000, 1350000, 780000, 520000],
  },

  weeklyEfficiency: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [88, 91, 89, 93, 95, 72, 68],
  },

  // ── Screen B: Organizational Graph ─────────────────────────
  orgGraph: {
    nodes: [
      { id: "phoenix",    label: "Project Phoenix",       type: "project",     x: 0,   y: 0   },
      { id: "mktg",       label: "Marketing Team",        type: "department",  x: -180, y: -120 },
      { id: "eng",        label: "Engineering Team",      type: "department",  x: 180, y: -100 },
      { id: "budget",     label: "$1.2M Budget",          type: "finance",     x: -160, y: 140  },
      { id: "aws",        label: "AWS Cluster A",         type: "infrastructure", x: 200, y: 120 },
      { id: "privacy",    label: "Data Privacy Policy v2",type: "governance",  x: 0,   y: 200  },
      { id: "delta",      label: "Project Delta",         type: "project",     x: -320, y: 0   },
      { id: "sales",      label: "Sales Team",            type: "department",  x: 340, y: 0   },
      { id: "hr",         label: "HR Department",         type: "department",  x: -320, y: 180 },
      { id: "compliance", label: "SOC2 Compliance",       type: "governance",  x: 340, y: 180  },
      { id: "gcp",        label: "GCP Cluster B",         type: "infrastructure", x: -100, y: -220 },
      { id: "beta",       label: "Project Beta",          type: "project",     x: 200, y: -220 },
    ],
    edges: [
      { source: "phoenix", target: "mktg" },
      { source: "phoenix", target: "eng" },
      { source: "phoenix", target: "budget" },
      { source: "phoenix", target: "aws" },
      { source: "phoenix", target: "privacy" },
      { source: "delta",   target: "mktg" },
      { source: "delta",   target: "hr" },
      { source: "delta",   target: "budget" },
      { source: "sales",   target: "phoenix" },
      { source: "eng",     target: "beta" },
      { source: "beta",    target: "gcp" },
      { source: "beta",    target: "aws" },
      { source: "sales",   target: "compliance" },
      { source: "aws",     target: "compliance" },
    ],
    details: {
      phoenix: {
        title: "Project Phoenix",
        description: "Next-gen enterprise platform rebuild — cross-departmental initiative targeting Q4 launch.",
        people: [
          { name: "Marcus Chen",   role: "Project Lead",     dept: "Engineering" },
          { name: "Priya Sharma",  role: "UX Director",      dept: "Design" },
          { name: "James Wilson",  role: "Campaign Manager", dept: "Marketing" },
          { name: "Elena Rodriguez", role: "Data Analyst",   dept: "Analytics" },
        ],
        budget: { allocated: 1200000, spent: 870000, forecast: 1150000 },
        policies: ["Data Privacy Policy v2", "SOC2 Compliance Framework", "IP Protection Agreement"],
        assets: ["AWS Cluster A (us-east-1)", "Jenkins CI Pipeline #7", "Figma Enterprise License"],
      },
      delta: {
        title: "Project Delta",
        description: "Internal tooling modernization — migrating legacy HR and Marketing systems.",
        people: [
          { name: "Sarah Jenkins", role: "Senior Developer", dept: "Engineering" },
          { name: "Tom Baker",     role: "HR Systems Lead",  dept: "HR" },
          { name: "Lisa Park",     role: "Content Strategist", dept: "Marketing" },
        ],
        budget: { allocated: 650000, spent: 410000, forecast: 620000 },
        policies: ["Employee Data Handling Policy", "Vendor Access Policy v3"],
        assets: ["GCP Cluster B (eu-west-1)", "Jira Board Delta-2024"],
      },
      beta: {
        title: "Project Beta",
        description: "AI-powered customer support platform — scheduled for beta launch in 6 weeks.",
        people: [
          { name: "Alex Kim",     role: "ML Engineer",      dept: "Engineering" },
          { name: "Nina Patel",   role: "Product Manager",  dept: "Product" },
          { name: "Ryan O'Brien", role: "QA Lead",          dept: "Engineering" },
        ],
        budget: { allocated: 900000, spent: 520000, forecast: 850000 },
        policies: ["AI Ethics Framework v1", "Data Privacy Policy v2"],
        assets: ["GCP Cluster B (eu-west-1)", "AWS Cluster A (us-east-1)", "HuggingFace Enterprise License"],
      },
      mktg: {
        title: "Marketing Team",
        description: "Global marketing operations — 24 team members across 3 regions.",
        people: [
          { name: "James Wilson",  role: "VP Marketing",     dept: "Marketing" },
          { name: "Lisa Park",     role: "Content Strategist", dept: "Marketing" },
          { name: "David Nguyen",  role: "Performance Marketing", dept: "Marketing" },
        ],
        budget: { allocated: 1800000, spent: 1650000, forecast: 1790000 },
        policies: ["Brand Guidelines v4", "Social Media Policy"],
        assets: ["HubSpot Enterprise", "Google Analytics 360", "Adobe Creative Cloud"],
      },
      eng: {
        title: "Engineering Team",
        description: "Core platform engineering — 62 engineers across backend, frontend, ML, and DevOps.",
        people: [
          { name: "Marcus Chen",   role: "VP Engineering",  dept: "Engineering" },
          { name: "Sarah Jenkins",  role: "Senior Developer", dept: "Engineering" },
          { name: "Alex Kim",       role: "ML Engineer",     dept: "Engineering" },
        ],
        budget: { allocated: 4200000, spent: 3800000, forecast: 4100000 },
        policies: ["Code Review Policy", "Security Development Lifecycle"],
        assets: ["AWS Cluster A", "GCP Cluster B", "GitHub Enterprise", "Datadog APM"],
      },
      budget: {
        title: "$1.2M Budget — Project Phoenix",
        description: "FY2026 budget allocation for Project Phoenix across all departments.",
        people: [
          { name: "Rachel Adams", role: "CFO", dept: "Finance" },
          { name: "Kevin Liu",    role: "Financial Analyst", dept: "Finance" },
        ],
        budget: { allocated: 1200000, spent: 870000, forecast: 1150000 },
        policies: ["Capital Expenditure Policy", "Vendor Payment Terms"],
        assets: ["SAP Financial Module", "Tableau Finance Dashboard"],
      },
      aws: {
        title: "AWS Cluster A",
        description: "Primary production infrastructure — us-east-1 region, 120+ instances.",
        people: [
          { name: "Chris Torres", role: "Cloud Architect", dept: "IT" },
          { name: "Maya Gupta",   role: "SRE Lead",       dept: "IT" },
        ],
        budget: { allocated: 380000, spent: 310000, forecast: 370000 },
        policies: ["Cloud Security Policy", "Disaster Recovery Plan v3"],
        assets: ["120 EC2 Instances", "RDS PostgreSQL Cluster", "ElastiCache Redis", "S3 (14TB)"],
      },
      privacy: {
        title: "Data Privacy Policy v2",
        description: "Organization-wide data privacy framework aligned with GDPR and CCPA.",
        people: [
          { name: "Helen Brooks", role: "Chief Privacy Officer", dept: "Legal" },
          { name: "Omar Farouk",  role: "Compliance Analyst",    dept: "Governance" },
        ],
        budget: { allocated: 200000, spent: 145000, forecast: 190000 },
        policies: ["GDPR Article 30 Records", "CCPA Consumer Rights Framework"],
        assets: ["OneTrust Platform", "Data Mapping Registry"],
      },
      sales: {
        title: "Sales Team",
        description: "Global sales operations — 38 reps, $24M annual target.",
        people: [
          { name: "Robert Hayes", role: "VP Sales",        dept: "Sales" },
          { name: "Amanda Li",    role: "Enterprise AE",   dept: "Sales" },
          { name: "Brian Scott",  role: "Sales Ops Lead",  dept: "Sales" },
        ],
        budget: { allocated: 2100000, spent: 1900000, forecast: 2050000 },
        policies: ["Discount Approval Matrix", "Commission Policy v5"],
        assets: ["Salesforce Enterprise", "Gong.io", "LinkedIn Sales Navigator"],
      },
      hr: {
        title: "HR Department",
        description: "People operations — recruitment, onboarding, L&D, and employee experience.",
        people: [
          { name: "Karen Mitchell", role: "CHRO",             dept: "HR" },
          { name: "Tom Baker",      role: "HR Systems Lead",  dept: "HR" },
          { name: "Diana Ross",     role: "Talent Acquisition", dept: "HR" },
        ],
        budget: { allocated: 900000, spent: 780000, forecast: 870000 },
        policies: ["Remote Work Policy", "Employee Handbook v7", "DEI Framework"],
        assets: ["Workday HCM", "Greenhouse ATS", "Lattice Performance"],
      },
      compliance: {
        title: "SOC2 Compliance",
        description: "SOC2 Type II certification program — annual audit cycle.",
        people: [
          { name: "Helen Brooks", role: "Chief Privacy Officer", dept: "Legal" },
          { name: "Chris Torres", role: "Cloud Architect",       dept: "IT" },
        ],
        budget: { allocated: 150000, spent: 120000, forecast: 145000 },
        policies: ["SOC2 Trust Services Criteria", "Incident Response Plan"],
        assets: ["Vanta Compliance Platform", "Audit Log Repository"],
      },
      gcp: {
        title: "GCP Cluster B",
        description: "Secondary cloud infrastructure — EU workloads, ML training pipelines.",
        people: [
          { name: "Maya Gupta",  role: "SRE Lead",         dept: "IT" },
          { name: "Alex Kim",    role: "ML Engineer",      dept: "Engineering" },
        ],
        budget: { allocated: 260000, spent: 195000, forecast: 250000 },
        policies: ["Cloud Security Policy", "EU Data Residency Requirements"],
        assets: ["48 GCE Instances", "BigQuery (8TB)", "Vertex AI Endpoints"],
      },
    },
  },

  // ── Screen C: Workflow Engine ──────────────────────────────
  playbooks: [
    {
      id: "pb-1",
      name: "Emergency Server Migration",
      priority: "Critical",
      triggered: "Mar 11, 2026 — 08:22 AM",
      triggeredBy: "System Auto-Detect",
      steps: [
        { id: "s1", dept: "IT",         label: "Spin up backup servers",                status: "completed",   icon: "🖥️",  assignee: "Chris Torres",   completedAt: "08:34 AM" },
        { id: "s2", dept: "Operations",  label: "Reroute traffic to backup cluster",     status: "in-progress", icon: "🔄",  assignee: "Maya Gupta",     completedAt: null },
        { id: "s3", dept: "Communications", label: "Email affected enterprise clients",  status: "waiting",     icon: "📧",  assignee: "James Wilson",   completedAt: null },
        { id: "s4", dept: "Governance",  label: "Log incident for Q4 Audit trail",       status: "pending",     icon: "📋",  assignee: "Omar Farouk",    completedAt: null },
      ],
    },
    {
      id: "pb-2",
      name: "Quarterly Compliance Review",
      priority: "High",
      triggered: "Mar 10, 2026 — 02:00 PM",
      triggeredBy: "Scheduled Automation",
      steps: [
        { id: "s1", dept: "Legal",       label: "Collect policy attestations",           status: "completed",   icon: "📝",  assignee: "Helen Brooks",   completedAt: "Mar 10 — 3:15 PM" },
        { id: "s2", dept: "IT",           label: "Export access logs for audit",          status: "completed",   icon: "📊",  assignee: "Chris Torres",   completedAt: "Mar 10 — 4:00 PM" },
        { id: "s3", dept: "HR",           label: "Verify employee training completion",   status: "in-progress", icon: "✅",  assignee: "Karen Mitchell", completedAt: null },
        { id: "s4", dept: "Finance",      label: "Prepare audit cost summary",            status: "pending",     icon: "💰",  assignee: "Kevin Liu",      completedAt: null },
      ],
    },
  ],

  playbookTemplates: [
    "New Employee Onboarding",
    "Emergency Server Migration",
    "Quarterly Compliance Review",
    "Vendor Offboarding",
    "Security Incident Response",
    "Budget Reallocation Request",
    "Product Launch Checklist",
    "Data Breach Protocol",
  ],

  // ── "Aha!" Search Interaction ──────────────────────────────
  impactQuery: "show impact of raising minimum server specifications",
  impactResult: {
    title: "Impact Analysis: Raising Minimum Server Specifications",
    subtitle: "Cross-system query completed across 4 departments in 1.2s",
    sections: [
      {
        dept: "IT Infrastructure",
        icon: "🖥️",
        color: "var(--cyan)",
        metric: "450 instances",
        detail: "Will require upgrading 450 active instances across AWS Cluster A and GCP Cluster B to meet new minimum specs (8 vCPU / 32GB RAM).",
      },
      {
        dept: "Finance",
        icon: "💰",
        color: "var(--amber)",
        metric: "$45,000/MRR",
        detail: "Estimated cost increase of $45,000 per month. Annual impact: $540,000. Current infrastructure budget has $70,000/MRR headroom.",
      },
      {
        dept: "HR / Operations",
        icon: "👥",
        color: "var(--violet)",
        metric: "3 Playbooks",
        detail: "Will require updating 3 active onboarding playbooks for the Engineering team to reflect new provisioning standards.",
      },
      {
        dept: "Governance",
        icon: "📋",
        color: "var(--emerald)",
        metric: "2 Policies",
        detail: "Cloud Security Policy and Disaster Recovery Plan v3 reference current minimum specs and will need revision.",
      },
    ],
    action: "Draft Policy Update",
  },

  // ── People hover data ──────────────────────────────────────
  people: {
    "Sarah Jenkins":   { role: "Senior Developer",    dept: "Engineering", projects: ["Project Delta"],   budgetOwner: false },
    "Marcus Chen":     { role: "VP Engineering",       dept: "Engineering", projects: ["Project Phoenix"], budgetOwner: true },
    "James Wilson":    { role: "VP Marketing",         dept: "Marketing",   projects: ["Project Phoenix"], budgetOwner: true },
    "Priya Sharma":    { role: "UX Director",          dept: "Design",      projects: ["Project Phoenix"], budgetOwner: false },
    "Elena Rodriguez": { role: "Data Analyst",         dept: "Analytics",   projects: ["Project Phoenix"], budgetOwner: false },
    "Chris Torres":    { role: "Cloud Architect",      dept: "IT",          projects: ["AWS Cluster A"],   budgetOwner: false },
    "Maya Gupta":      { role: "SRE Lead",             dept: "IT",          projects: ["GCP Cluster B", "AWS Cluster A"], budgetOwner: false },
    "Alex Kim":        { role: "ML Engineer",          dept: "Engineering", projects: ["Project Beta"],    budgetOwner: false },
    "Helen Brooks":    { role: "Chief Privacy Officer", dept: "Legal",      projects: ["SOC2 Compliance"], budgetOwner: false },
    "Omar Farouk":     { role: "Compliance Analyst",   dept: "Governance",  projects: ["SOC2 Compliance"], budgetOwner: false },
    "Karen Mitchell":  { role: "CHRO",                 dept: "HR",          projects: [],                  budgetOwner: true },
    "Tom Baker":       { role: "HR Systems Lead",      dept: "HR",          projects: ["Project Delta"],   budgetOwner: false },
    "Robert Hayes":    { role: "VP Sales",             dept: "Sales",       projects: [],                  budgetOwner: true },
    "Kevin Liu":       { role: "Financial Analyst",    dept: "Finance",     projects: [],                  budgetOwner: false },
    "Rachel Adams":    { role: "CFO",                  dept: "Finance",     projects: [],                  budgetOwner: true },
  },
};
