# GasConnect Hub

A Vite + React application configured to deploy as a Netlify site with Netlify Functions for server-side Supabase and Resend integration.

## Features

- Single-page React app with TanStack Router
- Dynamic CMS page content loaded from a Supabase backend
- Contact form submission stored in Supabase and emailed via Resend
- EN/RU language switcher
- SEO metadata updated at runtime
- Netlify Functions backend in `netlify/functions/api.js`
- Netlify publish output to `frontend/dist`

## Project structure

- `src/` - React app source
- `src/main.tsx` - app entry
- `src/router.tsx` - TanStack Router setup
- `src/routes/__root.tsx` - root route wrapper
- `src/routes/index.tsx` - main landing page route
- `netlify/functions/api.js` - Netlify serverless API
- `frontend/` - Netlify publish folder containing generated `index.html`
- `netlify.toml` - Netlify build and redirect config
- `vite.config.ts` - Vite config with alias and output path

## Setup

```bash
npm install
```

## Environment variables

Create a `.env` file or set variables in Netlify:

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`
- `TEAM_SLUG` (optional, defaults to `ai-web-2026`)

## Local development

```bash
npm run dev
```

## Build

```bash
npm run build
```

### Netlify output

The frontend build writes to `frontend/dist`, and the Netlify function is loaded from `netlify/functions`.

## Netlify configuration

`netlify.toml` includes:

- `build.command = "npm run build"`
- `publish = "frontend/dist"`
- `functions = "netlify/functions"`
- redirect rule for `/api/*` to `/.netlify/functions/api/:splat`

## API endpoints

- `GET /api/page` — returns page content from Supabase or fallback default content
- `POST /api/contact` — accepts contact form data, stores it in Supabase, and sends a notification email via Resend

## Notes

- The app uses the `@` alias to resolve `src/` imports.
- `tsconfig.json` includes `types: ["vite/client"]` for Vite type support.
- `public/ai-web-2026.txt` is included as required placeholder text.
