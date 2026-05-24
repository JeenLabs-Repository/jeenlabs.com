import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Bot,
  Code2,
  Globe,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SectionContainer({
  children,
  className,
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        'mx-auto w-full max-w-[75rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8',
        className,
      )}
    >
      {children}
    </section>
  )
}

export function TextWide({
  eyebrow,
  title,
  children,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  children: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <SectionContainer>
      <div
        className={cn(
          'max-w-3xl space-y-4',
          align === 'center' && 'mx-auto text-center',
        )}
      >
        {eyebrow ? (
          <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-brand uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-sans text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </SectionContainer>
  )
}

export function TextButtonCenter({
  title,
  description,
  buttonLabel,
  buttonTo,
}: {
  title: string
  description: string
  buttonLabel: string
  buttonTo: string
}) {
  return (
    <SectionContainer className="text-center">
      <div className="mx-auto max-w-2xl space-y-6">
        <h2 className="font-sans text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
          {title}
        </h2>
        <p className="leading-relaxed text-muted-foreground">{description}</p>
        <Button
          asChild
          size="lg"
          className="h-12 bg-brand px-8 text-white hover:bg-brand/90 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
        >
          <Link to={buttonTo}>
            {buttonLabel}
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </SectionContainer>
  )
}

export function PlaceholderImage({
  label,
  aspect = 'video',
  className,
}: {
  label: string
  aspect?: 'video' | 'square' | 'portrait'
  className?: string
}) {
  const aspectClass =
    aspect === 'square'
      ? 'aspect-square'
      : aspect === 'portrait'
        ? 'aspect-[4/5]'
        : 'aspect-video'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-border bg-muted/40',
        aspectClass,
        className,
      )}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand/5" />
      <span className="absolute inset-0 flex items-center justify-center p-6 text-center font-mono text-xs tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}

export function HeroCarousel({ slides }: { slides: { title: string; subtitle: string }[] }) {
  return (
    <SectionContainer className="pb-8 pt-4 md:pb-12">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slides.map((slide) => (
          <article
            key={slide.title}
            className="min-w-[85%] shrink-0 snap-center overflow-hidden rounded-xl border border-border bg-card shadow-sm sm:min-w-[70%] lg:min-w-[55%]"
          >
            <PlaceholderImage label="Hero editorial visual" aspect="video" className="rounded-none border-0" />
            <div className="space-y-2 p-6 md:p-8">
              <h2 className="text-2xl font-black tracking-tight uppercase sm:text-3xl">
                {slide.title}
              </h2>
              <p className="text-muted-foreground">{slide.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionContainer>
  )
}

const DEFAULT_ICONS: LucideIcon[] = [Bot, Code2, Globe, Workflow, Zap, Sparkles]

export function FeaturesInline({
  title,
  items,
}: {
  title?: string
  items: { title: string; description: string; icon?: LucideIcon }[]
}) {
  return (
    <SectionContainer>
      {title ? (
        <h2 className="mb-10 font-sans text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
          {title}
        </h2>
      ) : null}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = item.icon ?? DEFAULT_ICONS[index % DEFAULT_ICONS.length]
          return (
            <article
              key={item.title}
              className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Icon className="mb-4 size-6 text-brand" aria-hidden />
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          )
        })}
      </div>
    </SectionContainer>
  )
}

export function ThreeColText({
  columns,
}: {
  columns: { title: string; body: string }[]
}) {
  return (
    <SectionContainer>
      <div className="grid gap-8 md:grid-cols-3">
        {columns.map((col) => (
          <article key={col.title} className="space-y-3">
            <h3 className="text-lg font-bold tracking-wide text-foreground uppercase">
              {col.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{col.body}</p>
          </article>
        ))}
      </div>
    </SectionContainer>
  )
}

export function ImageTextSplit({
  title,
  children,
  imageLabel,
  imagePosition = 'left',
  action,
}: {
  title: string
  children: ReactNode
  imageLabel: string
  imagePosition?: 'left' | 'right'
  action?: ReactNode
}) {
  const image = <PlaceholderImage label={imageLabel} aspect="video" />
  const text = (
    <div className="flex flex-col justify-center space-y-4">
      <h2 className="font-sans text-2xl font-black tracking-tight text-foreground uppercase sm:text-3xl">
        {title}
      </h2>
      <div className="space-y-3 leading-relaxed text-muted-foreground">{children}</div>
      {action}
    </div>
  )

  return (
    <SectionContainer>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {imagePosition === 'left' ? (
          <>
            {image}
            {text}
          </>
        ) : (
          <>
            {text}
            {image}
          </>
        )}
      </div>
    </SectionContainer>
  )
}

export function FaqAccordion({
  title,
  items,
}: {
  title?: string
  items: { question: string; answer: string }[]
}) {
  return (
    <SectionContainer>
      {title ? (
        <h2 className="mb-8 font-sans text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
          {title}
        </h2>
      ) : null}
      <div className="divide-y divide-border rounded-lg border border-border">
        {items.map((item) => (
          <details key={item.question} className="group px-5 py-4">
            <summary className="cursor-pointer list-none font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="text-brand transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionContainer>
  )
}

export function PricingPlans({
  plans,
}: {
  plans: {
    name: string
    price: string
    description: string
    features: string[]
    highlighted?: boolean
  }[]
}) {
  return (
    <SectionContainer>
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              'rounded-lg border bg-card p-8 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
              plan.highlighted ? 'border-brand ring-1 ring-brand/30' : 'border-border',
            )}
          >
            <h3 className="font-bold tracking-wide uppercase">{plan.name}</h3>
            <p className="mt-2 text-3xl font-black text-brand">{plan.price}</p>
            <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="text-brand">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionContainer>
  )
}

export function TeamGrid({
  title,
  members,
}: {
  title: string
  members: { name: string; role: string }[]
}) {
  return (
    <SectionContainer>
      <h2 className="mb-10 font-sans text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
        {title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <article key={member.name} className="rounded-lg border border-border bg-card p-6 text-center shadow-sm">
            <PlaceholderImage label={`${member.name} portrait`} aspect="square" className="mx-auto mb-4 max-w-[180px]" />
            <h3 className="font-semibold text-foreground">{member.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
          </article>
        ))}
      </div>
    </SectionContainer>
  )
}

export function BlogGrid({
  title,
  posts,
}: {
  title: string
  posts: { title: string; excerpt: string; category: string }[]
}) {
  return (
    <SectionContainer>
      <h2 className="mb-10 font-sans text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
        {title}
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <PlaceholderImage label="Blog cover" aspect="video" className="rounded-none border-0 border-b" />
            <div className="space-y-2 p-5">
              <p className="font-mono text-[10px] tracking-widest text-brand uppercase">{post.category}</p>
              <h3 className="font-semibold text-foreground group-hover:text-brand">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionContainer>
  )
}

export function LogoGrid({ title, logos }: { title: string; logos: string[] }) {
  return (
    <SectionContainer>
      <h2 className="mb-10 text-center font-sans text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex h-24 items-center justify-center rounded-lg border border-border bg-muted/30 px-4 text-center text-sm font-medium text-muted-foreground"
          >
            {logo}
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}

export function QuoteBlock({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SectionContainer>
      <blockquote className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-8 text-center shadow-sm md:p-12">
        <p className="text-xl leading-relaxed text-foreground md:text-2xl">&ldquo;{quote}&rdquo;</p>
        <footer className="mt-6 text-sm text-muted-foreground">
          <strong className="text-foreground">{author}</strong> — {role}
        </footer>
      </blockquote>
    </SectionContainer>
  )
}

export function BulletListSection({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <SectionContainer>
      <h2 className="mb-6 font-sans text-2xl font-black tracking-tight text-foreground uppercase sm:text-3xl">
        {title}
      </h2>
      <ul className="list-disc space-y-3 pl-5 leading-relaxed text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </SectionContainer>
  )
}

export function MapWide({ title }: { title: string }) {
  return (
    <SectionContainer>
      <h2 className="mb-6 font-sans text-2xl font-black tracking-tight text-foreground uppercase sm:text-3xl">
        {title}
      </h2>
      <div
        className="flex aspect-[21/9] items-center justify-center rounded-lg border border-border bg-muted/30 text-sm text-muted-foreground"
        role="img"
        aria-label="Map placeholder showing studio location"
      >
        Map embed — connect Google Maps in production
      </div>
    </SectionContainer>
  )
}

export function ContactFormSection({
  title,
  sideContent,
}: {
  title: string
  sideContent?: ReactNode
}) {
  return (
    <SectionContainer>
      <div className="grid gap-10 lg:grid-cols-2">
        <form className="space-y-4" aria-label="Contact form" noValidate>
          <h2 className="font-sans text-2xl font-black tracking-tight text-foreground uppercase sm:text-3xl">
            {title}
          </h2>
          <div className="space-y-2">
            <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <Button type="button" className="h-11 bg-brand px-6 text-white hover:bg-brand/90">
            Send message
          </Button>
        </form>
        {sideContent ? (
          <div className="flex flex-col justify-center space-y-4 leading-relaxed text-muted-foreground">
            {sideContent}
          </div>
        ) : null}
      </div>
    </SectionContainer>
  )
}

export function PaginationArrows({
  sections,
}: {
  sections: { id: string; label: string }[]
}) {
  return (
    <SectionContainer>
      <nav aria-label="Page sections" className="flex flex-wrap gap-3">
        {sections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            <span className="font-mono text-xs text-brand">{String(index + 1).padStart(2, '0')}</span>
            {section.label}
          </a>
        ))}
      </nav>
    </SectionContainer>
  )
}
