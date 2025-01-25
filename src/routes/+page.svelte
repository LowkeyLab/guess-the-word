<script lang="ts">
	import { PUBLIC_REST_URL } from '$env/static/public';
	import Button from '$lib/components/ui/button/button.svelte';
	let gameId = '';
	async function makeGame() {
		const res = await fetch(PUBLIC_REST_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		gameId = await res.json();
	}

	let { data } = $props();
</script>

<div class="box-border flex justify-center">
	<div class="flex flex-col gap-4">
		<h1 class="text-3xl">Welcome, <span class="text-3xl font-bold">{data.name}</span></h1>
		<Button class="text-lg" onclick={makeGame}>Start Playing</Button>
	</div>
</div>
