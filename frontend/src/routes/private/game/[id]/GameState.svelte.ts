import type { Player } from '@common';

export class GameState {
	opponent: Player | undefined = $state(undefined);
	rounds: Round[] = $state([new Round()]);
	ownGuesses: string[] = $derived(
		this.rounds.map((round) => round.ownGuess).filter((guess) => guess !== undefined)
	);
	opponentGuesses: string[] = $derived(
		this.rounds.map((round) => round.opponentGuess).filter((guess) => guess !== undefined)
	);
	state: 'waiting' | 'ongoing' | 'finished' = $state('waiting');
	winningGuess: string | undefined = $state(undefined);
	waitingForOpponent = $state(false);

	reset() {
		this.opponent = undefined;
		this.ownGuesses = [];
		this.opponentGuesses = [];
		this.state = 'waiting';
		this.winningGuess = undefined;
	}
}

export class Round {
	ownGuess: string | undefined = $state(undefined);
	opponentGuess: string | undefined = $state(undefined);
}
