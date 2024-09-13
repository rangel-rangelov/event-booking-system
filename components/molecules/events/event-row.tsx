import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Image from 'next/image';
import { auth } from '@/auth';
import { EventActions } from '@/components/molecules/events/event-actions';
import { TableRow, TableCell } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { urlFor } from '@/sanity/lib/image';
import type { MappedEvent } from '@/actions/events';
import type { Role } from '@prisma/client';

interface Props {
  event: MappedEvent;
}

export const EventRow = async ({ event }: Props): Promise<JSX.Element> => {
  const session = await auth();

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
      <TableCell>{dayjs(event.timestamp).format('LL')}</TableCell>
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
        <EventActions
          eventId={event.id}
          sanityEventId={event._id}
          userRole={session?.user.role as Role}
        />
      </TableCell>
    </TableRow>
  );
};
