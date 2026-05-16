import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  })
}

export async function requireSession() {
  const session = await getServerSession()
  if (!session) {
    redirect("/sign-in?callbackUrl=/dashboard")
  }
  return session
}

export async function redirectIfAuthenticated(
  destination = "/dashboard",
) {
  const session = await getServerSession()
  if (session) {
    redirect(destination)
  }
}
