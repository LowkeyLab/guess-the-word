import type { Player } from '@common';

export class GameState {
	id: string;
	opponent: Player | undefined = $state(undefined);
	ownGuesses: string[] = $state([]);
	opponentGuesses: string[] = $state([]);
	state: 'waiting' | 'ongoing' | 'finished' = $state('waiting');
	winningGuess: string | undefined = $state(undefined);

	constructor(id: string) {
		this.id = id;
	}

	reset() {
		this.opponent = undefined;
		this.ownGuesses = [];
		this.opponentGuesses = [];
		this.state = 'waiting';
		this.winningGuess = undefined;
	}
}
