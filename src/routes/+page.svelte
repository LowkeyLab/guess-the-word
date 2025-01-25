<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	async function makeGame() {
		console.log('button pressed');
	}

	let { data } = $props();
</script>

<div class="box-border flex justify-center">
	<div class="flex flex-col gap-4">
		<h1 class="text-3xl">Welcome, <span class="text-3xl font-bold">{data.name}</span></h1>
		<Button class="text-lg" onclick={makeGame}>Start Playing</Button>
	</div>
</div>
