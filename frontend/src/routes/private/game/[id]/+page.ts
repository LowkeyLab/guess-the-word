import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { ServerToClientEvents, ClientToServerEvents } from '@common';
import { Socket, io } from 'socket.io-client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, data }) => {
	const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(PUBLIC_BACKEND_URL);

	return {
		gameId: params.id,
		socket,
		...data
	};
};
