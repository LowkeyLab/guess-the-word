<script lang="ts">
	import { io, Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import Loader from './Loader.svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ClientToServerEvents, ServerToClientEvents } from '@common/index';
	import GuessForm from './GuessForm.svelte';
	import type { PageProps } from './$types';
	import GuessDisplay from './GuessDisplay.svelte';

	const { data }: PageProps = $props();
	let opponent = $state('');
	let gameStarted = $state(false);
	let ownGuesses: string[] = $state([]);
	let opponentGuesses: string[] = $state([]);
	const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(PUBLIC_BACKEND_URL);
	socket.on('gameStarted', (players) => {
		gameStarted = true;
		opponent = players.find((player) => player.id !== data.user!.id)!.name;
	});
	socket.on('guessAdded', (playerId, guess) => {
		if (playerId === data.user!.id) {
			ownGuesses.push(guess);
		} else {
			opponentGuesses.push(guess);
		}
	});
	onMount(() => {
		socket.emit('joinGame', data.gameId, data.user!.id, data.user!.user_metadata.name);

		return () => {
			socket.emit('leaveGame', data.gameId, data.user!.id);
		};
	});

	function addGuess(guess: string) {
		socket.emit('guessAdded', data.gameId, data.user!.id, guess);
	}
</script>

<div class="box-border flex justify-center">
	{#if gameStarted}
		<div class="flex min-w-60 flex-col gap-2">
			<p class="text-lg">You're playing against <span class="font-bold">{opponent}</span></p>
			<GuessForm onSubmit={addGuess} />
			<GuessDisplay {ownGuesses} {opponentGuesses}></GuessDisplay>
		</div>
	{:else}
		<Loader />
	{/if}
</div>
