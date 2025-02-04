<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import GameFinishedBanner from './GameFinishedBanner.svelte';
	import { GameState, Round } from './GameState.svelte';
	import GuessDisplay from './GuessDisplay.svelte';
	import GuessForm from './GuessForm.svelte';
	import Loader from './Loader.svelte';
	import WaitingForOpponent from './WaitingForOpponent.svelte';

	const { data }: PageProps = $props();
	const gameState: GameState = new GameState();
	const { socket } = data;
	socket.on('gameStarted', (players) => {
		gameState.state = 'ongoing';
		gameState.opponent = players.find((player) => player.id !== data.user!.id);
	});
	socket.on('roundEnded', (guesses) => {
		for (const guess of guesses) {
			if (guess.playerId !== data.user!.id) {
				gameState.rounds.at(-1)!.opponentGuess = guess.guess;
				gameState.rounds.push(new Round());
				gameState.waitingForOpponent = false;
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
		gameState.rounds.at(-1)!.ownGuess = guess;
		socket.emit('guessAdded', data.gameId, data.user!.id, guess);
		gameState.waitingForOpponent = true;
	}
</script>

<div class="box-border flex">
	{#if gameState.state === 'finished'}
		<GameFinishedBanner winningGuess={gameState.winningGuess} />
	{:else if gameState.state === 'ongoing'}
		<div class="flex flex-col gap-2">
			<p>
				You're playing against <span class="font-bold">{gameState.opponent?.name}</span>
			</p>
			{#if gameState.waitingForOpponent}
				<WaitingForOpponent ownGuess={gameState.rounds.at(-1)!.ownGuess}></WaitingForOpponent>
			{:else}
				<GuessForm onSubmit={addGuess} />
				<GuessDisplay ownGuesses={gameState.ownGuesses} opponentGuesses={gameState.opponentGuesses}
				></GuessDisplay>
			{/if}
		</div>
	{:else}
		<Loader />
	{/if}
</div>
