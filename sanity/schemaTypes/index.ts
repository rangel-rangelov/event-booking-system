import { type SchemaTypeDefinition } from 'sanity';
import { eventSchema } from './event';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventSchema],
};
