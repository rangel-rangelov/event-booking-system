'use client';

import { MoreHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { deleteUserEvent, type MappedEvent } from '@/actions/events';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';

interface Props {
  userEvents: MappedEvent[];
}

export const UserActions = ({ userEvents }: Props): JSX.Element => {
  const [userEventsDialogOpen, setUserEventsDialogOpen] = useState(false);

  const deleteEvent = async (id: string) => {
    const res = await deleteUserEvent(id);

    if (res.success) {
      toast({
        variant: 'accent',
        description: 'Successfully deleted your event!',
      });

      return;
    }

    if (res.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: res.error,
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-haspopup="true"
            size="icon"
            variant="ghost"
            className="ml-auto">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setUserEventsDialogOpen(true)}>
            Manage events
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={userEventsDialogOpen}
        onOpenChange={setUserEventsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User events</DialogTitle>
            <DialogDescription className="!mb-4">
              View and delete user events.
            </DialogDescription>
            {userEvents.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userEvents.map(event => (
                    <TableRow key={event.id}>
                      <TableCell>{event.id}</TableCell>
                      <TableCell>{event.title}</TableCell>
                      <TableCell className="flex justify-end">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => deleteEvent(event.id)}>
                              <X />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete event</TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              "User doesn't have any events added"
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
