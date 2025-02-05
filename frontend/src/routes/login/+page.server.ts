import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const { error } = await supabase.auth.signInAnonymously({
			options: {
				data: {
					name: form.data.username
				}
			}
		});
		if (error) {
			return fail(500, { error: 'Authentication failed' });
		}
		redirect(303, '/private/');
	}
};
