import { DigitLayout } from '$lib/enums/digitLayout';

export interface QwixxSettingsResponseDto {
	readonly layout: DigitLayout;
	readonly seed: string;
}
