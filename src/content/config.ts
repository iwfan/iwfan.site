// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content"

// 2. Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    icon: z.string().optional(),
    image: z.string().optional(),
  }),
})

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
}
