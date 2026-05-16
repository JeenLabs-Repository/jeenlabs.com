"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export function DashboardSignOut() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSignOut() {
    setLoading(true)
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
          router.refresh()
        },
      },
    })
    setLoading(false)
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="h-10 rounded-xl"
      disabled={loading}
      onClick={onSignOut}
    >
      {loading ? "Signing out…" : "Sign out"}
    </Button>
  )
}
