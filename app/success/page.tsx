import Link from 'next/link';
export default function Success(){return <main className="center"><section className="panel"><h1>Payment received ✨</h1><p>Your Snackies order is confirmed. Stripe will send the receipt if receipts are enabled in your Stripe dashboard.</p><Link href="/">Back to shop</Link></section></main>}
