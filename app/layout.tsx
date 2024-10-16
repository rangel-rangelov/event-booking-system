import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Event Booking Dashboard',
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>): JSX.Element => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
