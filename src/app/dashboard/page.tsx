import type { Metadata } from "next"

import { DashboardShell } from "@/features/dashboard/dashboard-shell"
import { requireSession } from "@/lib/auth-server"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your jeenlabs workspace.",
}

export default async function DashboardPage() {
  const session = await requireSession()

  return <DashboardShell user={session.user} />
}
