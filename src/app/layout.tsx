import type { Metadata, Viewport } from 'next';
import { DM_Sans, Manrope } from 'next/font/google';
import { StudioProvider } from '@/providers/StudioProvider';
import { StudioLayoutShell } from '@/components/shared/StudioLayoutShell';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Mind DetoxX Studio Admin',
    default: 'Mind DetoxX Studio Admin',
  },
  description:
    'Studio management and website publishing platform for Mind DetoxX — Yoga, Sound Healing & Meditation in Surat.',
  keywords: [
    'Mind DetoxX',
    'Yoga Studio Surat',
    'Studio Admin',
    'Sound Healing',
    'VIP Road Surat',
  ],
  authors: [{ name: 'Mind DetoxX Team' }],
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Mind DetoxX Studio Admin',
    description: 'Manage studio schedule, activities, bookings, enquiries and website content.',
    siteName: 'Mind DetoxX Studio Admin',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#07171b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>
        <StudioProvider>
          <StudioLayoutShell>{children}</StudioLayoutShell>
        </StudioProvider>
      </body>
    </html>
  );
}
