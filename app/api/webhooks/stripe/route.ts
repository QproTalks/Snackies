import { NextResponse } from 'next/server';
import { products } from '@/lib/products';
import { stripe } from '@/lib/stripe';
import { allowedShippingCountries, shippingOptions } from '@/lib/shipping';

export async function POST(req: Request) {
  try {
    const { items, customerEmail } = await req.json();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    if (!Array.isArray(items) || items.length === 0) return NextResponse.json({ error: 'Basket is empty' }, { status: 400 });
    const line_items = items.map((item: { id: string; quantity: number }) => {
      const product = products.find(p => p.id === item.id);
      if (!product) throw new Error(`Unknown product: ${item.id}`);
      const quantity = Math.max(1, Math.min(Number(item.quantity) || 1, 20));
      return {
        quantity,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(product.priceEur * 100),
          product_data: { name: product.name, description: product.description, metadata: { snackies_product_id: product.id, region: product.region } },
          tax_behavior: 'exclusive' as const
        }
      };
    });
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      customer_email: customerEmail || undefined,
      phone_number_collection: { enabled: true },
      billing_address_collection: 'required',
      shipping_address_collection: { allowed_countries: allowedShippingCountries as any },
      automatic_tax: { enabled: true },
      shipping_options: shippingOptions.map(s => ({ shipping_rate_data: { display_name: s.label, type: 'fixed_amount', fixed_amount: { amount: s.amount, currency: 'eur' }, tax_behavior: 'exclusive', metadata: { countries: s.countries.join(',') } } })),
      allow_promotion_codes: true,
      invoice_creation: { enabled: true },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: { source: 'Snackies webshop', cart: JSON.stringify(items).slice(0, 450) }
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Checkout failed' }, { status: 500 });
  }
}
