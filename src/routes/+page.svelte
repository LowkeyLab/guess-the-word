<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { redirect } from '@sveltejs/kit';
	let { data } = $props();

	// async function joinOrMakeGame(currentPlayer: string, supabase: SupabaseClient) {
	// 	const { data: games, error: dbError } = await supabase
	// 		.from('games')
	// 		.select('id, players')
	// 		.eq('state', 'waiting')
	// 		.limit(1);
	// 	if (dbError) {
	// 		error(500, 'Failed to get games');
	// 	}
	// 	if (games.length > 0) {
	// 		return games[0];
	// 	} else {
	// 		const { data: newGame, error: dbError } = await supabase
	// 			.from('games')
	// 			.insert({ guesses: [], players: [currentPlayer], state: 'waiting' })
	// 			.select('id');
	// 		if (dbError) {
	// 			console.log(`dbError: ${JSON.stringify(dbError)}`);
	// 			error(500, 'Failed to create new game');
	// 		}
	// 		if (newGame.length > 0) {
	// 			return {
	// 				id: newGame[0].id,
	// 				players: [currentPlayer]
	// 			};
	// 		} else {
	// 			error(500, 'Failed to create new game');
	// 		}
	// 	}
	// }
</script>

<div class="box-border flex justify-center">
	<div class="flex flex-col gap-4">
		<h1 class="text-3xl">Welcome, <span class="text-3xl font-bold">{data.userName}</span></h1>
		<Button
			class="text-lg"
			onclick={async () => {
				console.log('button clicked');
			}}>Start Playing</Button
		>
	</div>
</div>
