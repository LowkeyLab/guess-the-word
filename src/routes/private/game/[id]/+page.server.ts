import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { id }, locals: { supabase } }) => {
	const { data: game, error } = await supabase
		.from('games')
		.select()
		.eq('id', Number(id))
		.limit(1)
		.single();
	if (error) {
		fail(500, {
			error: `cannot find game: ${JSON.stringify(error)}`
		});
	}
	if (!game) {
		return { status: 404 };
	}
	return { game };
};
