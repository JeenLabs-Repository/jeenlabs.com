export const ABOUT_MISSION = {
  title: "Our mission",
  paragraphs: [
    "JeenLabs builds automation, web products, and custom software for teams that need reliable delivery without agency theater.",
    "We start from the business constraint, choose the smallest sharp stack, and ship systems people actually run in production.",
  ],
  highlights: [
    "Automation that removes busywork, not judgment",
    "Web products with clear UX and durable architecture",
    "Custom software scoped to the real problem",
  ],
} as const;

export const ABOUT_VALUES = [
  {
    title: "Craft",
    description:
      "Interfaces and systems should feel deliberate — typed, tested, and calm under change.",
  },
  {
    title: "Clarity",
    description:
      "We write specs people can argue with, estimate honestly, and demos that show working paths.",
  },
  {
    title: "Pace",
    description:
      "Short loops, visible progress, and decisions that keep the critical path moving.",
  },
  {
    title: "Fit",
    description:
      "Freelance and per-project by design: right specialists, low overhead, no unused retainers.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    index: "01",
    title: "Brief",
    description:
      "Align on the constraint, users, and what “done” looks like. We cut scope that doesn’t move the outcome.",
  },
  {
    index: "02",
    title: "Shape",
    description:
      "Turn the brief into milestones, risks, and a stack you can operate — not a slide deck nobody owns.",
  },
  {
    index: "03",
    title: "Build",
    description:
      "Ship working slices on a weekly cadence. You see the product grow; surprises stay small.",
  },
  {
    index: "04",
    title: "Hand off",
    description:
      "Deploy, document, and leave your team with clear ownership — not a black box we alone can touch.",
  },
] as const;

export const CAPABILITIES = [
  {
    index: "01",
    title: "Product surfaces",
    description:
      "Marketing sites, dashboards, and app shells with performance and conversion in mind.",
    items: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    index: "02",
    title: "Systems & APIs",
    description:
      "Services, data models, and integrations that stay readable after the first release.",
    items: ["Node.js", "Python", "PostgreSQL", "Redis"],
  },
  {
    index: "03",
    title: "Automation",
    description:
      "Workflows that replace spreadsheet glue — queues, webhooks, sync jobs, and guarded scrapers.",
    items: ["APIs", "Queues", "Webhooks", "Scripts"],
  },
  {
    index: "04",
    title: "Delivery ops",
    description:
      "Containers, CI, and host setups so shipping is repeatable instead of a ceremony.",
    items: ["Docker", "CI", "VPS / Coolify", "Observability"],
  },
] as const;

export const FOCUS_AREAS = [
  {
    index: "01",
    title: "Ops-heavy teams",
    description:
      "People buried in copy-paste and spreadsheet reconciliations. We automate the path of least regret.",
  },
  {
    index: "02",
    title: "Founders shipping V1",
    description:
      "A first production surface that looks intentional and won’t collapse under the next set of features.",
  },
  {
    index: "03",
    title: "Internal tools",
    description:
      "Admin portals and workflow apps that staff actually enjoy using — not a dumped CRUD form.",
  },
] as const;

export const STATS = [
  { value: 3, suffix: "+", label: "Clients" },
  { value: 21, suffix: "+", label: "Projects shipped" },
  { value: 50, suffix: "K+", label: "Lines shipped" },
  { value: 98, suffix: "%", label: "Satisfaction" },
] as const;

export const TEAM = {
  title: "A studio assembled per engagement",
  paragraphs: [
    "JeenLabs runs freelance and per-project. We assemble the right mix of specialists for each engagement instead of staffing a fixed bench you pay to idle.",
    "The founder brings three years of dedicated freelancing and three years of industry work — enough range to lead delivery and still stay close to the code.",
    "Whether you need automation, a web product, or custom software, we keep communication tight and ship work you can operate day to day.",
  ],
  principles: [
    {
      title: "Direct access",
      description:
        "Talk to the people building it — no account-manager telephone game.",
    },
    {
      title: "Visible progress",
      description: "Weekly demos with working software, not status theatre.",
    },
    {
      title: "Operable handoff",
      description: "Docs, access, and ownership left clear when we step back.",
    },
  ],
} as const;

export const FAQ_ITEMS = [
  {
    question: "How do engagements usually start?",
    answer:
      "A short discovery call, then a written brief with scope, timeline, and price. If it isn’t a fit, we say so early.",
  },
  {
    question: "Fixed project or ongoing?",
    answer:
      "Both. Most work is milestone-priced. Some clients keep a light retainer for iteration after launch.",
  },
  {
    question: "Who writes the code?",
    answer:
      "Specialists on the engagement — often the founder for architecture and critical paths, with trusted collaborators when the load warrants it.",
  },
  {
    question: "Do you take over unfinished builds?",
    answer:
      "Yes, after a technical review. We’ll tell you what to keep, rewrite, or retire before more money burns.",
  },
  {
    question: "Where are you based?",
    answer:
      "Remote-first with roots in India. We work across time zones with async updates and scheduled live sessions.",
  },
  {
    question: "How fast can we start?",
    answer:
      "Often within one to two weeks of a signed brief, depending on current load. Urgent patches get a same-week triage.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "JeenLabs transformed our automation processes, reducing manual work by 70% and allowing our team to focus on strategic initiatives. Their expertise and dedication to our success was evident throughout the project.",
    name: "Sarah Johnson",
    company: "TechInnovate Solutions",
    service: "Automation",
  },
  {
    quote:
      "The e-commerce platform JeenLabs developed for us exceeded our expectations. Sales increased by 45% within three months, and the user experience feedback has been overwhelmingly positive.",
    name: "Michael Chen",
    company: "Global Retail Group",
    service: "Website",
  },
  {
    quote:
      "Working with JeenLabs on our software infrastructure was a game-changer. Their team's technical knowledge combined with their understanding of our business needs resulted in a solution that perfectly addressed our challenges.",
    name: "Emily Rodriguez",
    company: "FinServe Corporation",
    service: "Software",
  },
] as const;

export type WorkService = "All" | "Website" | "Software" | "Automation";

export const WORK_FILTERS: WorkService[] = [
  "All",
  "Website",
  "Software",
  "Automation",
];

export const WORK_ITEMS = [
  {
    title: "E-commerce platform",
    service: "Website" as const,
    description:
      "Custom online store with product filtering, accounts, and secure checkout.",
  },
  {
    title: "Inventory management",
    service: "Automation" as const,
    description:
      "Automated tracking that cut manual work by 85% and improved accuracy to 99.8%.",
  },
  {
    title: "Financial dashboard",
    service: "Software" as const,
    description:
      "Real-time analytics with customizable reports and data visualization.",
  },
  {
    title: "Patient portal",
    service: "Website" as const,
    description:
      "Secure scheduling, records access, and provider messaging for healthcare.",
  },
  {
    title: "Production automation",
    service: "Automation" as const,
    description:
      "End-to-end workflows that streamlined manufacturing and raised output by 40%.",
  },
  {
    title: "CRM integration",
    service: "Software" as const,
    description:
      "Custom CRM tied into existing tools, improving sales team efficiency by 65%.",
  },
] as const;
