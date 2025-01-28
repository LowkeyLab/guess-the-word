import { z } from 'zod';

export const formSchema = z.object({
	guess: z.string().max(50)
});

export type FormSchema = typeof formSchema;
