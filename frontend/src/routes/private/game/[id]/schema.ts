import { z } from 'zod';

export const formSchema = z.object({
	guess: z.string().min(1).max(20)
});

export type FormSchema = typeof formSchema;
