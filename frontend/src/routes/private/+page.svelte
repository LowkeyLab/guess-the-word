<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	let { data } = $props();
	const { userName } = data;
</script>

<div class="box-border flex justify-center">
	<div class="flex flex-col gap-4">
		<h1 class="text-xl">Welcome, <span class="text-xl font-bold">{userName}</span></h1>
		<Button href="/private/game">Start Playing</Button>
	</div>
</div>
