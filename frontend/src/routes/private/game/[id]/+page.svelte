<script lang="ts">
	import type { Database } from '$lib/supabase/database.types.js';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import { string } from 'zod';
	import Loader from './Loader.svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { FormSchema } from './schema';
	interface Props {
		data: {
			supabase: SupabaseClient<Database>;
			game: {
				id: number;
			};
			user: {
				id: string;
				user_metadata: {
					name: string;
				};
			};
			form: SuperValidated<Infer<FormSchema>>;
		};
	}

	interface Player {
		id: string;
		name: string;
		guesses: string[];
	}
</script>

<div class="box-border flex justify-center">
	<Loader />
</div>
