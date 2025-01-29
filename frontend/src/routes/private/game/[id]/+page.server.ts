import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ params: { id }, locals: { supabase } }) => {
	const { data: game, error: dbError } = await supabase
		.from('games')
		.select()
		.eq('id', Number(id))
		.limit(1)
		.single();
	if (dbError) {
		error(500, `Internal Postgres error: ${JSON.stringify(dbError)}`);
	}
	if (!game) {
		error(404, 'Game not found');
	}
	return { game, form: await superValidate(zod(formSchema)) };
};
