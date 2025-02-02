<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	let { onSubmit } = $props();
	let guess = $state('');
	let valid = $derived(!(guess.trim() === '' || guess.length > 20));
</script>

<div class="box-border flex flex-col gap-1.5">
	<Label for="guess">Your guess</Label>
	<Input id="guess" type="text" bind:value={guess}></Input>
	<Button
		class="mx-auto w-32 text-lg"
		disabled={!valid}
		onclick={() => {
			onSubmit(guess);
			guess = '';
		}}>Submit</Button
	>
</div>
