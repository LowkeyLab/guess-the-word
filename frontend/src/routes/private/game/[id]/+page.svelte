<script lang="ts">
	import { io, Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import Loader from './Loader.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { FormSchema } from './schema';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ClientToServerEvents, ServerToClientEvents } from '@common/index';
	interface Props {
		data: {
			user: {
				id: string;
				user_metadata: {
					name: string;
				};
			};
			form: SuperValidated<Infer<FormSchema>>;
			gameId: string;
		};
	}

	const { data }: Props = $props();

	onMount(() => {
		// please note that the types are reversed
		const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(PUBLIC_BACKEND_URL);
		socket.emit('joinGame', data.gameId, data.user.id, data.user.user_metadata.name);
	});
</script>

<div class="box-border flex justify-center">
	<Loader />
</div>
