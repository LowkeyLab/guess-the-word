import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, params, locals: { supabase, user } }) => {
	if (!user) {
		error(401, 'Unauthorized');
	}

	error(500, 'Invalid request');
};
