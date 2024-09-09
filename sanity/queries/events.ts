import { defineQuery } from 'next-sanity';
import { client } from '../lib/client';
import type { EventsQueryResult } from '../types/types';

const eventsQuery = defineQuery(
  `*[_type == "event"]{_id, title, slug, image, description, timestamp, location}`,
);

export const getEvents = (): Promise<EventsQueryResult> =>
  client.fetch(eventsQuery);
