<script lang="ts">
	const { winningGuess } = $props();
</script>

<div class="flex flex-col gap-2">
	<h1 class="self-center text-2xl font-bold">Congrats!</h1>
	<p>You both guessed <span class="font-bold">{winningGuess}</span></p>
	<p>Thanks for playing!</p>
</div>
