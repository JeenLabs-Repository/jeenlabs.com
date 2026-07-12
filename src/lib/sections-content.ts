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

export const STATS = [
  { value: 3, suffix: "+", label: "Clients served" },
  { value: 21, suffix: "+", label: "Projects completed" },
  { value: 50, suffix: "K+", label: "Lines of code written" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
] as const;

export const TEAM = {
  title: "How we work",
  paragraphs: [
    "JeenLabs runs freelance and per-project. We assemble the right mix of specialists for each engagement instead of staffing a fixed bench.",
    "The founder brings three years of dedicated freelancing and three years of industry work — enough range to lead delivery and still stay close to the code.",
    "Whether you need automation, a web product, or custom software, we keep communication tight and ship work you can operate.",
  ],
} as const;

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
