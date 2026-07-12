# Coolify deployment (Docker + Git push auto-deploy)

This app is a single Next.js site. Production runs as a **standalone** Node server inside Docker. Coolify rebuilds that image on every push to the connected branch.

---

## What Coolify needs

| Setting | Value |
|---------|--------|
| Build pack | **Dockerfile** |
| Base directory / context | repository root (`.` / `/`) |
| Dockerfile path | `Dockerfile` |
| Exposed port | **3000** |
| Start command | image default (`node server.js`) — do not override |

The container binds to `0.0.0.0:3000` so Coolify’s reverse proxy can reach it.

---

## One-time: connect Git for auto-deploy

1. In Coolify open **Sources → Add → GitHub App** (preferred).
2. Create / authorize the app and grant it access to this repository.
3. Coolify installs a **push webhook** on the repo. That is what triggers deploys.

Alternative: Personal Access Token + manual webhook from the app’s **Webhooks** page (GitHub → Settings → Webhooks → push events, `application/json`).

---

## Create the application

1. **New Resource → Application**.
2. Choose your GitHub source → this repository.
3. Branch to deploy (for example `main`, or `jeenlabs-dev` while testing).
4. Leave **Auto Deploy** enabled for that branch.

### Build pack

- Select **Dockerfile**
- Dockerfile: `Dockerfile`
- Context: `/`

### Port

- **Ports Exposes:** `3000`

### Health check (recommended)

- Path: `/`
- Port: `3000`  
  Prevents Coolify from routing traffic before Next.js is ready.

### Domains

Add your domain(s), then enable HTTPS after DNS A records point at the VPS.

---

## Environment variables

Set these in Coolify → **Environment**.

`NEXT_PUBLIC_*` values are compiled into the client bundle. After changing them, trigger a **rebuild** (not only a restart).

| Variable | Required | Notes |
|----------|----------|--------|
| `NODE_ENV` | yes | `production` |
| `PORT` | optional | defaults to `3000` in the image |
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | canonical site URL, no trailing slash |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | no | GA4 id |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | no | Search Console token |

Example:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://jeenlabs.com
```

In Coolify, ensure public vars are available during the **build** step (build args / build-time env), because Next inlines them when `npm run build` runs.

---

## Auto-deploy flow

```
git push → GitHub webhook → Coolify clones branch
         → docker build (Dockerfile)
         → new container on :3000
         → proxy + TLS reload
```

No GitHub Actions required when the Coolify GitHub App is installed.

---

## Local smoke test

```bash
docker build -t jeenlabs \
  --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  .

docker run --rm -p 3000:3000 jeenlabs
```

Open `http://localhost:3000`.

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| Push does nothing | GitHub App install, Auto Deploy branch, Webhooks delivery |
| 502 from domain | App listening on `3000`, `HOSTNAME=0.0.0.0`, health check |
| Wrong SEO / OG URLs | `NEXT_PUBLIC_SITE_URL` then **rebuild** |
| Static files 404 | Confirm `output: "standalone"` and image includes `.next/static` |
| Build OOM | Raise Coolify / VPS memory, or enable Coolify build server if available |
