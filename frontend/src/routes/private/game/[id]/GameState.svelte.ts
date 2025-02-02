export class GameState {
	id: string;
	opponentName: string = $state('');
	ownGuesses: string[] = $state([]);
	opponentGuesses: string[] = $state([]);
	state: 'waiting' | 'ongoing' | 'finished' = $state('waiting');
	winningGuess: string | undefined = $state(undefined);

	constructor(id: string) {
		this.id = id;
	}
}
