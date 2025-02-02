<script lang="ts">
	import { io, Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import Loader from './Loader.svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ClientToServerEvents, ServerToClientEvents } from '@common/index';
	import GuessForm from './GuessForm.svelte';
	import type { PageProps } from './$types';
	import GuessDisplay from './GuessDisplay.svelte';
	import GameFinishedBanner from './GameFinishedBanner.svelte';
	import { GameState } from './GameState.svelte';

	const { data }: PageProps = $props();
	const gameState: GameState = new GameState(data.gameId);
	const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(PUBLIC_BACKEND_URL);
	socket.on('gameStarted', (players) => {
		gameState.state = 'ongoing';
		gameState.opponentName = players.find((player) => player.id !== data.user!.id)!.name;
	});
	socket.on('guessAdded', (playerId, guess) => {
		if (playerId === data.user!.id) {
			gameState.ownGuesses.push(guess);
		} else {
			gameState.opponentGuesses.push(guess);
		}
	});
	socket.on('gameFinished', (winningGuess) => {
		console.log('game finished');
		gameState.state = 'finished';
		gameState.winningGuess = winningGuess;
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
	{#if gameState.state === 'finished'}
		<GameFinishedBanner winningGuess={gameState.winningGuess} />
	{:else if gameState.state === 'ongoing'}
		<div class="flex min-w-full flex-col gap-4">
			<p class="mx-auto text-xl">
				You're playing against <span class="font-bold">{gameState.opponentName}</span>
			</p>
			<GuessForm onSubmit={addGuess} />
			<GuessDisplay ownGuesses={gameState.ownGuesses} opponentGuesses={gameState.opponentGuesses}
			></GuessDisplay>
		</div>
	{:else}
		<Loader />
	{/if}
</div>
