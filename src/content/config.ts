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
		previewVideo: z.string().optional(),
		category: z.string(),
		url: z.string(),
		order: z.number().optional(),
	}),
});

export const collections = { proyectos };
