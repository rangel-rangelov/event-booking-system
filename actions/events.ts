'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { getEvents, getUserEvents } from '@/sanity/queries/events';
import type {
  EventsQueryResult,
  UserEventsQueryResult,
} from '@/sanity/types/types';
import type { Event } from '@prisma/client';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export interface MappedEvent extends ArrayElement<UserEventsQueryResult> {
  id: string;
}

export const getUserMappedEvents = async (): Promise<MappedEvent[]> => {
  const session = await auth();

  if (session?.user.id) {
    const dbEvents = await prisma.event.findMany({
      where: {
        authorId: Number(session?.user.id),
      },
    });

    return mapEvents(dbEvents);
  }

  return [];
};

export const getUserNotAddedEvents = async (): Promise<EventsQueryResult> => {
  const session = await auth();

  const sanityEvents = await getEvents();

  if (session?.user.id) {
    const dbEvents = await prisma.event.findMany({
      where: {
        authorId: Number(session?.user.id),
      },
    });

    const userNotAddedEvents = sanityEvents.filter(
      sanityEvent =>
        !dbEvents.some(dbEvent => dbEvent.sanityId === sanityEvent._id),
    );

    return (userNotAddedEvents?.length && userNotAddedEvents) || [];
  }

  return [];
};

export const createUserEvent = async (
  eventSanityId: string,
): Promise<{ error?: string; success?: boolean }> => {
  try {
    const session = await auth();

    if (session?.user.id) {
      await prisma.event.create({
        data: {
          sanityId: eventSanityId,
          authorId: Number(session.user.id),
        },
      });

      return { success: true };
    } else {
      return { error: "We couldn't add your event, please try again later" };
    }
  } catch {
    return { error: "We couldn't add your event, please try again later" };
  }
};

export const deleteUserEvent = async (
  eventId: string,
): Promise<{ error?: string; success?: boolean }> => {
  try {
    const session = await auth();

    if (session?.user.id) {
      await prisma.event.delete({
        where: {
          authorId: Number(session.user.id),
          id: Number(eventId),
        },
      });

      return { success: true };
    } else {
      return { error: "We couldn't delete your event, please try again later" };
    }
  } catch {
    return { error: "We couldn't delete your event, please try again later" };
  }
};

export const mapEvents = async (dbEvents: Event[]) => {
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
