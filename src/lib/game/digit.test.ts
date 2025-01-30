import { describe, expect, it } from 'vitest';
import { Digit, generateAscendingLine, generateDescendingLine } from './digit';

describe.concurrent('Creating digit', () => {
	it('should be unticked by default', () => {
		const actual = new Digit(12);
		expect(actual.selected).toBe(false);
	});

	it('should respect provided value', () => {
		const actual = new Digit(26);
		expect(actual.value).toBe(26);
	});
});

describe.concurrent('Manipulating digit', () => {
	it('should set ticked flag correctly', () => {
		const actual = new Digit(12);
		actual.tick();
		expect(actual.selected).toBe(true);

		actual.tick();
		expect(actual.selected).toBe(true);

		actual.untick();
		expect(actual.selected).toBe(false);

		actual.untick();
		expect(actual.selected).toBe(false);
	});

	it('should set ticked flag correctly when checking', () => {
		const actual = new Digit(12);
		actual.check(true);
		expect(actual.selected).toBe(true);

		actual.check(false);
		expect(actual.selected).toBe(false);
	});
});

describe.concurrent('Generating digits', () => {
	it('should generate 11 ascending digits', () => {
		const actual = generateAscendingLine();
		expect(actual.length).toBe(11);
	});

	it('should generate 11 descending digits', () => {
		const actual = generateDescendingLine();
		expect(actual.length).toBe(11);
	});

	it('should generate ascending digits in order', () => {
		const actual = generateAscendingLine();

		const EXPECTED_VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		actual.forEach((d, id) => expect(d.value).toBe(EXPECTED_VALUES[id]));
	});

	it('should generate descending digits in order', () => {
		const actual = generateDescendingLine();

		const EXPECTED_VALUES = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
		actual.forEach((d, id) => expect(d.value).toBe(EXPECTED_VALUES[id]));
	});

	it('should generate ascending digits unticked', () => {
		const actual = generateAscendingLine();

		actual.forEach((d) => expect(d.selected).toBe(false));
	});

	it('should generate descending digits unticked', () => {
		const actual = generateDescendingLine();

		actual.forEach((d) => expect(d.selected).toBe(false));
	});
});
