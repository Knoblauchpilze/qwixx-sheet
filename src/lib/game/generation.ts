import { Color } from '$lib/enums/color';
import { DigitLayout } from '$lib/enums/digitLayout';
import { generateAscendingLine, generateDescendingLine, newDigit, type Digit } from './digit';

import Rand from 'rand-seed';

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
		reds: generateAscendingLine(Color.RED),
		yellows: generateAscendingLine(Color.YELLOW),
		greens: generateDescendingLine(Color.GREEN),
		blues: generateDescendingLine(Color.BLUE)
	};
}

interface DigitData {
	readonly value: number;
	colors: Color[];
}

const ALL_COLORS = [Color.RED, Color.YELLOW, Color.GREEN, Color.BLUE];
const DIGITS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const BASE_DIGIT_DATA: DigitData[] = DIGITS.map((d) => {
	return { value: d, colors: ALL_COLORS };
});

function rndInterval(rng: Rand, min: number, max: number): number {
	const perc = rng.next();
	// Does not work in case max is less than min.
	const interval = max - min;
	return min + Math.floor(perc * interval);
}

function findNextDigit(rng: Rand): { id: number; value: number } {
	const id = rndInterval(rng, 0, DIGITS.length);
	return {
		id: id,
		value: DIGITS[id]
	};
}

function generateDigitLine(color: Color, digits: DigitData[], rng: Rand): Digit[] {
	const out = [];

	while (out.length < DIGITS.length) {
		const digit = findNextDigit(rng);

		const remaining = digits[digit.id];
		const alreadyExists = out.findIndex((d) => d.value === digit.value) !== -1;

		if (!alreadyExists && remaining.colors.length > 0) {
			const colorId = rndInterval(rng, 0, remaining.colors.length);

			const digitColor = remaining.colors[colorId];
			console.log(
				'picked',
				digit.value,
				' (at ',
				digit.id,
				') with color ',
				digitColor,
				' (remaining: ',
				remaining.colors.length,
				')'
			);

			out.push(newDigit(digit.value, digitColor));

			remaining.colors.splice(colorId, 1);
		}

		out.push();
	}

	return out;
}

function generateCustomLayout(seed: string): Qwixx {
	// https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript
	const digits = JSON.parse(JSON.stringify(BASE_DIGIT_DATA));

	const rng = new Rand(seed);

	console.log('generating red');
	const reds = generateDigitLine(Color.RED, digits, rng);
	console.log('generating yellow');
	const yellows = generateDigitLine(Color.YELLOW, digits, rng);
	console.log('generating green');
	const greens = generateDigitLine(Color.GREEN, digits, rng);
	console.log('generating blue');
	const blues = generateDigitLine(Color.BLUE, digits, rng);

	return {
		reds: reds,
		yellows: yellows,
		greens: greens,
		blues: blues
	};
}

export function generateLayout(props: GenerationProps): Qwixx {
	switch (props.layout) {
		case DigitLayout.CUSTOM:
			return generateCustomLayout(props.seed);
		default:
			return generateClassicLayout();
	}
}
