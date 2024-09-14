'use client';

import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  getUserMappedEventsAction,
  getUserNotAddedEventsAction,
} from '@/actions/events';
import { AddEvent } from '@/components/organisms/events/add-event';
import { EventsTable } from '@/components/organisms/events/events-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { pusherClient } from '@/lib/pusher';
import type { MappedEvent } from '@/actions/events';
import type { Event } from '@/sanity/types/types';

const Events = (): JSX.Element => {
  const [events, setEvents] = useState<MappedEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<MappedEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<MappedEvent[]>([]);
  const [userNotAddedEvents, setUserNotAddedEvents] = useState<MappedEvent[]>(
    [],
  );

  useEffect(() => {
    const channel = pusherClient.subscribe('events-channel');
    const now = new Date();

    channel.bind('update-events', (data: { events: MappedEvent[] }) => {
      setEvents(data.events);
      setPastEvents(events.filter(event => new Date(event.timestamp) < now));
      setUpcomingEvents(
        events.filter(event => new Date(event.timestamp) > now),
      );
    });

    channel.bind(
      'update-user-not-added-events',
      (data: { events: MappedEvent[] }) => {
        setUserNotAddedEvents(data.events);
      },
    );

    const fetchEvents = async () => {
      await getUserMappedEventsAction();
      await getUserNotAddedEventsAction();
    };

    fetchEvents();

    return () => {
      pusherClient.unsubscribe('events-channel');
    };
  }, []);

  return (
    <SessionProvider>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          <AddEvent events={userNotAddedEvents as Event[]} />
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Manage all your events and add new ones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {events.length ? (
                <EventsTable events={events} />
              ) : (
                <p className="text-sm">
                  No events to display. Go ahead and add one!
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
                Manage your past events and add new ones.
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
        <TabsContent value="upcoming">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Manage your incoming events and add new ones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length ? (
                <EventsTable events={upcomingEvents} />
              ) : (
                <p className="text-sm">
                  No upcoming events to display. Go ahead and add one!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SessionProvider>
  );
};

export default Events;
