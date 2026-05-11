import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Snackies', description: 'Luxury international snack webshop' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
