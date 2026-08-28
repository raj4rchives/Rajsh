# Velora — AI Website Studio

This package is a polished frontend prototype based on the uploaded JEE Tracker visual language: deep black surfaces, thin borders, warm gold accent, compact typography, rounded panels and restrained motion.

## Included
- Landing page
- AI Builder with chat, live preview, device toggles, file explorer and simulated build logs
- Template marketplace
- Website details / rental CTA
- Pricing
- Customer dashboard
- Domains
- Analytics
- Billing
- Settings
- Login / signup / password reset UI
- Admin console
- Responsive mobile navigation

## Run
Open `index.html` directly in a browser, or serve the folder with any static HTTP server.

## Production architecture
The UI intentionally keeps backend concerns separate. For a real deployment, replace the simulated actions with:
- Next.js + TypeScript frontend
- Node.js/TypeScript API
- PostgreSQL + Prisma/Drizzle
- Auth.js
- S3-compatible object storage
- LLM provider abstraction
- Isolated build/deployment workers
- Stripe/Razorpay payment webhooks
- DNS/domain provider
- Redis rate limiting and job queues

Never execute generated/untrusted website code in the main application server. Generated projects should build in isolated containers/workers and deploy through a separate service.
