import { defineCollection, z } from "astro:content";

const proyectos = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		heroImage: z.string(),
		category: z.string(),
		url: z.string(),
	}),
});

export const collections = { proyectos };
