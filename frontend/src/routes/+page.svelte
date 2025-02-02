<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="box-border flex flex-col justify-center gap-2">
	<div>
		<h1 class="text-2xl font-bold">How it works</h1>
		<p>Each round, come up with a word</p>
		<p>Once both players guess the same word, you win!</p>
	</div>
	<Button class="mx-auto rounded-lg text-lg" href="/private/game">Start Playing</Button>
</div>
