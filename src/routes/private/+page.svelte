<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	let { data } = $props();
</script>

<div class="box-border flex justify-center">
	<div class="flex flex-col gap-4">
		<h1 class="text-3xl">Welcome, <span class="text-3xl font-bold">{data.userName}</span></h1>
		<Button class="text-lg" href="game">Start Playing</Button>
	</div>
</div>
