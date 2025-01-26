import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user } }) => {
	if (user) {
		const { name: userName }: { name: string } = user!.user_metadata.name;
		return { userName };
	}
};
