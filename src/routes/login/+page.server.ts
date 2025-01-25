import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';
import { supabase } from '$lib/supabase/supabaseClient';

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
		const { data, error } = await supabase.auth.signInAnonymously({
			options: {
				data: {
					name: form.data.username
				}
			}
		})
		if(error) {
			console.log(error)
			return fail(500, {"error": "Authentication failed"});
		}
		cookies.set('userId', data.user!.id, {path:'/'})
        redirect(303, '/');
	}
};
