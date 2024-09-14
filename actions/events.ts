'use server';

import Pusher from 'pusher';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { getEvents, getUserEvents } from '@/sanity/queries/events';
import type { UserEventsQueryResult } from '@/sanity/types/types';
import type { Event } from '@prisma/client';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export interface MappedEvent extends ArrayElement<UserEventsQueryResult> {
  id: string;
}

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export const getUserMappedEventsAction = async (): Promise<void> => {
  const session = await auth();

  if (!session?.user.id) {
    pusher.trigger('events-channel', 'update-events', { events: [] });
    return;
  }

  const dbEvents = await prisma.event.findMany({
    where: {
      authorId: Number(session?.user.id),
    },
  });

  const mappedEvents = await mapEvents(dbEvents);

  pusher.trigger('events-channel', 'update-events', { events: mappedEvents });
  return;
};

export const getUserNotAddedEventsAction = async (): Promise<void> => {
  const session = await auth();

  if (!session?.user.id) {
    pusher.trigger('events-channel', 'update-user-not-added-events', {
      events: [],
    });

    return;
  }

  const sanityEvents = await getEvents();

  const dbEvents = await prisma.event.findMany({
    where: {
      authorId: Number(session?.user.id),
    },
  });

  const userNotAddedEvents = sanityEvents.filter(
    sanityEvent =>
      !dbEvents.some(dbEvent => dbEvent.sanityId === sanityEvent._id),
  );

  pusher.trigger('events-channel', 'update-user-not-added-events', {
    events: (userNotAddedEvents?.length && userNotAddedEvents) || [],
  });
};

export const createUserEventAction = async (
  eventSanityId: string,
): Promise<{ error?: string; success?: boolean }> => {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return { error: "We couldn't add your event, please try again later" };
    }

    await prisma.event.create({
      data: {
        sanityId: eventSanityId,
        authorId: Number(session.user.id),
      },
    });

    await getUserMappedEventsAction();
    await getUserNotAddedEventsAction();

    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: "We couldn't add your event, please try again later" };
  }
};

export const deleteUserEventAction = async (
  eventId: string,
): Promise<{ error?: string; success?: boolean }> => {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return { error: "We couldn't delete your event, please try again later" };
    }
    await prisma.event.delete({
      where: {
        authorId: Number(session.user.id),
        id: Number(eventId),
      },
    });

    await getUserMappedEventsAction();
    await getUserNotAddedEventsAction();

    return { success: true };
  } catch {
    return { error: "We couldn't delete your event, please try again later" };
  }
};

export const mapEvents = async (dbEvents: Event[]): Promise<MappedEvent[]> => {
  const eventSanityIds = dbEvents.map(event => event.sanityId);
  let events = await getUserEvents(eventSanityIds);

  if (events.length) {
    events = events.map(
      (sanityEvent): MappedEvent => ({
        ...sanityEvent,
        id: `${dbEvents.find(dbEvent => dbEvent.sanityId === sanityEvent._id)?.id || ''}`,
      }),
    );

    return (events?.length && (events as MappedEvent[])) || [];
  }

  return [];
};
