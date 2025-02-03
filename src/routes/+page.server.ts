import { DigitLayout } from '$lib/enums/digitLayout';
import { generateLayout } from '$lib/game/generation';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const qwixx = {
		layout: DigitLayout.CLASSIC,
		seed: 'hello'
	};
	const digits = generateLayout(qwixx);

	return {
		reds: digits.reds,
		yellows: digits.yellows,
		greens: digits.greens,
		blues: digits.blues,

		penaltyCount: 4,
		penaltyScore: -5
	};
};
