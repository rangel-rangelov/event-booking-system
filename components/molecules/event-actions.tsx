'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Role } from '@prisma/client';
import { deleteUserEvent } from '@/actions/events';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface Props {
  eventId: string;
  sanityEventId: string;
  userRole: Role;
}

export const EventActions = ({
  eventId,
  userRole,
  sanityEventId,
}: Props): JSX.Element => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const deleteEvent = async (id: string) => {
    const res = await deleteUserEvent(id);

    if (res.success) {
      toast({
        variant: 'accent',
        description: 'Successfully deleted your event!',
      });

      setDeleteDialogOpen(false);

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
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {userRole === Role.ADMIN && (
            <DropdownMenuItem>
              <Link href={`/studio/structure/event;${sanityEventId}`}>
                Edit
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you you want to delete this event?</DialogTitle>
            <DialogDescription className="!mb-4">
              Please confirm you want to delete this event.
            </DialogDescription>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}>
                Discard
              </Button>
              <Button onClick={() => deleteEvent(eventId)}>Delete</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
