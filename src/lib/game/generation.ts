import { DigitLayout } from '$lib/enums/digitLayout';
import { generateAscendingLine, generateDescendingLine, type Digit } from './digit';

export interface GenerationProps {
	readonly layout: DigitLayout;
	readonly seed: string;
}

export interface Qwixx {
	readonly reds: Digit[];
	readonly yellows: Digit[];
	readonly greens: Digit[];
	readonly blues: Digit[];
}

function generateClassicLayout(): Qwixx {
	return {
		reds: generateAscendingLine(),
		yellows: generateAscendingLine(),
		greens: generateDescendingLine(),
		blues: generateDescendingLine()
	};
}

function generateCustomLayout(seed: string): Qwixx {
	console.log('seed: ', seed);
	return generateClassicLayout();
}

export function generateLayout(props: GenerationProps): Qwixx {
	switch (props.layout) {
		case DigitLayout.CUSTOM:
			return generateCustomLayout(props.seed);
		default:
			return generateClassicLayout();
	}
}
