// Default content for Nexora website — all editable via CMS
const DEFAULT_CONTENT = {
  meta: {
    siteName: "Nexora",
    tagline: "The Future of Innovation",
    favicon: "",
  },

  nav: {
    logo: "Nexora",
    links: [
      { label: "About", href: "#about" },
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#contact" },
    ],
    ctaText: "Get Started",
    ctaHref: "app.html#login",
  },

  hero: {
    badge: "Nexora PM Dashboard",
    headline: "Manage Projects.\nDeliver Results.",
    subheadline:
      "The enterprise platform for project management, PMO intelligence, and product delivery. From Kanban boards to AI-powered early warnings — everything your team needs in one place.",
    primaryCta: "Start Free Trial",
    primaryCtaHref: "app.html#login",
    secondaryCta: "Watch Demo",
    secondaryCtaHref: "#features",
    stats: [
      { value: "48", label: "Modules" },
      { value: "400+", label: "Concurrent Users" },
      { value: "<3ms", label: "Response Time" },
      { value: "99.9%", label: "Uptime" },
    ],
  },

  about: {
    badge: "Why Nexora",
    headline: "Project Management, Reimagined",
    description:
      "Nexora goes beyond task tracking. It combines project management, PMO intelligence, product management, and AI assistance into a single platform built for teams that ship.",
    highlights: [
      {
        icon: "layers",
        title: "Full Project Lifecycle",
        description:
          "From PRD to retrospective — manage kickoff, sprints, milestones, tasks, resources, and budgets in one unified workflow.",
      },
      {
        icon: "zap",
        title: "PMO Intelligence Layer",
        description:
          "Delivery metrics, priority matrix, early warning engine, and executive dashboards that surface risks before they become problems.",
      },
      {
        icon: "brain",
        title: "AI-Powered Assistant",
        description:
          "Built-in AI assistant (Claude, GPT, Gemini) that analyzes your projects, suggests task reassignments, and predicts delivery risks.",
      },
      {
        icon: "shield",
        title: "Enterprise-Grade Security",
        description:
          "Multi-tenant isolation, RBAC with 7 roles, JWT auth, AES-256 encryption, and full audit trail on every action.",
      },
    ],
    image: "",
  },

  features: {
    badge: "Features",
    headline: "48 Modules.\nOne Platform.",
    description:
      "From Kanban boards to OKR tracking, risk heatmaps to AI chat — every tool your team needs to deliver projects on time and on budget.",
    items: [
      {
        icon: "layers",
        title: "Kanban Board",
        description:
          "Phase-colored columns (Backlog, Active, Review, Done) with drag-drop, overdue detection, Excel import, and real-time search.",
        color: "#6366f1",
      },
      {
        icon: "chart",
        title: "PMO Intelligence",
        description:
          "Delivery metrics, priority matrix, early warnings (5 detectors), project dependencies, and steering committee reports.",
        color: "#0ea5e9",
      },
      {
        icon: "brain",
        title: "AI Assistant",
        description:
          "Multi-provider AI chat (Claude/GPT/Gemini) with project context, risk analysis, and resource optimization recommendations.",
        color: "#8b5cf6",
      },
      {
        icon: "globe",
        title: "Product Management",
        description:
          "OKR tracking, product roadmap, user personas, customer feedback, feature flags, A/B experiments, and NPS surveys.",
        color: "#06b6d4",
      },
      {
        icon: "workflow",
        title: "Knowledge Base",
        description:
          "Full-text searchable notes with graph visualization, auto-linking between documents, and AI-powered content enhancement.",
        color: "#14b8a6",
      },
      {
        icon: "lock",
        title: "Role-Based Access",
        description:
          "7 role levels (Admin to Developer) with menu-action based CRUD permissions, enforced on both frontend and backend.",
        color: "#f59e0b",
      },
    ],
  },

  howItWorks: {
    badge: "How It Works",
    headline: "From Kickoff\nto Delivery",
    description:
      "Nexora manages the complete project lifecycle — so your team stays aligned and your stakeholders stay informed.",
    steps: [
      {
        number: "01",
        title: "Create & Plan",
        description:
          "Start with a project kickoff request, define milestones and sprints, assign team members, and set budgets — all in one place.",
      },
      {
        number: "02",
        title: "Execute & Track",
        description:
          "Use Kanban boards, Gantt charts, and task assignments to track progress. AI monitors for risks, scope creep, and resource gaps automatically.",
      },
      {
        number: "03",
        title: "Deliver & Learn",
        description:
          "Hit your milestones with delivery metrics, run retrospectives, capture lessons learned, and continuously improve with data-driven insights.",
      },
    ],
  },

  testimonials: {
    badge: "Testimonials",
    headline: "Trusted by Engineering Leaders",
    items: [
      {
        quote:
          "Nexora's early warning system caught a schedule slip 3 weeks before it would have impacted our release. That alone justified the investment.",
        author: "Sarah Chen",
        role: "VP Engineering, TechCorp",
        avatar: "",
      },
      {
        quote:
          "We moved from 5 different tools to Nexora. Our PMO finally has a single source of truth — delivery metrics, risk heatmaps, and OKRs in one dashboard.",
        author: "Marcus Rivera",
        role: "Head of PMO, ScaleForce",
        avatar: "",
      },
      {
        quote:
          "The AI assistant is a game-changer. It analyzed our project data and recommended task reassignments that improved sprint velocity by 25%.",
        author: "Dr. Emily Watson",
        role: "CTO, DataFlow Systems",
        avatar: "",
      },
      {
        quote:
          "With 400 concurrent users across 14 departments, Nexora handles our scale effortlessly. Sub-3ms response times even on complex queries.",
        author: "James Okonkwo",
        role: "Engineering Director, GlobalBank",
        avatar: "",
      },
    ],
  },

  pricing: {
    badge: "Pricing",
    headline: "Simple, Transparent Pricing",
    description:
      "No hidden fees. Scale from a small team to an entire organization.",
    plans: [
      {
        name: "Team",
        price: "$12",
        period: "/user/mo",
        description: "For small teams getting started with project management.",
        features: [
          "Up to 20 team members",
          "Project & task management",
          "Kanban board",
          "Basic dashboard & reports",
          "Email support",
        ],
        cta: "Start Free Trial",
        highlighted: false,
      },
      {
        name: "Business",
        price: "$29",
        period: "/user/mo",
        description: "For growing teams that need PMO intelligence.",
        features: [
          "Unlimited team members",
          "Everything in Team",
          "PMO Intelligence layer",
          "AI Assistant (Claude/GPT)",
          "Product management suite",
          "OKR & Roadmap",
          "Knowledge Base",
          "Priority support",
        ],
        cta: "Start Free Trial",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For organizations that need full control.",
        features: [
          "Everything in Business",
          "Multi-tenant isolation",
          "On-premise deployment",
          "Custom RBAC roles",
          "SLA guarantee (99.9%)",
          "Dedicated AI models",
          "SSO / LDAP integration",
          "24/7 phone support",
        ],
        cta: "Contact Sales",
        highlighted: false,
      },
    ],
  },

  cta: {
    headline: "Ready to Ship\nFaster?",
    description:
      "Join hundreds of engineering teams who manage projects, track OKRs, and deliver products with Nexora. Start your free 14-day trial today.",
    primaryCta: "Get Started Free",
    primaryCtaHref: "app.html#login",
    secondaryCta: "Schedule a Demo",
    secondaryCtaHref: "#contact",
  },

  contact: {
    badge: "Contact",
    headline: "Let's Talk",
    description:
      "Have questions about Nexora? Our team is here to help you find the right plan for your organization.",
    email: "hello@nexora.io",
    phone: "+62 21 5050-1234",
    address: "Jakarta, Indonesia",
  },

  footer: {
    description:
      "Enterprise project & product management platform — from kickoff to delivery.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Kanban Board", href: "app.html#kanban" },
          { label: "AI Assistant", href: "app.html#ai" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Careers", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Security", href: "#" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "#" },
          { label: "API Reference", href: "#" },
          { label: "Knowledge Base", href: "app.html#ai" },
          { label: "Status", href: "#" },
        ],
      },
    ],
    copyright: "2026 Nexora. All rights reserved.",
    socials: [
      { platform: "twitter", href: "#" },
      { platform: "github", href: "#" },
      { platform: "linkedin", href: "#" },
    ],
  },
};

// Content manager — checks localStorage overrides first
class ContentManager {
  static STORAGE_KEY = "nexora_cms_content";

  static getContent() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return this.deepMerge(DEFAULT_CONTENT, JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to load CMS content:", e);
    }
    return structuredClone(DEFAULT_CONTENT);
  }

  static saveContent(content) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(content));
  }

  static resetContent() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static deepMerge(target, source) {
    const output = structuredClone(target);
    for (const key of Object.keys(source)) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key]) &&
        target[key]
      ) {
        output[key] = this.deepMerge(target[key], source[key]);
      } else {
        output[key] = structuredClone(source[key]);
      }
    }
    return output;
  }
}

if (typeof module !== "undefined") {
  module.exports = { DEFAULT_CONTENT, ContentManager };
}
