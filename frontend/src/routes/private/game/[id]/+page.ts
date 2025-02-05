import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { ServerToClientEvents, ClientToServerEvents } from '@common';
import { Socket, io } from 'socket.io-client';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ params, data }) => {
	const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(PUBLIC_BACKEND_URL);
	socket.emit('joinGame', params.id, data.user.id, data.user.user_metadata.name);

	return {
		gameId: params.id,
		socket,
		...data
	};
};
