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
      "Create a stunning online presence with comprehensive web development solutions tailored to your business needs.",
    description:
      "Responsive, user-friendly websites that help businesses establish a strong online presence and connect with their audience.",
    whyTitle: "Why choose our web development services?",
    whySummary:
      "At JeenLabs, we create websites that not only look stunning but also deliver results. Our web development team combines technical expertise with creative design to build websites that engage visitors, drive conversions, and grow your business.",
    processTitle: "Our development process",
    processIntro:
      "We follow a comprehensive development process to ensure your website meets your business objectives:",
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
      "We leverage the latest web technologies to build fast, secure, and scalable websites and applications.",
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
    ctaTitle: "Ready to build your dream website?",
    ctaDescription:
      "Contact us today to discuss your web development project and how we can help you create a stunning online presence.",
    tags: ["Next.js", "Design systems", "Performance"],
  },
  "software-development": {
    slug: "software-development",
    index: "02",
    title: "Software",
    headline: "Software development",
    heroSubtitle:
      "Power your business with custom software solutions designed to address your specific challenges and drive growth.",
    description:
      "Custom solutions designed to address specific challenges, improve efficiency, and drive growth through innovative technology.",
    whyTitle: "Why choose our software development services?",
    whySummary:
      "At JeenLabs, we develop custom software solutions that help businesses streamline operations, improve efficiency, and gain a competitive edge. Our team of experienced developers combines technical expertise with business acumen to deliver software that meets your specific needs.",
    processTitle: "Our development methodology",
    processIntro:
      "We follow an agile development methodology that ensures transparency, flexibility, and quality throughout the development process:",
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
      "We leverage a wide range of technologies to build robust, scalable, and secure software solutions.",
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
    ctaTitle: "Ready to transform your business with custom software?",
    ctaDescription:
      "Contact us today to discuss your software development needs and how we can help you build a solution that drives your business forward.",
    tags: ["Full-stack", "APIs", "Cloud"],
  },
  automation: {
    slug: "automation",
    index: "03",
    title: "Automation",
    headline: "Automation",
    heroSubtitle:
      "Streamline your business processes, reduce manual work, and increase productivity with comprehensive automation solutions.",
    description:
      "Custom automation that streamlines repetitive tasks, reduces human error, and increases productivity.",
    whyTitle: "Why choose our automation services?",
    whySummary:
      "At JeenLabs, we specialize in creating custom automation solutions that transform manual, time-consuming processes into efficient, error-free workflows. Our automation experts analyze your business needs and develop tailored solutions that deliver measurable results.",
    processTitle: "Our approach",
    processIntro:
      "We follow a systematic approach to automation that ensures optimal results:",
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
    ctaTitle: "Ready to automate your business?",
    ctaDescription:
      "Contact us today to discuss how our automation solutions can help your business save time, reduce costs, and improve efficiency.",
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
