import { redirect } from '@sveltejs/kit';
import type {PageServerLoad } from './$types';

export const load: PageServerLoad = async ({cookies}) => {
	const name = cookies.get('userName');
	if (!name) {
		redirect(303, '/login');
	}
	return { name };
};

