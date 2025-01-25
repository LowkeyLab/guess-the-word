<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { redirect } from '@sveltejs/kit';
	let { data } = $props();
</script>

<div class="box-border flex justify-center">
	<div class="flex flex-col gap-4">
		<h1 class="text-3xl">Welcome, <span class="text-3xl font-bold">{data.userName}</span></h1>
		<Button
			class="text-lg"
			onclick={async () => {
				const response = await fetch('/api/game', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				const { id } = await response.json();
				if (id !== undefined) {
					redirect(303, `/game/${id}`);
				}
			}}>Start Playing</Button
		>
	</div>
</div>
