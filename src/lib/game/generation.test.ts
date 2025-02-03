import { describe, expect, it } from 'vitest';
import { Color } from '$lib/enums/color';
import { generateLayout } from './generation';
import { DigitLayout } from '$lib/enums/digitLayout';

const SAMPLE_SEED = 'myseed';
const ASCENDING_DIGITS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const DESCENDING_DIGITS = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

function sortNumerically(array: number[]): number[] {
	return array.sort((lhs, rhs) => lhs - rhs);
}

describe.concurrent('Generating classic layout', () => {
	it('should generate uniformly colored lines', () => {
		const actual = generateLayout({ layout: DigitLayout.CLASSIC, seed: '' });

		actual.reds.forEach((d) => expect(d.color).toBe(Color.RED));
		actual.yellows.forEach((d) => expect(d.color).toBe(Color.YELLOW));
		actual.greens.forEach((d) => expect(d.color).toBe(Color.GREEN));
		actual.blues.forEach((d) => expect(d.color).toBe(Color.BLUE));
	});

	it('should generate unticked digits', () => {
		const actual = generateLayout({ layout: DigitLayout.CLASSIC, seed: '' });

		actual.reds.forEach((d) => expect(d.selected).toBe(false));
		actual.yellows.forEach((d) => expect(d.selected).toBe(false));
		actual.greens.forEach((d) => expect(d.selected).toBe(false));
		actual.blues.forEach((d) => expect(d.selected).toBe(false));
	});

	it('should generate red line in ascending order', () => {
		const qwixx = generateLayout({ layout: DigitLayout.CLASSIC, seed: '' });
		const digits = qwixx.reds.map((d) => d.value);
		expect(digits).toEqual(ASCENDING_DIGITS);
	});

	it('should generate yellow line in ascending order', () => {
		const qwixx = generateLayout({ layout: DigitLayout.CLASSIC, seed: '' });
		const digits = qwixx.yellows.map((d) => d.value);
		expect(digits).toEqual(ASCENDING_DIGITS);
	});

	it('should generate green line in descending order', () => {
		const qwixx = generateLayout({ layout: DigitLayout.CLASSIC, seed: '' });
		const digits = qwixx.greens.map((d) => d.value);
		expect(digits).toEqual(DESCENDING_DIGITS);
	});

	it('should generate blue line in descending order', () => {
		const qwixx = generateLayout({ layout: DigitLayout.CLASSIC, seed: '' });
		const digits = qwixx.blues.map((d) => d.value);
		expect(digits).toEqual(DESCENDING_DIGITS);
	});
});

describe.concurrent('Generating custom layout', () => {
	it('should generate lines with all digits', () => {
		const qwixx = generateLayout({ layout: DigitLayout.CUSTOM, seed: SAMPLE_SEED });

		// https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers
		const reds = sortNumerically(qwixx.reds.map((d) => d.value));
		const yellows = sortNumerically(qwixx.yellows.map((d) => d.value));
		const greens = sortNumerically(qwixx.greens.map((d) => d.value));
		const blues = sortNumerically(qwixx.blues.map((d) => d.value));

		expect(reds).toEqual(ASCENDING_DIGITS);
		expect(yellows).toEqual(ASCENDING_DIGITS);
		expect(greens).toEqual(ASCENDING_DIGITS);
		expect(blues).toEqual(ASCENDING_DIGITS);
	});

	it('should generate unticked lines', () => {
		const qwixx = generateLayout({ layout: DigitLayout.CUSTOM, seed: SAMPLE_SEED });

		expect(qwixx.reds.findIndex((d) => d.selected === true)).toEqual(-1);
		expect(qwixx.yellows.findIndex((d) => d.selected === true)).toEqual(-1);
		expect(qwixx.greens.findIndex((d) => d.selected === true)).toEqual(-1);
		expect(qwixx.blues.findIndex((d) => d.selected === true)).toEqual(-1);
	});

	it('should contain all red digits', () => {
		const qwixx = generateLayout({ layout: DigitLayout.CUSTOM, seed: SAMPLE_SEED });

		const reds = qwixx.reds.filter((d) => d.color === Color.RED);
		reds.push(...qwixx.yellows.filter((d) => d.color === Color.RED));
		reds.push(...qwixx.greens.filter((d) => d.color === Color.RED));
		reds.push(...qwixx.blues.filter((d) => d.color === Color.RED));

		const actual = sortNumerically(reds.map((d) => d.value));
		expect(actual).toEqual(ASCENDING_DIGITS);
	});

	it('should contain all yellow digits', () => {
		const qwixx = generateLayout({ layout: DigitLayout.CUSTOM, seed: SAMPLE_SEED });

		const yellows = qwixx.reds.filter((d) => d.color === Color.RED);
		yellows.push(...qwixx.yellows.filter((d) => d.color === Color.RED));
		yellows.push(...qwixx.greens.filter((d) => d.color === Color.RED));
		yellows.push(...qwixx.blues.filter((d) => d.color === Color.RED));

		const actual = sortNumerically(yellows.map((d) => d.value));
		expect(actual).toEqual(ASCENDING_DIGITS);
	});

	it('should contain all green digits', () => {
		const qwixx = generateLayout({ layout: DigitLayout.CUSTOM, seed: SAMPLE_SEED });

		const greens = qwixx.reds.filter((d) => d.color === Color.RED);
		greens.push(...qwixx.yellows.filter((d) => d.color === Color.RED));
		greens.push(...qwixx.greens.filter((d) => d.color === Color.RED));
		greens.push(...qwixx.blues.filter((d) => d.color === Color.RED));

		const actual = sortNumerically(greens.map((d) => d.value));
		expect(actual).toEqual(ASCENDING_DIGITS);
	});

	it('should contain all blue digits', () => {
		const qwixx = generateLayout({ layout: DigitLayout.CUSTOM, seed: SAMPLE_SEED });

		const blues = qwixx.reds.filter((d) => d.color === Color.RED);
		blues.push(...qwixx.yellows.filter((d) => d.color === Color.RED));
		blues.push(...qwixx.greens.filter((d) => d.color === Color.RED));
		blues.push(...qwixx.blues.filter((d) => d.color === Color.RED));

		const actual = sortNumerically(blues.map((d) => d.value));
		expect(actual).toEqual(ASCENDING_DIGITS);
	});
});
