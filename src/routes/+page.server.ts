import { redirect } from '@sveltejs/kit';
import type {PageServerLoad } from './$types';
import { supabase } from '$lib/supabase/supabaseClient';

export const load: PageServerLoad = async ({cookies}) => {
	const userId = cookies.get('userId');
	if (!userId) {
		redirect(303, '/login');
	}
	const loggedInUser = (await supabase.auth.getUser()).data.user;
	const userName = loggedInUser?.user_metadata.name as string;
	return { userId, userName };
};

