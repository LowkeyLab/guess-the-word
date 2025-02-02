<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import GameFinishedBanner from './GameFinishedBanner.svelte';
	import { GameState } from './GameState.svelte';
	import GuessDisplay from './GuessDisplay.svelte';
	import GuessForm from './GuessForm.svelte';
	import Loader from './Loader.svelte';

	const { data }: PageProps = $props();
	const gameState: GameState = new GameState(data.gameId);
	const { socket } = data;
	socket.on('gameStarted', (players) => {
		gameState.state = 'ongoing';
		gameState.opponent = players.find((player) => player.id !== data.user!.id);
	});
	socket.on('roundEnded', (guesses) => {
		for (const guess of guesses) {
			if (guess.playerId === data.user!.id) {
				gameState.ownGuesses.push(guess.guess);
			} else {
				gameState.opponentGuesses.push(guess.guess);
			}
		}
	});
	socket.on('gameFinished', (winningGuess) => {
		console.log('game finished');
		gameState.state = 'finished';
		gameState.winningGuess = winningGuess;
	});
	socket.on('leftGame', (playerId) => {
		if (playerId === gameState.opponent?.id) {
			gameState.state = 'waiting';
			gameState.opponent = undefined;
		}
	});

	onMount(() => {
		socket.emit('joinGame', data.gameId, data.user.id, data.user.user_metadata.name);
	});

	function addGuess(guess: string) {
		socket.emit('guessAdded', data.gameId, data.user!.id, guess);
	}

	function resetGame() {
		gameState.reset();
	}
</script>

<div class="box-border flex">
	{#if gameState.state === 'finished'}
		<GameFinishedBanner winningGuess={gameState.winningGuess} />
	{:else if gameState.state === 'ongoing'}
		<div class="flex flex-col gap-4">
			<p class="text-xl">
				You're playing against <span class="font-bold">{gameState.opponent?.name}</span>
			</p>
			<GuessForm onSubmit={addGuess} />
			<GuessDisplay ownGuesses={gameState.ownGuesses} opponentGuesses={gameState.opponentGuesses}
			></GuessDisplay>
		</div>
	{:else}
		<Loader />
	{/if}
</div>
