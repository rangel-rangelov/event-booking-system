import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableRow, TableCell } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { urlFor } from '@/sanity/lib/image';
import type { Event } from '@/sanity/types/types';

interface Props {
  event: Event;
}

export const EventRow = ({ event }: Props): JSX.Element => {
  dayjs.extend(localizedFormat);

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt={event.image?.description || 'Event image'}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={event.image ? urlFor(event.image).url() : 'placeholder.svg'}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{event.title}</TableCell>
      <TableCell>{dayjs(event.timestamp).format('lll')}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {event.description && event.description.length >= 20 ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>{`${event.description?.substring(0, 20)}...`}</span>
            </TooltipTrigger>
            <TooltipContent className="max-w-60">
              {event.description}
            </TooltipContent>
          </Tooltip>
        ) : (
          event.description || 'No description'
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell">{event.location}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {dayjs(event._createdAt).format('lll')}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
