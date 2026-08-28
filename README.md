# Webnest Premium + Client Dashboard

This ZIP now includes the original public Webnest marketplace landing page PLUS a post-login Client Dashboard.

## How it works
- Click **Log in** on the public page.
- The public landing page is hidden and the **Client Dashboard** opens.
- Dashboard includes Create New Order, AI/template/custom options, stats, recent orders, inspiration and quick actions.
- Created orders are persisted in browser localStorage under `webnest_client_orders`.
- Click **Browse Websites** in the dashboard to return to the public marketplace.

## Important
This is a frontend/demo integration. Replace localStorage with your real authentication, database, order API and payment system for production.
