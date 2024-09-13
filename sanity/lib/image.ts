import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from '../env';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { ImageUrlBuilder } from 'sanity';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource): ImageUrlBuilder => {
  return builder.image(source);
};
