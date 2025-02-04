<script lang="ts">
	import Loader from './Loader.svelte';

	const { ownGuess } = $props();
</script>

<div>
	<p>
		You guessed <span class="font-bold">{ownGuess}</span>
	</p>
	<div class="mt-2">
		<Loader />
	</div>
</div>
