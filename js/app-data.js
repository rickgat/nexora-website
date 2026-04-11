/* ============================================
   NEXORA APP — Mock Data
   Enterprise Project & Product Management Platform
   ============================================ */

const APP_DATA = {
  user: { name: "Ricky Santosa", email: "ricky@nexora.io", role: "Admin", initials: "RS" },

  // ---- Dashboard KPIs ----
  kpis: [
    { label: "Total Projects", value: 24, trend: +8, icon: "folder" },
    { label: "Active Tasks", value: 186, trend: +12, icon: "tasks" },
    { label: "Open Risks", value: 14, trend: -3, icon: "alert" },
    { label: "Completion Rate", value: 78, unit: "%", trend: +5, icon: "check" },
  ],

  summaryStrip: [
    { label: "Projects", value: 24 },
    { label: "Tasks", value: 186 },
    { label: "Team", value: 42 },
    { label: "Risks", value: 14 },
    { label: "Budget", value: "$2.4M" },
  ],

  tasksByProject: [
    { name: "SMS Gateway", done: 28, active: 12 },
    { name: "Mobile Banking", done: 22, active: 18 },
    { name: "OTP Service", done: 35, active: 5 },
    { name: "Push Notif Engine", done: 15, active: 20 },
    { name: "WA Business API", done: 10, active: 16 },
    { name: "Payment Gateway", done: 18, active: 14 },
  ],

  projectStatus: [
    { label: "Active", value: 12, color: "#6366f1" },
    { label: "Planning", value: 4, color: "#0ea5e9" },
    { label: "On Hold", value: 3, color: "#f59e0b" },
    { label: "Completed", value: 5, color: "#10b981" },
  ],

  teamWorkload: [
    { name: "Ricky S.", load: 88 },
    { name: "Sarah C.", load: 75 },
    { name: "Tom K.", load: 92 },
    { name: "James O.", load: 60 },
    { name: "Marcus R.", load: 70 },
    { name: "Nina P.", load: 55 },
    { name: "Alex L.", load: 82 },
    { name: "Emily W.", load: 45 },
  ],

  upcomingDeadlines: [
    { task: "Rate limiter deploy", project: "SMS Gateway", days: 2, color: "#ef4444" },
    { task: "OTP fallback handler", project: "Mobile Banking", days: 5, color: "#f59e0b" },
    { task: "WA template parser", project: "WA Business API", days: 8, color: "#10b981" },
    { task: "QRIS code generation", project: "Payment Gateway", days: 12, color: "#10b981" },
    { task: "Analytics widget", project: "CRM Dashboard", days: 18, color: "#10b981" },
  ],

  overdueItems: [
    { task: "FCM token refresh", project: "Push Notif Engine", assignee: "JO", days: 3 },
    { task: "Auth migration test", project: "Mobile Banking", assignee: "SC", days: 1 },
  ],

  // ---- Projects ----
  projects: [
    { id: "PRJ-001", name: "SMS Gateway Platform v3", pm: "Ricky Santosa", status: "active", priority: "critical", progress: 68, budget: { spent: 180, total: 240 }, team: 8 },
    { id: "PRJ-002", name: "Mobile Banking Integration", pm: "Sarah Chen", status: "active", priority: "high", progress: 45, budget: { spent: 95, total: 200 }, team: 6 },
    { id: "PRJ-003", name: "OTP Service Module", pm: "James Okonkwo", status: "completed", priority: "high", progress: 100, budget: { spent: 120, total: 130 }, team: 4 },
    { id: "PRJ-004", name: "Push Notification Engine", pm: "Tom Kim", status: "active", priority: "high", progress: 55, budget: { spent: 88, total: 160 }, team: 5 },
    { id: "PRJ-005", name: "WhatsApp Business API", pm: "Marcus Rivera", status: "active", priority: "medium", progress: 30, budget: { spent: 45, total: 180 }, team: 5 },
    { id: "PRJ-006", name: "Payment Gateway v2", pm: "Alex Liu", status: "active", priority: "high", progress: 22, budget: { spent: 35, total: 200 }, team: 6 },
    { id: "PRJ-007", name: "Email Campaign System", pm: "Nina Park", status: "completed", priority: "medium", progress: 100, budget: { spent: 75, total: 80 }, team: 3 },
    { id: "PRJ-008", name: "CRM Dashboard", pm: "Emily Watson", status: "planning", priority: "medium", progress: 10, budget: { spent: 12, total: 150 }, team: 4 },
  ],

  // ---- Kanban Tasks ----
  kanban: {
    backlog: [
      { id: "TSK-401", title: "Setup staging for WA API", assignee: "RF", priority: "medium", project: "WA Business API", dueDate: "Apr 20" },
      { id: "TSK-402", title: "DB migration script v18", assignee: "AL", priority: "high", project: "Payment Gateway", dueDate: "Apr 18" },
      { id: "TSK-403", title: "Unit tests — auth module", assignee: "EW", priority: "low", project: "CRM Dashboard", dueDate: "Apr 25" },
    ],
    active: [
      { id: "TSK-394", title: "Multi-provider failover", assignee: "RS", priority: "critical", project: "SMS Gateway", dueDate: "Apr 18" },
      { id: "TSK-395", title: "FCM token refresh cron", assignee: "JO", priority: "high", project: "Push Notif", dueDate: "Apr 10", overdue: true },
      { id: "TSK-396", title: "OTP SMS fallback handler", assignee: "SC", priority: "high", project: "Mobile Banking", dueDate: "Apr 20" },
      { id: "TSK-397", title: "WA template parser regex", assignee: "MR", priority: "medium", project: "WA Business API", dueDate: "Apr 25" },
    ],
    review: [
      { id: "TSK-388", title: "Rate limiter middleware", assignee: "TK", priority: "high", project: "SMS Gateway", dueDate: "Apr 12" },
      { id: "TSK-389", title: "Bounce monitor cron job", assignee: "NP", priority: "medium", project: "Email Campaign", dueDate: "Apr 08" },
    ],
    done: [
      { id: "TSK-380", title: "Connection pool optimization", assignee: "AL", priority: "high", project: "Payment Gateway", dueDate: "Apr 05" },
      { id: "TSK-381", title: "API versioning v2", assignee: "RS", priority: "high", project: "SMS Gateway", dueDate: "Apr 03" },
      { id: "TSK-382", title: "Auth token migration", assignee: "SC", priority: "critical", project: "Mobile Banking", dueDate: "Apr 01" },
    ],
  },

  // ---- Risks ----
  risks: [
    { id: "RSK-01", title: "SMS provider API instability", project: "SMS Gateway", probability: "high", impact: "high", rpn: 16, owner: "RS", status: "open", mitigation: "Multi-provider failover implementation" },
    { id: "RSK-02", title: "Payment gateway compliance delay", project: "Payment Gateway", probability: "medium", impact: "high", rpn: 12, owner: "AL", status: "open", mitigation: "Engage legal team early, parallel processing" },
    { id: "RSK-03", title: "Mobile SDK fragmentation", project: "Mobile Banking", probability: "high", impact: "medium", rpn: 12, owner: "SC", status: "mitigating", mitigation: "Cross-platform abstraction layer" },
    { id: "RSK-04", title: "WA API rate limit changes", project: "WA Business API", probability: "medium", impact: "medium", rpn: 9, owner: "MR", status: "open", mitigation: "Implement adaptive throttling" },
    { id: "RSK-05", title: "Key developer departure", project: "All", probability: "low", impact: "high", rpn: 8, owner: "RS", status: "monitoring", mitigation: "Knowledge documentation, pair programming" },
  ],

  // ---- PMO: Delivery Metrics ----
  deliveryMetrics: {
    onTimeRate: 82,
    cpi: 1.08,
    spi: 0.94,
    velocity: 34,
    perProject: [
      { name: "SMS Gateway", onTime: 88, velocity: 42, trend: "up" },
      { name: "Mobile Banking", onTime: 75, velocity: 28, trend: "down" },
      { name: "Push Notif", onTime: 80, velocity: 35, trend: "stable" },
      { name: "WA Business API", onTime: 70, velocity: 22, trend: "down" },
      { name: "Payment Gateway", onTime: 92, velocity: 38, trend: "up" },
    ],
  },

  // ---- PMO: Early Warnings ----
  earlyWarnings: [
    { project: "Mobile Banking Integration", detector: "Schedule Slip", severity: "high", message: "3 tasks overdue, sprint velocity declining 15%", detected: "Apr 10" },
    { project: "WhatsApp Business API", detector: "Scope Creep", severity: "medium", message: "12 new tasks added after sprint planning, +30% scope increase", detected: "Apr 08" },
    { project: "Push Notification Engine", detector: "Resource Gap", severity: "high", message: "Key developer at 92% capacity, no backup assigned", detected: "Apr 07" },
    { project: "Payment Gateway v2", detector: "Budget Burn", severity: "low", message: "Spending 8% below forecast — verify if work is progressing", detected: "Apr 05" },
    { project: "SMS Gateway Platform v3", detector: "Risk Escalation", severity: "medium", message: "Open risk RSK-01 probability increased from medium to high", detected: "Apr 03" },
  ],

  // ---- PMO: Priority Matrix ----
  priorityMatrix: [
    { name: "SMS Gateway", impact: 9, effort: 7, value: 85, quadrant: "strategic" },
    { name: "Mobile Banking", impact: 8, effort: 8, value: 70, quadrant: "strategic" },
    { name: "OTP Service", impact: 7, effort: 3, value: 90, quadrant: "quick-win" },
    { name: "Push Notif", impact: 6, effort: 5, value: 65, quadrant: "quick-win" },
    { name: "WA Business API", impact: 5, effort: 7, value: 45, quadrant: "review" },
    { name: "Payment Gateway", impact: 8, effort: 6, value: 75, quadrant: "strategic" },
    { name: "Email Campaign", impact: 4, effort: 2, value: 80, quadrant: "quick-win" },
    { name: "CRM Dashboard", impact: 3, effort: 6, value: 30, quadrant: "deprioritize" },
  ],

  // ---- Product: OKR ----
  okrs: [
    { objective: "Increase platform reliability to 99.95% uptime", progress: 72, owner: "Ricky S.", quarter: "Q2 2026", keyResults: [
      { title: "Implement multi-provider failover for SMS", progress: 62, status: "on-track" },
      { title: "Reduce P1 incident response time to <15min", progress: 85, status: "on-track" },
      { title: "Deploy auto-scaling for all core services", progress: 70, status: "at-risk" },
    ]},
    { objective: "Launch 3 new channel integrations", progress: 45, owner: "Marcus R.", quarter: "Q2 2026", keyResults: [
      { title: "WhatsApp Business API GA release", progress: 30, status: "at-risk" },
      { title: "RCS messaging pilot with 2 clients", progress: 55, status: "on-track" },
      { title: "Telegram bot framework beta", progress: 50, status: "on-track" },
    ]},
    { objective: "Improve developer productivity by 25%", progress: 60, owner: "Tom K.", quarter: "Q2 2026", keyResults: [
      { title: "CI/CD pipeline under 5 minutes", progress: 80, status: "on-track" },
      { title: "Automated test coverage >80%", progress: 55, status: "at-risk" },
      { title: "Dev onboarding time <3 days", progress: 45, status: "behind" },
    ]},
  ],

  // ---- Product: Roadmap ----
  roadmap: [
    { quarter: "Q1 2026", label: "Foundation", items: [
      { name: "Multi-tenant architecture", status: "done" },
      { name: "Core auth & RBAC", status: "done" },
      { name: "Project management MVP", status: "done" },
      { name: "Task board & Kanban", status: "done" },
    ]},
    { quarter: "Q2 2026", label: "Intelligence", current: true, items: [
      { name: "PMO Intelligence layer", status: "active" },
      { name: "AI Assistant integration", status: "active" },
      { name: "Knowledge Base v1", status: "active" },
      { name: "Product Management suite", status: "planned" },
    ]},
    { quarter: "Q3 2026", label: "Scale", items: [
      { name: "Advanced analytics", status: "planned" },
      { name: "Custom workflows", status: "planned" },
      { name: "API marketplace", status: "planned" },
      { name: "Mobile app (iOS/Android)", status: "planned" },
    ]},
    { quarter: "Q4 2026", label: "Autonomy", items: [
      { name: "Predictive project health", status: "planned" },
      { name: "Auto resource allocation", status: "planned" },
      { name: "Natural language queries", status: "planned" },
      { name: "Self-healing workflows", status: "planned" },
    ]},
  ],

  // ---- Team ----
  team: [
    { name: "Ricky Santosa", initials: "RS", role: "Tech Lead", department: "Engineering", skills: ["Rust", "System Design", "PostgreSQL"], capacity: 88, tasks: 5, status: "active" },
    { name: "Sarah Chen", initials: "SC", role: "Sr. Engineer", department: "Integration", skills: ["Java", "Spring", "Kafka"], capacity: 75, tasks: 4, status: "active" },
    { name: "Tom Kim", initials: "TK", role: "Platform Engineer", department: "Platform", skills: ["Go", "Kubernetes", "AWS"], capacity: 92, tasks: 6, status: "active" },
    { name: "James Okonkwo", initials: "JO", role: "Security Engineer", department: "Security", skills: ["Cryptography", "OAuth", "Pentest"], capacity: 60, tasks: 2, status: "active" },
    { name: "Marcus Rivera", initials: "MR", role: "Sr. Engineer", department: "Channel", skills: ["Node.js", "WhatsApp API", "Redis"], capacity: 70, tasks: 3, status: "active" },
    { name: "Nina Park", initials: "NP", role: "Engineer", department: "Marketing Tech", skills: ["Python", "Email SMTP", "Analytics"], capacity: 55, tasks: 2, status: "active" },
    { name: "Alex Liu", initials: "AL", role: "Sr. Engineer", department: "Fintech", skills: ["Rust", "gRPC", "Payment APIs"], capacity: 82, tasks: 4, status: "active" },
    { name: "Emily Watson", initials: "EW", role: "Data Engineer", department: "Analytics", skills: ["Python", "SQL", "Tableau"], capacity: 45, tasks: 2, status: "away" },
    { name: "David Chen", initials: "DC", role: "QA Lead", department: "Quality", skills: ["Selenium", "K6", "Cypress"], capacity: 92, tasks: 5, status: "active" },
    { name: "Ryan Foster", initials: "RF", role: "DevOps Engineer", department: "Infrastructure", skills: ["Terraform", "Docker", "CI/CD"], capacity: 85, tasks: 3, status: "active" },
  ],

  // ---- AI Assistant (mock conversation) ----
  aiConversation: [
    { role: "user", content: "Analyze the risk of SMS Gateway project missing its Q2 deadline." },
    { role: "assistant", content: "Based on current project metrics:\n\n**Risk Assessment: MEDIUM-HIGH**\n\n1. **Progress**: 68% complete with 5 weeks remaining — on track if velocity holds\n2. **Key Risk**: RSK-01 (SMS provider instability) has escalated to HIGH probability\n3. **Resource**: Tom Kim at 92% capacity with 3 queued tasks\n\n**Recommendation**: Prioritize the multi-provider failover (TSK-394) and consider reassigning Tom's lower-priority tasks to free up bandwidth." },
    { role: "user", content: "Which tasks should I reassign from Tom?" },
    { role: "assistant", content: "Looking at Tom's task queue:\n\n**Reassign these tasks:**\n- TSK-405: \"Log aggregation setup\" (medium priority) → Ryan Foster (DevOps, 85% capacity)\n- TSK-408: \"API docs update\" (low priority) → Emily Watson (45% capacity)\n\n**Keep assigned to Tom:**\n- TSK-388: \"Rate limiter middleware\" (high priority, in review — nearly done)\n- TSK-394 dependency items (his domain expertise required)\n\nThis would reduce Tom's load from 92% → ~75%, giving buffer for the critical path." },
  ],

  // ---- Activity ----
  activity: [
    { user: "TK", action: "completed task", target: "Rate limiter middleware → Review", time: "5 min ago" },
    { user: "RS", action: "updated risk", target: "RSK-01 probability → High", time: "18 min ago" },
    { user: "NP", action: "closed task", target: "Bounce monitor cron job", time: "32 min ago" },
    { user: "SC", action: "added comment", target: "OTP fallback — testing results", time: "1 hr ago" },
    { user: "AL", action: "created task", target: "QRIS code generation", time: "2 hr ago" },
    { user: "DC", action: "moved task", target: "API versioning → QC", time: "3 hr ago" },
  ],

  // ---- Notifications ----
  notifications: [
    { id: 1, title: "Task overdue", desc: "TSK-395: FCM token refresh — 3 days overdue", time: "10 min ago", read: false, type: "warning" },
    { id: 2, title: "Early warning triggered", desc: "Mobile Banking — schedule slip detected", time: "1 hr ago", read: false, type: "warning" },
    { id: 3, title: "Risk escalated", desc: "RSK-01: SMS provider instability → High", time: "2 hr ago", read: false, type: "action" },
    { id: 4, title: "Sprint review tomorrow", desc: "Sprint 24 review scheduled for 10:00 AM", time: "5 hr ago", read: true, type: "info" },
    { id: 5, title: "Task completed", desc: "OTP Service Module — all tasks done", time: "1 day ago", read: true, type: "success" },
  ],
};
