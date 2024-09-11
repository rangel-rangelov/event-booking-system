'use client';

import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const CreateEventButton = (): JSX.Element => {
  const router = useRouter();

  return (
    <Button
      size="sm"
      className="h-8 gap-1"
      onClick={() => router.push('/dashboard/events/create')}>
      <PlusCircle className="size-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Create Event
      </span>
    </Button>
  );
};
