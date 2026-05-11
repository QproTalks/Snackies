# Snackies Webshop

Luxury mobile-first international snacks webshop with Stripe Checkout, Stripe Tax-ready checkout, coupons, Discord order notifications, multilingual UI, wishlist, basket recovery, reviews, legal pages, and demo admin dashboard.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Required private setup

Do **not** put private keys in frontend code.

Required `.env.local` values:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51PVbKVRtJakEWWLGJKmUR6GM8e2Th2akgFcn7qNp2gmmJuocKhIHzRwNbZPUvzJ3zuk3TjWHpFq1dxtyJBypwRzj009nhL7Mk9
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
ADMIN_PASSWORD=change-this-password
NEXT_PUBLIC_ADMIN_PASSWORD=change-this-password
```

For safe testing, use Stripe **test mode** keys first.

## Stripe setup

1. Enable Stripe Tax in the Stripe Dashboard if you want automatic VAT/tax calculation.
2. Enable customer email receipts in Stripe Dashboard payment email settings, or connect a custom mail provider.
3. Create coupons/promotion codes in Stripe Dashboard. Checkout uses `allow_promotion_codes: true`.
4. Add a webhook endpoint:

```text
https://your-domain.com/api/webhooks/stripe
```

Listen for:

```text
checkout.session.completed
```

5. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Shipping

Shipping is currently flat-rate by checkout option:

- Netherlands: €6.95
- Belgium/Germany/Luxembourg: €9.95
- EU: €14.95
- Worldwide: €29.95

These are starter rates based on public parcel-rate references. For production, connect Sendcloud, MyParcel, PostNL, DHL, DPD, or another shipping platform to calculate exact destination/weight prices and print labels.

## User accounts and cart recovery

This starter has local demo login and cart recovery using localStorage. For real customer accounts, connect one of:

- Supabase Auth + Postgres
- Clerk
- Auth.js / NextAuth
- Firebase Auth

## Admin dashboard

`/admin` is a demo inventory dashboard. For production, secure it with real auth and role checks.

## Multi-language and multi-currency

Included languages:

- English
- Dutch
- German
- French
- Spanish
- Chinese
- Russian

Currency display is approximate and checkout charges EUR. For production, use a live FX provider or Stripe multi-currency Prices.

## Deployment

Recommended free/easy hosting: Vercel. Import the project from GitHub, add the environment variables, deploy, then set `NEXT_PUBLIC_SITE_URL` to the live domain.
