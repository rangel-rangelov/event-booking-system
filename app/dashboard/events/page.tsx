import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { CreateEventButton } from '@/components/atoms/create-event-button';
import { EventsTable } from '@/components/organisms/events-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { prisma } from '@/lib/prisma';
import { getUserEvents } from '@/sanity/queries/events';
import type { Event } from '@/sanity/types/types';

// TODO: Move this
const getEvents = async (): Promise<Event[]> => {
  const session = await auth();

  if (session?.user.id) {
    const dbEvents = await prisma.event.findMany({
      where: {
        authorId: Number(session?.user.id),
      },
    });

    const eventSanityIds = dbEvents.map(event => event.sanityId);
    const events = await getUserEvents(eventSanityIds);

    return events || [];
  }

  return [];
};

const Events = async (): Promise<JSX.Element> => {
  const events = await getEvents();
  const now = new Date();
  const pastEvents = events.filter(event => new Date(event.timestamp) < now);
  const upcomingEvents = events.filter(
    event => new Date(event.timestamp) > now,
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <CreateEventButton />
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              Manage all your events and create new ones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {events.length ? (
              <EventsTable events={events} />
            ) : (
              <p className="text-sm">
                No events to display. Go ahead and create one!
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="past">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              Manage your past events and create new ones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pastEvents.length ? (
              <EventsTable events={pastEvents} />
            ) : (
              <p className="text-sm">No past events to display.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="incoming">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              Manage your incoming events and create new ones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length ? (
              <EventsTable events={upcomingEvents} />
            ) : (
              <p className="text-sm">
                No upcoming events to display. Go ahead and create one!
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Events;
