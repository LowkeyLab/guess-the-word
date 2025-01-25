<script lang="ts">
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Triangle } from 'lucide-svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';
	const { children, data } = $props();
	const { supabase, session } = data;

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<title>Guess The Word</title>
<div class="mx-auto mt-2 box-border flex max-w-sm flex-col gap-6">
	<div>
		<h1 class="text-4xl font-semibold sm:text-5xl">Guess The Word</h1>
		<h2 class="pl-1 text-2xl font-light">Read each other's mind</h2>
	</div>
	<div class="flex items-center">
		<Separator class="w-2/5 flex-auto"></Separator>
		<Triangle />
		<Separator class="w-2/5 flex-auto"></Separator>
	</div>
	{@render children()}
</div>
