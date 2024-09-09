import { Users2, BookHeart, CalendarSearch } from 'lucide-react';
import { PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { isAdmin } from '@/lib/utils';
import type { Role } from '@prisma/client';

export const MobileNavigation = async (): Promise<JSX.Element> => {
  const session = await auth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/dashboard"
            className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
            <BookHeart className="size-5 transition-all group-hover:scale-110" />
          </Link>
          <Link
            href="/dashboard/events"
            className="flex items-center gap-4 px-2.5 text-foreground">
            <CalendarSearch className="size-5" />
            Events
          </Link>
          {isAdmin(session?.user.role as Role) && (
            <Link
              href="/dashboard/users"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Users2 className="size-5" />
              Users
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
