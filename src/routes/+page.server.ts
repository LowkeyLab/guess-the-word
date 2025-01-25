import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { user } = await safeGetSession();
	if (!user) {
		redirect(303, '/login');
	}
	const userName = user.user_metadata.name as string;
	return { userName };
};
