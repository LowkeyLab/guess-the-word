import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user } }) => {
	if (user) {
		return { userName: user!.user_metadata.name as string };
	}
};
