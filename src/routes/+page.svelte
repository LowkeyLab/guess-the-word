<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	let name: string = $state() as string;
</script>

<div class="mx-auto max-w-7xl px-6 lg:px-8">
	<h1 class="text-5xl font-semibold sm:text-7xl">Guess The Word</h1>
	<h2 class="mt-4 text-3xl font-light">Come up with the same word as your opponent</h2>
	<div class="mt-8 flex justify-center">
		<div class="flex flex-col justify-center gap-4">
			<Input class="text-xl" bind:value={name} placeholder="Enter your name" />
			<Button class="text-xl">Start Game</Button>
		</div>
	</div>
</div>
