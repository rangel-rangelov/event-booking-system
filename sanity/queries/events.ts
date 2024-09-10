import { defineQuery } from 'next-sanity';
import { client } from '../lib/client';
import type {
  Event,
  EventsQueryResult,
  UserEventsQueryResult,
} from '../types/types';

const eventsQuery = defineQuery(
  `*[_type == "event"]{_id, title, slug, image, description, timestamp, location}`,
);

const userEventsQuery = defineQuery(`*[_type == "event" && _id in $postIds]`);

export const getEvents = (): Promise<EventsQueryResult> =>
  client.fetch(eventsQuery);

export const getUserEvents = (
  userEventIds: Event['_id'][],
): Promise<UserEventsQueryResult> =>
  client.fetch(userEventsQuery, { postIds: userEventIds });
