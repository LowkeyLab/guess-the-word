import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { id }, locals: { supabase } }) => {
	const { data: game, error } = await supabase.from('games').select().eq('id', Number(id)).single();
	if (error) {
		throw error;
	}
	if (!game) {
		return { status: 404 };
	}
	return { props: { game } };
};
