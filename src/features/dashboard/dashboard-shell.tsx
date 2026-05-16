import { DashboardSignOut } from "@/features/dashboard/dashboard-sign-out"
import { BrandLogo } from "@/shared/components/brand/logo"

type DashboardUser = {
  name: string
  email: string
  image?: string | null
}

export function DashboardShell({ user }: { user: DashboardUser }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-10 md:px-10 md:py-14">
      <header className="flex flex-col gap-6 border-b border-border/60 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <BrandLogo size="md" />
          <div>
            <p className="text-muted-foreground text-sm">Signed in as</p>
            <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              {user.name}
            </h1>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>
        <DashboardSignOut />
      </header>

      <section className="rounded-2xl border border-border/70 bg-muted/20 p-6 md:p-8">
        <h2 className="font-heading text-lg font-semibold">Workspace</h2>
        <p className="mt-2 max-w-prose text-muted-foreground text-sm leading-relaxed">
          Your session is active. Project tools and client updates will live here
          as we ship the product surface.
        </p>
      </section>
    </div>
  )
}
