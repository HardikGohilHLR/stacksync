// Layout
import type { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google';

import '@/styles/globals.css';

import { getMetaData } from '@/lib/utils/meta-data';
import { ThemeProvider } from '@/context/theme-provider';

import { Navbar, Footer } from '@/components/imports';

export const metadata: Metadata = getMetaData('home');

export const viewport: Viewport = {
  themeColor: '#141218',
};

const fonts = localFont({
  src: [
    { path: '../styles/fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../styles/fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../styles/fonts/Satoshi-Variable.woff2', weight: '600', style: 'normal' },
    { path: '../styles/fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../styles/fonts/Satoshi-Black.woff2', weight: '800', style: 'normal' },
  ],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning className="h-lvh">
      <body className={clsx(fonts.className, 'bg-background min-h-dvh')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />

          {children}

          {/* Footer */}
          <Footer />
        </ThemeProvider>
      </body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </html>
  );
};

export default RootLayout;
