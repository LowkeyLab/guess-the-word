<script lang="ts">
	let { ownGuesses, opponentGuesses } = $props();
</script>

<div class="box-border flex flex-col gap-2">
	<div>
		<h1 class="text-2xl font-bold">Guesses</h1>
		<p>Your guesses: {ownGuesses.join(', ')}</p>
		<p>Opponent's guesses: {opponentGuesses.join(', ')}</p>
	</div>
</div>
