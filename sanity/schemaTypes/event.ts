import { defineField, defineType } from 'sanity';

export const eventSchema = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: rule => rule.required(),
      options: { source: 'title' },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'description',
          title: 'Description',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'timestamp',
      title: 'When',
      type: 'date',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Where',
      // Note: Geopoint can be used as type here, but the UI is not user friendly.
      type: 'string',
      validation: rule => rule.required(),
    }),
  ],
});
