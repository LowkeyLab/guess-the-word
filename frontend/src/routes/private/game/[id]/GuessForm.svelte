<script lang="ts">
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="guess">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Guess</Form.Label>
				<Input {...props} bind:value={$formData.guess} />
			{/snippet}
		</Form.Control>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
