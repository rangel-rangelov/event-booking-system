import { MobileNavigation } from '@/components/global/mobile-navigation';

export const Header = (): JSX.Element => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
      <MobileNavigation />
    </header>
  );
};
