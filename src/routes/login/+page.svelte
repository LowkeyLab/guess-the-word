<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import { schema } from './schema.js';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance } = form;
</script>

<div class="mt-8 flex justify-center">
	<form method="POST" use:enhance>
		<div class="flex h-48 min-w-80 flex-col justify-between gap-2 px-6 lg:px-8">
			<Form.Field {form} name="username">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class="text-xl">Name</Form.Label>
						<Input {...props} bind:value={$formData.username} />
					{/snippet}
				</Form.Control>
				<Form.Description>This is your public display name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button class="justify-self-end text-lg">Submit</Form.Button>
		</div>
	</form>
</div>
