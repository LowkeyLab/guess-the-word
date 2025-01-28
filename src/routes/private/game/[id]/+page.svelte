<script lang="ts">
	import type { Database } from '$lib/supabase/database.types.js';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import { string } from 'zod';
	import Loader from './Loader.svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { FormSchema } from './schema';
	interface Props {
		data: {
			supabase: SupabaseClient<Database>;
			game: {
				id: number;
			};
			user: {
				id: string;
				user_metadata: {
					name: string;
				};
			};
			form: SuperValidated<Infer<FormSchema>>;
		};
	}

	interface Player {
		id: string;
		name: string;
		guesses: string[];
	}

	const { data }: Props = $props();
	const { supabase, game, user, form } = data;
	const gameChannel = supabase.channel(`game:${game.id}`, {
		config: {
			presence: { key: user.id }
		}
	});

	const ownGameState = $state({
		opponent: null as Player | null,
		self: { id: user.id, name: user.user_metadata.name, guesses: [] } as Player
	});

	function onJoin(key: string, newPresences: Player[]) {
		newPresences.forEach((presence) => {
			const player: Player = { id: key, name: presence.name, guesses: [] };
			if (key !== user.id) {
				ownGameState.opponent = player;
				console.log(`Opponent is ${ownGameState.opponent.name}`);
			}
		});
	}

	function onLeave(key: string, leftPresences: Player[]) {
		leftPresences.forEach((presence) => {
			const player: Player = { id: key, name: presence.name, guesses: [] };
			if (ownGameState.opponent && key === ownGameState.opponent.id) {
				console.log(`Opponent left the game with key ${key} and name ${player.name}`);
				ownGameState.opponent = null;
				ownGameState.self.guesses = [];
			}
		});
	}

	gameChannel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
		onJoin(key, newPresences);
	});
	gameChannel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
		onLeave(key, leftPresences);
	});
	gameChannel.on('broadcast', { event: 'guess' }, (payload) => {
		console.log(payload);
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
			await gameChannel.unsubscribe();
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
