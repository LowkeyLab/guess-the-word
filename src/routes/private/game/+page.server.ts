import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/game', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const { id }: { id: string } = await response.json();
	if (id !== undefined) {
		redirect(303, `game/${id}`);
	}
};
