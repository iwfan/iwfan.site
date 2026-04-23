import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts'
  }),
  schema: z.object({
    title: z.string(),
    emoji: z.string(),
    description: z.string().optional().nullable(),
    original: z.string().optional().nullable(),
    created_at: z.coerce.date()
  })
});

const docsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/docs'
  }),
  schema: z.object({})
});

export const collections = {
  posts: postsCollection,
  docs: docsCollection
};
