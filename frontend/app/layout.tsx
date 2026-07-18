import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '../styles/globals.css';
import ThemeProvider from '@/components/providers/ThemeProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'e-Kinerja Terpadu',
  description: 'Sistem Manajemen Kinerja Pemerintah Terpadu',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1E3A8A" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${poppins.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
