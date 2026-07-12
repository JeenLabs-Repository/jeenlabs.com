import type { Route } from "next";

export const SERVICE_SLUGS = [
  "web-development",
  "software-development",
  "automation",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ProcessStep = {
  title: string;
  description: string;
};

export type ServiceOffering = {
  title: string;
  intro: string;
  items: readonly string[];
};

export type TechnologyGroup = {
  title: string;
  items: string;
};

export type ServiceContent = {
  slug: ServiceSlug;
  index: string;
  title: string;
  headline: string;
  heroSubtitle: string;
  description: string;
  whyTitle: string;
  whySummary: string;
  processTitle: string;
  processIntro: string;
  processSteps: readonly ProcessStep[];
  offerings: readonly ServiceOffering[];
  technologies?: readonly TechnologyGroup[];
  technologiesIntro?: string;
  ctaTitle: string;
  ctaDescription: string;
  tags: readonly string[];
};

export const SERVICES_CONTENT: Record<ServiceSlug, ServiceContent> = {
  "web-development": {
    slug: "web-development",
    index: "01",
    title: "Website",
    headline: "Web development",
    heroSubtitle:
      "Marketing sites, product surfaces, and content systems built for clarity, speed, and conversion.",
    description:
      "Responsive websites and web apps that make the product easy to understand and easy to buy.",
    whyTitle: "Why work with us on the web",
    whySummary:
      "We design and ship sites that look sharp and behave under load — clear IA, measured performance, and CMS or app wiring that your team can own.",
    processTitle: "How we build",
    processIntro:
      "A tight loop from discovery to launch so the site matches the business goal:",
    processSteps: [
      {
        title: "Discovery",
        description:
          "We start by understanding your business, target audience, and goals to create a website strategy that aligns with your objectives.",
      },
      {
        title: "Planning",
        description:
          "We create a detailed project plan, including sitemap, wireframes, and content strategy to guide the development process.",
      },
      {
        title: "Design",
        description:
          "Our designers create visually appealing mockups that reflect your brand identity and provide an optimal user experience.",
      },
      {
        title: "Development",
        description:
          "Our developers build your website using clean, efficient code and the latest technologies to ensure optimal performance.",
      },
      {
        title: "Testing",
        description:
          "We thoroughly test your website across different devices and browsers to ensure it works flawlessly for all users.",
      },
      {
        title: "Launch & support",
        description:
          "We deploy your website and provide ongoing support and maintenance to ensure it continues to perform optimally.",
      },
    ],
    offerings: [
      {
        title: "Portfolio websites",
        intro: "Showcase your work with a professional portfolio:",
        items: [
          "Personal and professional portfolios",
          "Creative showcases",
          "Interactive galleries",
          "Resume and CV websites",
          "Personal branding sites",
        ],
      },
      {
        title: "E-commerce solutions",
        intro: "Sell your products online with our e-commerce solutions:",
        items: [
          "Online stores and marketplaces",
          "Shopping cart and checkout systems",
          "Payment gateway integration",
          "Inventory management",
          "Order processing and fulfillment",
        ],
      },
      {
        title: "Interactive web applications",
        intro: "Create dynamic web applications:",
        items: [
          "Single-page applications (SPAs)",
          "Progressive web apps (PWAs)",
          "Interactive dashboards",
          "Web-based tools and calculators",
          "Custom web applications",
        ],
      },
    ],
    technologiesIntro:
      "Stacks we use when they fit the problem — not a fixed menu.",
    technologies: [
      {
        title: "Frontend",
        items: "React, Vue.js, Angular, Next.js, HTML5, CSS3, JavaScript, TypeScript",
      },
      {
        title: "Backend",
        items: "Node.js, Express, Django, Ruby on Rails, PHP, Laravel, ASP.NET",
      },
      {
        title: "Databases",
        items: "MongoDB, MySQL, PostgreSQL, Firebase, Redis, SQLite",
      },
      {
        title: "CMS",
        items: "WordPress, Shopify, Magento, Drupal, Contentful, Strapi",
      },
    ],
    ctaTitle: "Need a site that ships?",
    ctaDescription:
      "Share the audience, the offer, and the deadline — we will reply with a clear next step.",
    tags: ["Next.js", "Design systems", "Performance"],
  },
  "software-development": {
    slug: "software-development",
    index: "02",
    title: "Software",
    headline: "Software development",
    heroSubtitle:
      "Custom tools, APIs, and internal products shaped around the workflow you already run.",
    description:
      "Software scoped to a real bottleneck — built to integrate, operate, and grow with the team.",
    whyTitle: "Why build custom software with us",
    whySummary:
      "We turn fuzzy requirements into typed systems: clear architecture, short demos, and code your team can maintain after handoff.",
    processTitle: "How we deliver",
    processIntro:
      "An iterative path that keeps the critical path visible:",
    processSteps: [
      {
        title: "Requirements analysis",
        description:
          "We work closely with you to understand your business needs, challenges, and goals to define clear requirements for your software solution.",
      },
      {
        title: "Design & architecture",
        description:
          "Our architects design a robust and scalable software architecture that serves as the foundation for your solution.",
      },
      {
        title: "Iterative development",
        description:
          "We develop your software in short, iterative cycles, delivering working features that you can review and provide feedback on.",
      },
      {
        title: "Quality assurance",
        description:
          "Our QA team rigorously tests each feature to ensure it meets the highest quality standards and functions as expected.",
      },
      {
        title: "Deployment & integration",
        description:
          "We deploy your software and ensure it integrates seamlessly with your existing systems and workflows.",
      },
      {
        title: "Maintenance & support",
        description:
          "We provide ongoing maintenance and support to ensure your software continues to perform optimally and evolves with your business needs.",
      },
    ],
    offerings: [
      {
        title: "API development",
        intro: "Connect your systems and applications:",
        items: [
          "RESTful API design and development",
          "GraphQL APIs",
          "API integration services",
          "API documentation",
          "API security and authentication",
        ],
      },
      {
        title: "Database solutions",
        intro: "Manage your data effectively:",
        items: [
          "Database design and modeling",
          "SQL and NoSQL database development",
          "Data migration and integration",
          "Database optimization",
          "Data warehousing",
        ],
      },
      {
        title: "Authentication systems",
        intro: "Secure access for your users and teams:",
        items: [
          "User authentication and authorization",
          "Single sign-on (SSO) solutions",
          "Multi-factor authentication",
          "OAuth and OpenID Connect",
          "Role-based access control",
        ],
      },
      {
        title: "Desktop applications",
        intro: "Build powerful desktop software:",
        items: [
          "Cross-platform desktop applications",
          "Windows-specific applications",
          "macOS applications",
          "Linux applications",
          "Electron-based applications",
        ],
      },
    ],
    technologiesIntro:
      "We pick languages and platforms to match the operational constraint.",
    technologies: [
      {
        title: "Languages",
        items: "Python, JavaScript, TypeScript, Java, C#, C++, Go, Ruby",
      },
      {
        title: "Frameworks",
        items: "Node.js, Django, .NET, Spring Boot, Flask, Express, Laravel",
      },
      {
        title: "Databases",
        items: "PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch, SQL Server",
      },
      {
        title: "Cloud",
        items: "AWS, Azure, Google Cloud, Docker, Kubernetes, Serverless",
      },
    ],
    ctaTitle: "Have a workflow that needs software?",
    ctaDescription:
      "Describe the users, the pain, and what already exists — we will outline a build path.",
    tags: ["Full-stack", "APIs", "Cloud"],
  },
  automation: {
    slug: "automation",
    index: "03",
    title: "Automation",
    headline: "Automation",
    heroSubtitle:
      "Replace fragile manual steps with pipelines your team can trust every day.",
    description:
      "Automation that cuts busywork, reduces error, and leaves humans on judgment calls.",
    whyTitle: "Why automate with JeenLabs",
    whySummary:
      "We map the real process first, then automate the repeatable parts — with logging, retries, and handoffs your operators understand.",
    processTitle: "How we approach it",
    processIntro:
      "A practical sequence from audit to handoff:",
    processSteps: [
      {
        title: "Analysis",
        description:
          "We thoroughly analyze your current processes, identifying bottlenecks, repetitive tasks, and opportunities for automation.",
      },
      {
        title: "Design",
        description:
          "Our team designs a custom automation solution that addresses your specific needs and integrates seamlessly with your existing systems.",
      },
      {
        title: "Development",
        description:
          "We develop the automation solution using the most appropriate technologies and tools for your specific requirements.",
      },
      {
        title: "Testing",
        description:
          "We rigorously test the automation solution to ensure it works flawlessly and handles all possible scenarios.",
      },
      {
        title: "Implementation",
        description:
          "We implement the solution in your environment, providing training and support to ensure a smooth transition.",
      },
    ],
    offerings: [
      {
        title: "Excel automation",
        intro: "Automate your Excel workflows:",
        items: [
          "Custom Excel macros and VBA scripts",
          "Data processing and analysis automation",
          "Report generation and formatting",
          "Excel to database integration",
          "Complex calculations and formulas",
        ],
      },
      {
        title: "Web automation",
        intro: "Automate your web-based tasks:",
        items: [
          "Web scraping and data extraction",
          "Form filling and submission",
          "Browser automation",
          "Scheduled web tasks",
          "API integration and automation",
        ],
      },
      {
        title: "Desktop automation",
        intro: "Automate your desktop applications:",
        items: [
          "GUI automation",
          "File and folder management",
          "System task automation",
          "Batch processing",
          "Cross-application workflows",
        ],
      },
    ],
    ctaTitle: "Ready to cut the busywork?",
    ctaDescription:
      "Tell us which process burns the most time — we will propose what to automate first.",
    tags: ["Integrations", "Pipelines", "AI-assisted"],
  },
};

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return SERVICE_SLUGS.includes(slug as ServiceSlug);
}

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  if (!isServiceSlug(slug)) return undefined;
  return SERVICES_CONTENT[slug];
}

export function getOtherServices(slug: ServiceSlug): ServiceContent[] {
  return SERVICE_SLUGS.filter((s) => s !== slug).map((s) => SERVICES_CONTENT[s]);
}

export function serviceHref(slug: ServiceSlug): Route {
  return `/services/${slug}` as Route;
}
