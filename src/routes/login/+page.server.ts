import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(schema));
    return { form };
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		cookies.set('userName', form.data.username, { path: '/' });
        redirect(303, '/');
	}
};
