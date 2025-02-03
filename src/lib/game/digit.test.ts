import { describe, expect, it } from 'vitest';
import { newDigit, generateAscendingLine, generateDescendingLine } from './digit';
import { Color } from '$lib/enums/color';

const SAMPLE_COLOR = Color.RED;

describe.concurrent('Creating digit', () => {
	it('should be unticked by default', () => {
		const actual = newDigit(12, SAMPLE_COLOR);
		expect(actual.selected).toBe(false);
	});

	it('should respect provided value', () => {
		const actual = newDigit(26, SAMPLE_COLOR);
		expect(actual.value).toBe(26);
	});

	it('should respect provided color', () => {
		const actual = newDigit(17, Color.GREEN);
		expect(actual.color).toBe(Color.GREEN);
	});
});

describe.concurrent('Generating digits', () => {
	it('should generate 11 ascending digits', () => {
		const actual = generateAscendingLine(SAMPLE_COLOR);
		expect(actual.length).toBe(11);
	});

	it('should generate 11 descending digits', () => {
		const actual = generateDescendingLine(SAMPLE_COLOR);
		expect(actual.length).toBe(11);
	});

	it('should generate ascending digits in order', () => {
		const actual = generateAscendingLine(SAMPLE_COLOR);

		const EXPECTED_VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		actual.forEach((d, id) => expect(d.value).toBe(EXPECTED_VALUES[id]));
	});

	it('should generate descending digits in order', () => {
		const actual = generateDescendingLine(SAMPLE_COLOR);

		const EXPECTED_VALUES = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
		actual.forEach((d, id) => expect(d.value).toBe(EXPECTED_VALUES[id]));
	});

	it('should generate ascending digits unticked', () => {
		const actual = generateAscendingLine(SAMPLE_COLOR);
		actual.forEach((d) => expect(d.selected).toBe(false));
	});

	it('should generate descending digits unticked', () => {
		const actual = generateDescendingLine(SAMPLE_COLOR);
		actual.forEach((d) => expect(d.selected).toBe(false));
	});

	it('should generate ascending digits with expected color', () => {
		const actual = generateAscendingLine(Color.YELLOW);
		actual.forEach((d) => expect(d.color).toBe(Color.YELLOW));
	});

	it('should generate descending digits with expected color', () => {
		const actual = generateDescendingLine(Color.YELLOW);
		actual.forEach((d) => expect(d.color).toBe(Color.YELLOW));
	});
});
