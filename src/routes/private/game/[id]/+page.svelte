<script lang="ts">
	import { json } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	const { data } = $props();
	const { supabase, game, user } = data;
	const gameChannel = supabase.channel(`game:${game?.id}`);
	function onJoin() {
		console.log('Someone joined the game');
	}
	function onSync() {
		const state = JSON.stringify(gameChannel.presenceState());
		console.log(`There is a state update. Current state is ${state}`);
	}
	function onLeave() {
		console.log('Someone left the game');
	}
	gameChannel.on('presence', { event: 'sync' }, () => {
		onSync();
	});
	gameChannel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
		onJoin();
	});
	gameChannel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
		onLeave();
	});
	onMount(() => {
		gameChannel.subscribe(async (status) => {
			if (status === 'SUBSCRIBED') {
				if (game) {
					game.players.push(user!.id);
					if (game.players.length === 2) {
						game.state = 'started';
					}
					await gameChannel.track(game);
				}
			}
		});
		return async () => {
			await gameChannel.untrack();
		};
	});
</script>

<div class="box-border flex justify-center">
	<div class="loader text-lg"></div>
</div>

<style>
	.loader {
		width: fit-content;
		font-family: monospace;
		clip-path: inset(0 3ch 0 0);
		animation: l4 1s steps(4) infinite;
	}
	.loader:before {
		content: 'Waiting for player...';
	}
	@keyframes l4 {
		to {
			clip-path: inset(0 -1ch 0 0);
		}
	}
</style>
