import { EventRow } from '@/components/molecules/events/event-row';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { MappedEvent } from '@/actions/events';

interface Props {
  events: MappedEvent[];
}

export const EventsTable = ({ events }: Props): JSX.Element => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>When</TableHead>
          <TableHead className="hidden lg:table-cell">Description</TableHead>
          <TableHead className="hidden md:table-cell">Where</TableHead>
          <TableHead className="hidden lg:table-cell">Created at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map(event => (
          <EventRow event={event} key={event._id} />
        ))}
      </TableBody>
    </Table>
  );
};
