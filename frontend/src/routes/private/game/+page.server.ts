import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch }) => {
	const getAvailableGameResponse = await fetch(`${PUBLIC_BACKEND_URL}/games?available=true`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const json = await getAvailableGameResponse.json();
	if (json) {
		redirect(303, `game/${json.id}`);
	}
	const createGameResponse = await fetch(`${PUBLIC_BACKEND_URL}/games`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const createGameJson = await createGameResponse.json();
	redirect(303, `game/${createGameJson.id}`);
};
