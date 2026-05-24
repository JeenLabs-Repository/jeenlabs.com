import { Navigate, createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/components/layout/AppLayout'
import { AboutUsPage } from '@/pages/about-us/AboutUsPage'
import { AutomationPage } from '@/pages/automation/AutomationPage'
import { BlogPage } from '@/pages/blog/BlogPage'
import { CareersPage } from '@/pages/careers/CareersPage'
import { ContactUsPage } from '@/pages/contact-us/ContactUsPage'
import { CookiesPage } from '@/pages/cookies/CookiesPage'
import { FaqsPage } from '@/pages/faqs/FaqsPage'
import { Homepage } from '@/pages/homepage/Homepage'
import { MissionStatementPage } from '@/pages/mission-statement/MissionStatementPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { OurClientsPage } from '@/pages/our-clients/OurClientsPage'
import { PricingPage } from '@/pages/pricing/PricingPage'
import { PrivacyPolicyPage } from '@/pages/privacy-policy/PrivacyPolicyPage'
import { ServicesPage } from '@/pages/services/ServicesPage'
import { SoftwareDevelopmentPage } from '@/pages/software-development/SoftwareDevelopmentPage'
import { TermsOfServicePage } from '@/pages/terms-of-service/TermsOfServicePage'
import { WebsiteDevelopmentPage } from '@/pages/website-development/WebsiteDevelopmentPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: '/home', element: <Navigate to="/" replace /> },
      { path: '/services', element: <ServicesPage /> },
      { path: '/automation', element: <AutomationPage /> },
      { path: '/software-development', element: <SoftwareDevelopmentPage /> },
      { path: '/website-development', element: <WebsiteDevelopmentPage /> },
      { path: '/about-us', element: <AboutUsPage /> },
      { path: '/mission-statement', element: <MissionStatementPage /> },
      { path: '/careers', element: <CareersPage /> },
      { path: '/blog', element: <BlogPage /> },
      { path: '/contact-us', element: <ContactUsPage /> },
      { path: '/our-clients', element: <OurClientsPage /> },
      { path: '/faqs', element: <FaqsPage /> },
      { path: '/pricing', element: <PricingPage /> },
      { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
      { path: '/terms-of-service', element: <TermsOfServicePage /> },
      { path: '/cookies', element: <CookiesPage /> },
      { path: '/404-error', element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
