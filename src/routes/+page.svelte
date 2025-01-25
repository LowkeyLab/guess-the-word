<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { joinOrMakeGame } from '$lib/supabase/makeGame.js';
	import { redirect } from '@sveltejs/kit';
	let { data } = $props();
</script>

<div class="box-border flex justify-center">
	<div class="flex flex-col gap-4">
		<h1 class="text-3xl">Welcome, <span class="text-3xl font-bold">{data.userName}</span></h1>
		<Button class="text-lg" onclick={
			async () => {
				const game = await joinOrMakeGame(data.userId);
				redirect(303, `/game/${game.id}`);
			}
		} >Start Playing</Button>
	</div>
</div>
