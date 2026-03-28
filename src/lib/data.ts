// === PORTFOLIO CONTENT DATA ===
// Update this file to customize all content easily

export const personal = {
  name: "Sayooj Sunil",
  initials: "SS",
  title: "Backend Engineer & Full-Stack Developer",
  headline: "Building Scalable Systems & AI-Powered Tools",
  subHeadline:
    "2+ years shipping production-grade software. Currently building robust backend systems remotely for a US-based company.",
  email: "sayooj@example.com",
  github: "https://github.com/sayoojsunil",
  linkedin: "https://linkedin.com/in/sayoojsunil",
  location: "Remote · India",
  availableForWork: true,
  bio: [
    "I'm a backend-focused full-stack developer who cares deeply about system reliability, clean APIs, and real-world impact. I don't just write code — I own the product from architecture to deployment.",
    "Currently working remotely for a US-based company, I specialize in Laravel, REST APIs, and scalable database design. I'm actively expanding into AI systems — building agents, OCR pipelines, and automation tools that solve real business problems.",
    "I'm interested in remote roles and freelance opportunities where I can contribute meaningfully, not just fill a seat.",
  ],
  stats: [
    { label: "Years Experience", value: "2+" },
    { label: "Production Systems", value: "10+" },
    { label: "APIs Designed", value: "25+" },
    { label: "Remote Work", value: "US Co." },
  ],
};

export const skills = {
  backend: [
    "Laravel",
    "PHP",
    "REST APIs",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "Queue Systems",
    "Webhooks",
    "OAuth 2.0",
  ],
  frontend: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "HTML/CSS",
    "Tailwind CSS",
  ],
  ai_automation: [
    "Python",
    "OCR Systems",
    "OpenAI API",
    "AI Agents",
    "FastAPI",
    "Automation Workflows",
    "Telegram API",
  ],
  devops: ["Git", "Linux", "Docker", "Vercel", "Postman", "GitHub Actions"],
};

export const projects = [
  {
    id: "crm-system",
    title: "Enterprise CRM System",
    emoji: "⚡",
    problem:
      "A growing B2B company needed a centralized platform to manage leads, automate follow-ups, and track customer interactions across their sales team — existing tools were fragmented and unscalable.",
    solution:
      "Built a multi-tenant CRM from the ground up with role-based access control, automated email pipelines, real-time activity logging, and custom analytics dashboards. Designed the database schema to support 100k+ records with sub-second query performance.",
    impact: "Reduced lead response time by 60% and consolidated 4 tools into 1",
    stack: ["Laravel", "MySQL", "REST API", "Redis", "JavaScript", "Docker"],
    category: "Backend System",
    highlight: true,
    metrics: [
      { label: "Response Time Reduced", value: "60%" },
      { label: "Tools Consolidated", value: "4 → 1" },
    ],
  },
  {
    id: "telegram-automation",
    title: "Telegram Automation Platform",
    emoji: "🤖",
    problem:
      "A SaaS startup wanted to automate customer onboarding, notifications, and support workflows entirely via Telegram — without custom per-client development.",
    solution:
      "Developed a configurable Telegram bot platform with webhook-driven message routing, dynamic command builders, subscription state management, and a Laravel control panel. Clients configure bots via UI, zero code needed.",
    impact: "Launched 3 client bots in under a week each; 40% drop in support tickets",
    stack: ["Laravel", "Telegram API", "Webhooks", "MySQL", "Queue Jobs"],
    category: "Automation",
    highlight: false,
  },
  {
    id: "ai-document-processing",
    title: "AI Document Processing System",
    emoji: "🧠",
    problem:
      "A logistics company processed hundreds of invoices and shipping documents daily — manually, with high error rates and 2-day processing delays.",
    solution:
      "Built an end-to-end OCR + AI pipeline using Python, Tesseract, and OpenAI API. Documents are uploaded, automatically extracted, structured into JSON, validated against business rules, then pushed directly to their ERP via API.",
    impact: "Processing time dropped from 2 days to 4 minutes; 95%+ accuracy",
    stack: ["Python", "FastAPI", "OpenAI API", "Tesseract OCR", "PostgreSQL"],
    category: "AI / Automation",
    highlight: true,
    metrics: [
      { label: "Processing Time", value: "2d → 4min" },
      { label: "Accuracy", value: "95%+" },
    ],
  },
  {
    id: "multi-tenant-api",
    title: "Multi-Tenant API Platform",
    emoji: "🔌",
    problem:
      "A product company needed to expose their core functionality as a white-label API product for third-party integrations, with per-tenant rate limiting, usage billing, and analytics.",
    solution:
      "Designed and built a RESTful API platform with tenant isolation via subdomain routing, JWT + API-key authentication dual system, per-endpoint rate limiting using Redis, and a billing dashboard integrated with usage tracking.",
    impact: "Platform onboarded 8 enterprise clients in 3 months post-launch",
    stack: ["Laravel", "PostgreSQL", "Redis", "JWT Auth", "REST API", "Docker"],
    category: "Backend System",
    highlight: false,
  },
];

export const experience = [
  {
    id: "current-role",
    role: "Full-Stack Developer",
    company: "US-Based Tech Company",
    companyNote: "(Remote)",
    period: "2023 — Present",
    current: true,
    description:
      "Building and maintaining production backend systems for a US-based product company. Own the full backend stack including API design, database architecture, and third-party integrations.",
    achievements: [
      "Architected a CRM module serving 500+ active users with 99.9% uptime",
      "Designed the database schema for a multi-tenant reporting engine (50M+ rows)",
      "Built and documented 30+ REST API endpoints consumed by web and mobile clients",
      "Reduced average API response time by 40% through query optimization and caching",
      "Introduced automated background job processing, offloading 70% of heavy operations",
    ],
    stack: ["Laravel", "PHP", "MySQL", "Redis", "REST APIs", "JavaScript"],
  },
  {
    id: "freelance",
    role: "Freelance Backend Developer",
    company: "Independent",
    companyNote: "",
    period: "2022 — 2023",
    current: false,
    description:
      "Delivered backend solutions for small to mid-sized businesses. Focused on API development, automation scripts, and custom CMS integrations.",
    achievements: [
      "Delivered 5+ custom Laravel projects including e-commerce backends and booking systems",
      "Built Telegram bots and automation workflows for service businesses",
      "Integrated third-party services: payment gateways, SMS providers, email platforms",
    ],
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "Python"],
  },
];

export const services = [
  {
    id: "backend-api",
    icon: "ServerIcon",
    title: "Backend API Development",
    description:
      "Robust, well-documented REST APIs built on Laravel. From simple CRUD to complex multi-tenant architectures with auth, rate limiting, and caching.",
    features: ["Laravel / PHP", "REST API design", "Authentication systems", "Database optimization"],
  },
  {
    id: "automation",
    icon: "ZapIcon",
    title: "Automation Systems",
    description:
      "Custom automation workflows that eliminate repetitive tasks. Telegram bots, scheduled jobs, webhook processors, and business process automation.",
    features: ["Telegram bots", "Webhook pipelines", "Job queues", "Business workflows"],
  },
  {
    id: "ai-integration",
    icon: "BrainIcon",
    title: "AI Tool Integration",
    description:
      "Integrate AI into your workflows. OCR document processing, GPT-powered features, AI agents, and intelligent data extraction pipelines.",
    features: ["OpenAI API", "OCR systems", "AI agents", "Data pipelines"],
  },
  {
    id: "crm-dashboard",
    icon: "LayoutDashboard",
    title: "CRM & Dashboards",
    description:
      "Custom business dashboards and CRM systems tailored to your process. Real-time data, role-based access, and analytics built to scale.",
    features: ["Custom CRM", "Analytics dashboards", "Role-based access", "Real-time data"],
  },
];

export const blogPosts = [
  {
    id: "laravel-queue-patterns",
    title: "Queue Patterns That Actually Scale in Laravel",
    excerpt:
      "Most Laravel queue setups fall apart under load. Here's how I architect job queues for high-throughput production systems — with real failure handling.",
    date: "March 2025",
    readTime: "8 min",
    tags: ["Laravel", "Backend", "Performance"],
  },
  {
    id: "building-ai-pipeline",
    title: "Building an OCR + AI Document Pipeline from Scratch",
    excerpt:
      "How I went from a fragile Python script to a reliable AI-powered document processor handling 500+ invoices/day with 95%+ accuracy.",
    date: "February 2025",
    readTime: "12 min",
    tags: ["AI", "Python", "OCR", "Automation"],
  },
  {
    id: "remote-backend-lessons",
    title: "What 2 Years of Remote Backend Development Taught Me",
    excerpt:
      "Technical skills aside — the real lessons from working async with a US team: documentation, API contracts, ownership, and async communication.",
    date: "January 2025",
    readTime: "6 min",
    tags: ["Remote Work", "Career", "Backend"],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
