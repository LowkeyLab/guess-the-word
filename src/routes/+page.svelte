<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	let name = $state('');
	let nameSubmitted = $state(false);
	let gameStarted = $derived(name !== '' && nameSubmitted);
</script>

<div class="mt-8 flex justify-center">
	{#if !gameStarted}
		<div class="flex flex-col justify-center gap-4">
			<Input class="text-xl" bind:value={name} placeholder="Enter your name" />
			<Button
				class="text-xl"
				onclick={() => {
					nameSubmitted = true;
				}}>Start Playing!</Button
			>
		</div>
	{:else}
		<div class="text-2xl">
			Hi {name}! Let's play!
		</div>
	{/if}
</div>
