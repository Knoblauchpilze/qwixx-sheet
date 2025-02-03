import { generateLayout } from '$lib/game/generation';
import { fail, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { generateSeed } from '$lib/game/seed';
import { loadQwixxCookies, setQwixxCookies } from '$lib/cookies';
import { DigitLayout } from '$lib/enums/digitLayout';
import { HttpStatus } from '@totocorpsoftwareinc/frontend-toolkit';

export const load: PageServerLoad = async ({ cookies }) => {
	const [, qwixxCookies] = loadQwixxCookies(cookies);

	const qwixx = {
		layout: qwixxCookies.layout,
		seed: qwixxCookies.seed
	};
	const digits = generateLayout(qwixx);

	return {
		reds: digits.reds,
		yellows: digits.yellows,
		greens: digits.greens,
		blues: digits.blues,

		penaltyCount: 4,
		penaltyScore: -5,

		sameDigitBonus: 3,

		seed: qwixxCookies.seed
	};
};

export const actions = {
	generate: async ({ cookies, request }: RequestEvent) => {
		const data = await request.formData();

		let seed = data.get('seed');

		const layout = data.get('layout');
		if (!layout) {
			return fail(HttpStatus.UNPROCESSABLE_ENTITY, {
				message: 'Please fill in the layout',
				seed: seed
			});
		}

		if (!seed) {
			seed = generateSeed();
		}

		const settings = {
			layout: DigitLayout[layout as keyof typeof DigitLayout],
			seed: seed.toString()
		};

		setQwixxCookies(cookies, settings);
	}
};
