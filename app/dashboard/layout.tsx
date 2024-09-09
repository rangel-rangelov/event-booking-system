import { Header } from '@/components/global/header';
import { Navigation } from '@/components/global/navigation';
import type { PropsWithChildren } from 'react';

const DashboardLayout = ({
  children,
}: Readonly<PropsWithChildren>): JSX.Element => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Navigation />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
