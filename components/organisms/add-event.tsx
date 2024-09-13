'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Event } from '@/sanity/types/types';
import { createUserEvent } from '@/actions/events';
import { useState, useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Props {
  events: Event[];
}

const FormSchema = z.object({
  eventId: z.string({ required_error: 'Please select an event!' }),
});

export const AddEvent = ({ events }: Props): JSX.Element => {
  const [error, setError] = useState<string | null>();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  dayjs.extend(localizedFormat);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    console.log(form.getValues());
    setError(null);

    startTransition(async () => {
      const res = await createUserEvent(data.eventId);

      if (res.error) {
        setError(res.error);
      } else {
        form.reset();
        setOpen(false);
        toast({
          variant: 'accent',
          description: 'Your event has been added succesfully!',
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!events.length ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              className="h-8 gap-1 !pointer-events-auto"
              disabled={!events.length}>
              <PlusCircle className="size-3.5" />
              Add event
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            All the available events in the CMS are currently added. Please go
            ahead and add a new one there.
          </TooltipContent>
        </Tooltip>
      ) : (
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="h-8 gap-1 !pointer-events-auto"
            disabled={!events.length}>
            <PlusCircle className="size-3.5" />
            Add event
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new event</DialogTitle>
          <DialogDescription className="!mb-6">
            Add new event from the ones already created in our CMS.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="eventId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the event you want to add" />
                        </SelectTrigger>
                        <SelectContent>
                          {events.map(event => (
                            <SelectItem value={event._id} key={event._id}>
                              {event.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <FormMessage>{error}</FormMessage>}
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
