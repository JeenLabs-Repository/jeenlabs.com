import type { Metadata } from "next"

import { redirectIfAuthenticated } from "@/lib/auth-server"

export const metadata: Metadata = {
  title: {
    template: "%s · jeenlabs",
    default: "Account · jeenlabs",
  },
}

export default async function AuthRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await redirectIfAuthenticated()
  return children
}
