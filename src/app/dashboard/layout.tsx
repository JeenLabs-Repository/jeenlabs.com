import { DashboardNavbar } from "@/features/landing/dashboard-navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardNavbar />
      <main className="flex min-h-0 flex-1 flex-col pt-[calc(4.5rem+env(safe-area-inset-top,0px))]">
        {children}
      </main>
    </>
  )
}
