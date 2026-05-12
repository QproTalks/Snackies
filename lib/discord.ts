export async function notifyDiscord(order: { id: string; email?: string | null; amount?: number | null; currency?: string | null; items?: string }) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;
  const content = `🛒 **New Snackies order**\nOrder: ${order.id}\nCustomer: ${order.email || 'unknown'}\nTotal: ${order.amount ? (order.amount / 100).toFixed(2) : '?'} ${order.currency?.toUpperCase() || ''}\nItems: ${order.items || 'see Stripe dashboard'}`;
  await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) });
}
