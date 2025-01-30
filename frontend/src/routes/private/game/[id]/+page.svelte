<script lang="ts">
	import { io } from 'socket.io-client';
	import type { Database } from '$lib/supabase/database.types.js';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import { string } from 'zod';
	import Loader from './Loader.svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { FormSchema } from './schema';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
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
	onMount(() => {
		const socket = io(`${PUBLIC_BACKEND_URL}`);
	});
</script>

<div class="box-border flex justify-center">
	<Loader />
</div>
