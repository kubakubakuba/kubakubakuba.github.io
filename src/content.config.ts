import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      kind: z.enum(["research", "software", "education", "talk", "photography"]),
      yearLabel: z.string(),
      slug: z.string(),
      featured: z.boolean().default(false),
      order: z.number(),
      showVisual: z.boolean().default(false),
      visual: z.object({
        kind: z.literal("image"),
        src: image(),
        alt: z.string(),
      }),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    heading: z.string().optional(),
    description: z.string(),
    slug: z.string(),
    navLabel: z.string().optional(),
    order: z.number(),
    showDescription: z.boolean().default(true),
  }),
});

export const collections = { work, pages };
