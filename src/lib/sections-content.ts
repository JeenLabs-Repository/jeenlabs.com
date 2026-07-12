export const ABOUT_MISSION = {
  title: "Our mission",
  paragraphs: [
    "At JeenLabs, our mission is to unlock the possibilities of tomorrow by delivering cutting-edge automation and development solutions that empower businesses to thrive in the digital landscape.",
    "We combine technical expertise with a deep understanding of business needs to create solutions that drive real value and growth for our clients.",
  ],
  highlights: [
    "Innovative solutions for complex challenges",
    "Client-focused approach to every project",
    "Commitment to quality and excellence",
  ],
} as const;

export const ABOUT_VALUES = [
  {
    title: "Innovation",
    description:
      "We embrace the latest technologies and methodologies to deliver innovative solutions that give our clients a competitive edge.",
  },
  {
    title: "Collaboration",
    description:
      "We work closely with our clients, fostering partnerships based on trust, transparency, and mutual respect.",
  },
  {
    title: "Quality",
    description:
      "We are committed to delivering solutions of the highest quality, with attention to detail and a focus on excellence.",
  },
  {
    title: "Growth",
    description:
      "We are dedicated to continuous learning and improvement, staying at the forefront of technology to drive growth for our clients.",
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
    "JeenLabs operates on a freelance and per-project basis, bringing together the right talent for each engagement. Our founder has 3 years of dedicated freelancing experience combined with 3 years of industry experience.",
    "We've built a diverse network of talented students and experienced professionals who collaborate to deliver exceptional results. This flexible structure lets us assemble the right specialists for each job without unnecessary overhead.",
    "Whether you need automation, web development, or custom software, we bring together the right skills, communicate clearly, and ship high-quality work.",
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

export const CTA = {
  description:
    "Partner with JeenLabs to unlock the full potential of your business through innovative automation and development solutions. Let's build the future together.",
} as const;
