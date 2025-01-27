<script lang="ts">
	import { onMount } from 'svelte';
	const { data } = $props();
	const { supabase, game, user } = data;
	const gameChannel = supabase.channel(`game:${game?.id}`, {
		config: {
			presence: { key: user!.id }
		}
	});

	const ownGameState = $state(game);
	interface Player {
		id: string;
		name: string;
	}
	function onJoin(key: string) {
		console.log(`Someone joined the game with key ${key}`);
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
	gameChannel.on('presence', { event: 'join' }, ({ key, newPresences }) => {});
	gameChannel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
		onLeave();
	});
	onMount(() => {
		gameChannel.subscribe(async (status) => {
			if (status === 'SUBSCRIBED') {
				await gameChannel.track({
					name: user?.user_metadata.name
				});
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
