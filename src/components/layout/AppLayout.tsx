import { Outlet } from 'react-router-dom'

import { CookieConsent } from '@/components/marketing/CookieConsent'
import { Navbar } from '@/components/navigation'

export function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <CookieConsent />
    </>
  )
}
