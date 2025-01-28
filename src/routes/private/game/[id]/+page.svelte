<script lang="ts">
	import type { Database } from '$lib/supabase/database.types.js';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import { string } from 'zod';
	import Loader from './Loader.svelte';
	interface Props {
		data: {
			supabase: SupabaseClient<Database>;
			game: {
				id: string;
				players: string[];
				guesses: string[];
			};
			user: {
				id: string;
				user_metadata: {
					name: string;
				};
			};
		};
	}
	interface Player {
		id: string;
		name: string;
	}

	interface Guess {
		player: string;
		guess: string;
	}

	const { data }: Props = $props();
	const { supabase, game, user } = data;
	const gameChannel = supabase.channel(`game:${game.id}`, {
		config: {
			presence: { key: user.id }
		}
	});

	const ownGameState = $state({
		opponent: null as Player | null,
		guesses: [] as Guess[]
	});

	function onJoin(key: string, newPresences: Player[]) {
		newPresences.forEach((presence) => {
			const player: Player = { id: key, name: presence.name };
			if (key !== user.id) {
				ownGameState.opponent = player;
				console.log(`Opponent is ${ownGameState.opponent.name}`);
			}
		});
	}

	function onSync() {
		const state = JSON.stringify(gameChannel.presenceState());
		console.log(`There is a state update. Current state is ${state}`);
	}

	function onLeave(key: string, leftPresences: Player[]) {
		leftPresences.forEach((presence) => {
			const player: Player = { id: key, name: presence.name };
			if (ownGameState.opponent && key === ownGameState.opponent.id) {
				console.log(`Opponent left the game with key ${key} and name ${player.name}`);
				ownGameState.opponent = null;
				ownGameState.guesses = [];
			}
		});
	}

	gameChannel.on('presence', { event: 'sync' }, () => {
		onSync();
	});
	gameChannel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
		onJoin(key, newPresences);
	});
	gameChannel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
		onLeave(key, leftPresences);
	});
	onMount(() => {
		gameChannel.subscribe(async (status) => {
			if (status === 'SUBSCRIBED') {
				await gameChannel.track({
					name: user.user_metadata.name
				});
			}
		});
		return async () => {
			await gameChannel.untrack();
		};
	});
</script>

<div class="box-border flex justify-center">
	{#if ownGameState.opponent}
		<div class="text-lg">
			<p>You're playing against <span class="font-bold">{ownGameState.opponent.name}</span></p>
		</div>
	{:else}
		<Loader />
	{/if}
</div>
