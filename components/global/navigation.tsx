import { Users2, BookHeart, CalendarSearch } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/auth';
import { AccountDropdown } from '@/components/organisms/account-dropdown';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { isAdmin } from '@/lib/utils';
import type { Role } from '@prisma/client';

export const Navigation = async (): Promise<JSX.Element> => {
  const session = await auth();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col justify-between border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/dashboard"
          className="group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:size-8 md:text-base">
          <BookHeart className="size-4 transition-all group-hover:scale-110" />
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/events"
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8">
              <CalendarSearch className="size-5" />
              <span className="sr-only">Events</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Events</TooltipContent>
        </Tooltip>
        {isAdmin(session?.user.role as Role) && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/users"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8">
                <Users2 className="size-5" />
                <span className="sr-only">Users</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Users</TooltipContent>
          </Tooltip>
        )}
      </nav>
      <div className="self-center py-5">
        <AccountDropdown />
      </div>
    </aside>
  );
};
