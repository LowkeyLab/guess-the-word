<script lang="ts">
	import Loader from './Loader.svelte';

	const { ownGuess } = $props();
</script>

<p class="text-lg">
	You guessed <span class="font-bold">{ownGuess}</span>
</p>
<Loader />
