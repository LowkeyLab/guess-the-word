<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';

	const { winningGuess, onPlayingAgain } = $props();

	beforeNavigate(() => {
		onPlayingAgain();
	});
</script>

<div class="flex w-full flex-col gap-2">
	<h1 class="text-lg font-bold">Congrats!</h1>
	<p>You both guessed <span class="font-bold">{winningGuess}</span></p>
	<Button class="self-center" href="/private/">Play Again</Button>
</div>
