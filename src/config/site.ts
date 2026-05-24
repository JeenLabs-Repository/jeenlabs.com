export const SITE_URL = 'https://jeenlabs.com'

export type PageSeo = {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
}

export type SiteRoute = PageSeo & {
  label: string
  menuLabel: string
}

const KEYWORDS = [
  'automation',
  'software development',
  'website development',
  'JeenLabs',
  'business technology',
] as const

export const SITE_ROUTES = {
  home: {
    path: '/',
    label: 'Home',
    menuLabel: 'home',
    title: 'JeenLabs | Cutting-Edge Automation & Software Development',
    description:
      'Revolutionizing technology with automation, custom software, and website development for modern businesses.',
    keywords: [...KEYWORDS],
  },
  services: {
    path: '/services',
    label: 'Services',
    menuLabel: 'services',
    title: 'Services | JeenLabs',
    description:
      'Automation solutions, software development, and website development tailored to your business goals.',
    keywords: [...KEYWORDS],
  },
  automation: {
    path: '/automation',
    label: 'Automation',
    menuLabel: 'automation',
    title: 'Automation Solutions | JeenLabs',
    description:
      'Optimize operations with workflow automation, integrations, and intelligent tooling built for scale.',
    keywords: [...KEYWORDS, 'workflow automation'],
  },
  softwareDevelopment: {
    path: '/software-development',
    label: 'Software Development',
    menuLabel: 'software',
    title: 'Software Development | JeenLabs',
    description:
      'Tailored software for your business — from internal tools to customer-facing products.',
    keywords: [...KEYWORDS, 'custom software'],
  },
  websiteDevelopment: {
    path: '/website-development',
    label: 'Website Development',
    menuLabel: 'websites',
    title: 'Website Development | JeenLabs',
    description:
      'Create a professional online presence with fast, accessible, conversion-focused websites.',
    keywords: [...KEYWORDS, 'web design'],
  },
  aboutUs: {
    path: '/about-us',
    label: 'About Us',
    menuLabel: 'about',
    title: 'About Us | JeenLabs',
    description:
      'Our journey, team, and values — building thoughtful technology with craft and integrity.',
    keywords: [...KEYWORDS],
  },
  missionStatement: {
    path: '/mission-statement',
    label: 'Mission Statement',
    menuLabel: 'mission',
    title: 'Mission Statement | JeenLabs',
    description:
      'Driving innovation with integrity — our mission to ship useful, reliable digital products.',
    keywords: [...KEYWORDS],
  },
  careers: {
    path: '/careers',
    label: 'Careers',
    menuLabel: 'careers',
    title: 'Careers | JeenLabs',
    description:
      'Current open positions and FAQs for engineers, designers, and builders who care about craft.',
    keywords: [...KEYWORDS, 'jobs'],
  },
  blog: {
    path: '/blog',
    label: 'Blog',
    menuLabel: 'blog',
    title: 'Blog | JeenLabs',
    description:
      'Latest articles on automation, software development, and shipping products that matter.',
    keywords: [...KEYWORDS, 'tech blog'],
  },
  contactUs: {
    path: '/contact-us',
    label: 'Contact Us',
    menuLabel: 'contact',
    title: 'Contact Us | JeenLabs',
    description:
      'Send us a message — tell us about your project, timeline, and goals. We respond within one business day.',
    keywords: [...KEYWORDS],
  },
  ourClients: {
    path: '/our-clients',
    label: 'Our Clients',
    menuLabel: 'clients',
    title: 'Our Clients | JeenLabs',
    description:
      'Partners, success stories, and testimonials from teams we have helped ship and scale.',
    keywords: [...KEYWORDS],
  },
  faqs: {
    path: '/faqs',
    label: 'FAQs',
    menuLabel: 'faqs',
    title: 'FAQs | JeenLabs',
    description:
      'Quick answers about working with JeenLabs — process, pricing, timelines, and support.',
    keywords: [...KEYWORDS],
  },
  pricing: {
    path: '/pricing',
    label: 'Pricing',
    menuLabel: 'pricing',
    title: 'Pricing | JeenLabs',
    description:
      'Affordable solutions for every need — transparent plans and custom quotes for your project.',
    keywords: [...KEYWORDS, 'pricing'],
  },
  privacyPolicy: {
    path: '/privacy-policy',
    label: 'Privacy Policy',
    menuLabel: 'privacy',
    title: 'Privacy Policy | JeenLabs',
    description:
      'Your privacy matters — how JeenLabs collects, uses, and protects your personal data.',
    keywords: [...KEYWORDS],
  },
  termsOfService: {
    path: '/terms-of-service',
    label: 'Terms of Service',
    menuLabel: 'terms',
    title: 'Terms of Service | JeenLabs',
    description:
      'Service terms and conditions for using JeenLabs products, website, and professional services.',
    keywords: [...KEYWORDS],
  },
  cookies: {
    path: '/cookies',
    label: 'Cookies',
    menuLabel: 'cookies',
    title: 'Cookies',
    description: '',
    keywords: [...KEYWORDS],
  },
  notFound: {
    path: '/404-error',
    label: '404 Error',
    menuLabel: '404',
    title: '404 Error',
    description: '',
    noIndex: true,
    keywords: [...KEYWORDS],
  },
} as const satisfies Record<string, SiteRoute>

export const PUBLIC_PAGE_ROUTES = Object.values(SITE_ROUTES).filter(
  (route) => route.path !== SITE_ROUTES.notFound.path && !('noIndex' in route && route.noIndex),
)

export const NAV_MENU_ROUTES = [
  SITE_ROUTES.home,
  SITE_ROUTES.services,
  SITE_ROUTES.automation,
  SITE_ROUTES.softwareDevelopment,
  SITE_ROUTES.websiteDevelopment,
  SITE_ROUTES.aboutUs,
  SITE_ROUTES.missionStatement,
  SITE_ROUTES.careers,
  SITE_ROUTES.blog,
  SITE_ROUTES.contactUs,
  SITE_ROUTES.ourClients,
  SITE_ROUTES.faqs,
  SITE_ROUTES.pricing,
  SITE_ROUTES.privacyPolicy,
  SITE_ROUTES.termsOfService,
  SITE_ROUTES.cookies,
  SITE_ROUTES.notFound,
] as const
