import { z } from 'zod';

export const formSchema = z.object({
	guess: z.string().max(20)
});

export type FormSchema = typeof formSchema;
