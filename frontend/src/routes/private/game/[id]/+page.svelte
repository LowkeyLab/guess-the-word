<script lang="ts">
	import { io, Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import Loader from './Loader.svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ClientToServerEvents, ServerToClientEvents } from '@common/index';
	import GuessForm from './GuessForm.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	let opponent = $state('');
	let gameStarted = $state(false);

	onMount(() => {
		const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(PUBLIC_BACKEND_URL);
		socket.emit('joinGame', data.gameId, data.user!.id, data.user!.user_metadata.name);
		socket.on('gameStarted', (players) => {
			gameStarted = true;
			opponent = players.find((player) => player.id !== data.user!.id)!.name;
		});
		return () => {
			socket.emit('leaveGame', data.gameId, data.user!.id);
		};
	});
</script>

<div class="box-border flex justify-center">
	{#if gameStarted}
		<div class="flex flex-col items-center gap-2">
			<p class="text-lg">You're playing with <span class="font-bold">{opponent}</span></p>
			<GuessForm {data} />
		</div>
	{:else}
		<Loader />
	{/if}
</div>
