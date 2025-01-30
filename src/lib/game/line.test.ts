import { describe, expect, it } from 'vitest';
import { DigitLine } from './line';
import { Digit, generateAscendingLine, generateDescendingLine } from './digit';

describe.concurrent('Creating line', () => {
	it('ascending line should contain expected digits', () => {
		const EXPECTED_DIGITS = [new Digit(1), new Digit(2)];
		const actual = new DigitLine(EXPECTED_DIGITS);

		expect(actual.digits).toBe(EXPECTED_DIGITS);
	});
});

describe.concurrent('Manipulating line', () => {
	it('ticking digit should update score', () => {
		const actual = new DigitLine(generateAscendingLine());
		expect(actual.score()).toBe(0);

		actual.digits.at(1)?.check(true);
		expect(actual.score()).toBe(1);
	});

	it('ticking already ticked digit should not update score', () => {
		const actual = new DigitLine(generateAscendingLine());
		expect(actual.score()).toBe(0);

		actual.digits.at(1)?.check(true);
		expect(actual.score()).toBe(1);

		actual.digits.at(1)?.check(true);
		expect(actual.score()).toBe(1);
	});

	it('unticking digit should update score', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(1)?.check(true);
		expect(actual.score()).toBe(1);

		actual.digits.at(1)?.check(false);
		expect(actual.score()).toBe(0);
	});

	it('unticking already unticked digit should not update score', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(1)?.check(true);
		expect(actual.score()).toBe(1);

		actual.digits.at(1)?.check(false);
		expect(actual.score()).toBe(0);

		actual.digits.at(1)?.check(false);
		expect(actual.score()).toBe(0);
	});
});

describe.concurrent('Calculating score', () => {
	it('with 0 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		expect(actual.score()).toBe(0);
	});

	it('with 1 digit ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(0)?.check(true);

		expect(actual.score()).toBe(1);
	});

	it('with 2 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(0)?.check(true);
		actual.digits.at(2)?.check(true);

		expect(actual.score()).toBe(3);
	});

	it('with 3 digits ticked', () => {
		const actual = new DigitLine(generateDescendingLine());
		actual.digits.at(1)?.check(true);
		actual.digits.at(3)?.check(true);
		actual.digits.at(5)?.check(true);

		expect(actual.score()).toBe(6);
	});

	it('with 4 digits ticked', () => {
		const actual = new DigitLine(generateDescendingLine());
		actual.digits.at(0)?.check(true);
		actual.digits.at(1)?.check(true);
		actual.digits.at(2)?.check(true);
		actual.digits.at(3)?.check(true);

		expect(actual.score()).toBe(10);
	});

	it('with 5 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(2)?.check(true);
		actual.digits.at(4)?.check(true);
		actual.digits.at(6)?.check(true);
		actual.digits.at(8)?.check(true);
		actual.digits.at(10)?.check(true);

		expect(actual.score()).toBe(15);
	});

	it('with 6 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(5)?.check(true);
		actual.digits.at(4)?.check(true);
		actual.digits.at(3)?.check(true);
		actual.digits.at(2)?.check(true);
		actual.digits.at(1)?.check(true);
		actual.digits.at(0)?.check(true);

		expect(actual.score()).toBe(21);
	});

	it('with 7 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(2)?.check(true);
		actual.digits.at(3)?.check(true);
		actual.digits.at(4)?.check(true);
		actual.digits.at(5)?.check(true);
		actual.digits.at(6)?.check(true);
		actual.digits.at(7)?.check(true);
		actual.digits.at(10)?.check(true);

		expect(actual.score()).toBe(28);
	});

	it('with 8 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(2)?.check(true);
		actual.digits.at(3)?.check(true);
		actual.digits.at(4)?.check(true);
		actual.digits.at(5)?.check(true);
		actual.digits.at(6)?.check(true);
		actual.digits.at(7)?.check(true);
		actual.digits.at(8)?.check(true);
		actual.digits.at(10)?.check(true);

		expect(actual.score()).toBe(36);
	});

	it('with 9 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(2)?.check(true);
		actual.digits.at(3)?.check(true);
		actual.digits.at(4)?.check(true);
		actual.digits.at(5)?.check(true);
		actual.digits.at(6)?.check(true);
		actual.digits.at(7)?.check(true);
		actual.digits.at(8)?.check(true);
		actual.digits.at(9)?.check(true);
		actual.digits.at(10)?.check(true);

		expect(actual.score()).toBe(45);
	});

	it('with 10 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(1)?.check(true);
		actual.digits.at(2)?.check(true);
		actual.digits.at(3)?.check(true);
		actual.digits.at(4)?.check(true);
		actual.digits.at(5)?.check(true);
		actual.digits.at(6)?.check(true);
		actual.digits.at(7)?.check(true);
		actual.digits.at(8)?.check(true);
		actual.digits.at(9)?.check(true);
		actual.digits.at(10)?.check(true);

		expect(actual.score()).toBe(55);
	});

	it('with 11 digit ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(0)?.check(true);
		actual.digits.at(1)?.check(true);
		actual.digits.at(2)?.check(true);
		actual.digits.at(3)?.check(true);
		actual.digits.at(4)?.check(true);
		actual.digits.at(5)?.check(true);
		actual.digits.at(6)?.check(true);
		actual.digits.at(7)?.check(true);
		actual.digits.at(8)?.check(true);
		actual.digits.at(9)?.check(true);
		actual.digits.at(10)?.check(true);

		expect(actual.score()).toBe(66);
	});
});
