import type { Metadata, Viewport } from 'next';
import { Quicksand, Lato } from 'next/font/google';
import './globals.css';

const display = Quicksand({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-display' });
const body = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Business Aid | Where business gets better',
  description: 'E-commerce growth (SEO & AEO, content, media buying, strategy) and Legal Aid (income tax, RJSC, audit) under one roof in Dhaka.',
  metadataBase: new URL('https://thebizaid.com'),
};
export const viewport: Viewport = { themeColor: '#3F8B84' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
