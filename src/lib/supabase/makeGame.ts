import { supabase } from './supabaseClient';
import { error } from '@sveltejs/kit';

export const joinOrMakeGame = async (currentPlayer: string) => {
	const { data: games, error: dbError } = await supabase
		.from('games')
		.select('id, players')
		.eq('state', 'waiting').limit(1);
	if (dbError) {
		error(500, "Failed to get games");
	}
	if (games.length > 0) {
		return games[0];
	} else {
		const { data: newGame, error : dbError } = await supabase
			.from('games')
			.insert({ guesses: [], players: [currentPlayer], state: 'waiting' }).select('id');
		if (dbError) {
            console.log(`dbError: ${JSON.stringify(dbError)}`)
            error(500, "Failed to create new game");
		}
        if(newGame.length > 0) {
            return {
                id: newGame[0].id, 
                players: [currentPlayer]
            };
        }
        else {
            error(500, "Failed to create new game");
        }
	}
};
