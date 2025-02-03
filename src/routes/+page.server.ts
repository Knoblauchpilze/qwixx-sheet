import { generateLayout } from '$lib/game/generation';
import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { generateSeed } from '$lib/game/seed';
import { loadQwixxCookies, setQwixxCookies } from '$lib/cookies';
import { DigitLayout } from '$lib/enums/digitLayout';

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

		sameDigitBonus: 3
	};
};

export const actions = {
	generate: async ({ cookies, request }: RequestEvent) => {
		const data = await request.formData();

		let seed = data.get('seed');
		if (!seed) {
			seed = generateSeed();
		}

		const settings = {
			layout: DigitLayout.CLASSIC,
			seed: seed.toString()
		};

		setQwixxCookies(cookies, settings);
	}
};
