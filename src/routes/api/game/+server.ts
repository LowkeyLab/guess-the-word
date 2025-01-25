import type { SupabaseClient } from '@supabase/supabase-js';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import type { Database } from '$lib/supabase/database.types';

export const POST: RequestHandler = async ({ locals: { supabase, safeGetSession } }) => {
	const { user } = await safeGetSession();
	if (!user) {
		error(401, 'Unauthorized');
	}
	const username = user.user_metadata.name as string;
	const { id, status } = await joinOrMakeGame(username, supabase);

	return json({ id }, { status });
};

async function joinOrMakeGame(playerName: string, supabase: SupabaseClient<Database>) {
	const { data: availableGame, error: dbError } = await supabase
		.from('games')
		.select('id, players, state')
		.eq('state', 'waiting')
		.limit(1)
		.maybeSingle();
	if (dbError) {
		error(500, 'Failed to get games');
	}
	if (availableGame) {
		await supabase.from('games').update({
			players: [...availableGame.players, playerName],
			state: 'started'
		});
		return {
			id: availableGame.id,
			status: 200
		};
	} else {
		const { data: newGame, error: dbError } = await supabase
			.from('games')
			.insert({ guesses: [], players: [playerName], state: 'waiting' })
			.select('id')
			.limit(1)
			.single();
		if (dbError) {
			console.log(`dbError: ${JSON.stringify(dbError)}`);
			error(500, 'Failed to create new game');
		}
		if (newGame) {
			return {
				id: newGame.id,
				status: 201
			};
		} else {
			error(500, 'Failed to create new game');
		}
	}
}
