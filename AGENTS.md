<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Structure

```
src/
├── app/                 # routes (page.tsx, layout.tsx)
├── features/landing/    # site UI (navbar, hero)
├── shared/              # brand, providers, hooks, utils
├── components/ui/       # shadcn primitives
└── styles/              # tokens, base, feature CSS
```

Add new product areas as `features/<name>/` and new routes under `app/` when needed (e.g. route groups for auth vs landing).
