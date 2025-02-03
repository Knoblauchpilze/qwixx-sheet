import { type Cookies } from '@sveltejs/kit';
import { DigitLayout } from './enums/digitLayout';
import type { QwixxSettingsResponseDto } from './communication/api/qwixxSettingsResponseDto';

const DEFAULT_COOKIES_OPT = {
	path: '/'
};

const COOKIE_KEY_LAYOUT = 'layout-type';
const COOKIE_KEY_SEED = 'layout-seed';

export { COOKIE_KEY_LAYOUT, COOKIE_KEY_SEED };

function validOrEmptyString(maybeValue: string | undefined, valid: boolean): string {
	return valid ? (maybeValue as string) : '';
}

export interface QwixxCookies {
	readonly layout: DigitLayout;
	readonly seed: string;
}

export function setQwixxCookies(cookies: Cookies, settings: QwixxSettingsResponseDto) {
	cookies.set(COOKIE_KEY_LAYOUT, settings.layout.toString(), DEFAULT_COOKIES_OPT);
	cookies.set(COOKIE_KEY_SEED, settings.seed, DEFAULT_COOKIES_OPT);
}

export function resetQwixxCookies(cookies: Cookies) {
	cookies.set(COOKIE_KEY_LAYOUT, '', DEFAULT_COOKIES_OPT);
	cookies.set(COOKIE_KEY_SEED, '', DEFAULT_COOKIES_OPT);
}

export function loadQwixxCookies(cookies: Cookies): [boolean, QwixxCookies] {
	const maybeLayout = cookies.get(COOKIE_KEY_LAYOUT);
	const maybeSeed = cookies.get(COOKIE_KEY_SEED);

	const validLayout = maybeLayout !== undefined && maybeLayout !== '';
	const validSeed = maybeSeed !== undefined && maybeSeed !== '';

	const layoutStr = validOrEmptyString(maybeLayout, validLayout);
	// https://stackoverflow.com/questions/17380845/how-do-i-convert-a-string-to-enum-in-typescript
	const layout =
		layoutStr === '' ? DigitLayout.CLASSIC : DigitLayout[layoutStr as keyof typeof DigitLayout];

	const out: QwixxCookies = {
		layout: layout,
		seed: validOrEmptyString(maybeSeed, validSeed)
	};

	// On purpose: we don't necessarily have a seed.
	return [validLayout, out];
}
