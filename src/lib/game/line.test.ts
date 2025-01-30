import { describe, expect, it } from 'vitest';
import { DigitLine } from './line';
import { Digit, generateAscendingLine, generateDescendingLine } from './digit';

describe.concurrent('Creating line', () => {
	it('ascending line should contain expected digits', () => {
		const EXPECTED_DIGITS = [new Digit(1), new Digit(2)];
		const actual = new DigitLine(EXPECTED_DIGITS);

		expect(actual.digits).toBe(EXPECTED_DIGITS);
	});

	it('ascending line should be unlocked', () => {
		const actual = new DigitLine(generateAscendingLine());
		expect(actual.locked).toBe(false);
	});

	it('descending line should be unlocked', () => {
		const actual = new DigitLine(generateDescendingLine());
		expect(actual.locked).toBe(false);
	});
});

describe.concurrent('Manipulating line', () => {
	it('calling lock should lock the line', () => {
		const actual = new DigitLine(generateAscendingLine());
		expect(actual.locked).toBe(false);
		actual.lock();
		expect(actual.locked).toBe(true);
	});

	it('calling unlock should unlock the line', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.lock();
		expect(actual.locked).toBe(true);
		actual.unlock();
		expect(actual.locked).toBe(false);
	});
});

describe.concurrent('Calculating score', () => {
	it('with 0 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		expect(actual.score()).toBe(0);
	});

	it('with 1 digit ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(0)?.tick();

		expect(actual.score()).toBe(1);
	});

	it('with 2 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(0)?.tick();
		actual.digits.at(2)?.tick();

		expect(actual.score()).toBe(3);
	});

	it('with 3 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(1)?.tick();
		actual.digits.at(3)?.tick();
		actual.digits.at(5)?.tick();

		expect(actual.score()).toBe(6);
	});

	it('with 4 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(0)?.tick();
		actual.digits.at(1)?.tick();
		actual.digits.at(2)?.tick();
		actual.digits.at(3)?.tick();

		expect(actual.score()).toBe(10);
	});

	it('with 5 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(2)?.tick();
		actual.digits.at(4)?.tick();
		actual.digits.at(6)?.tick();
		actual.digits.at(8)?.tick();
		actual.digits.at(10)?.tick();

		expect(actual.score()).toBe(15);
	});

	it('with 6 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(5)?.tick();
		actual.digits.at(4)?.tick();
		actual.digits.at(3)?.tick();
		actual.digits.at(2)?.tick();
		actual.digits.at(1)?.tick();
		actual.digits.at(0)?.tick();

		expect(actual.score()).toBe(21);
	});

	it('with 7 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(2)?.tick();
		actual.digits.at(3)?.tick();
		actual.digits.at(4)?.tick();
		actual.digits.at(5)?.tick();
		actual.digits.at(6)?.tick();
		actual.digits.at(7)?.tick();
		actual.digits.at(10)?.tick();

		expect(actual.score()).toBe(28);
	});

	it('with 8 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(2)?.tick();
		actual.digits.at(3)?.tick();
		actual.digits.at(4)?.tick();
		actual.digits.at(5)?.tick();
		actual.digits.at(6)?.tick();
		actual.digits.at(7)?.tick();
		actual.digits.at(8)?.tick();
		actual.digits.at(10)?.tick();

		expect(actual.score()).toBe(36);
	});

	it('with 9 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(2)?.tick();
		actual.digits.at(3)?.tick();
		actual.digits.at(4)?.tick();
		actual.digits.at(5)?.tick();
		actual.digits.at(6)?.tick();
		actual.digits.at(7)?.tick();
		actual.digits.at(8)?.tick();
		actual.digits.at(9)?.tick();
		actual.digits.at(10)?.tick();

		expect(actual.score()).toBe(45);
	});

	it('with 10 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(1)?.tick();
		actual.digits.at(2)?.tick();
		actual.digits.at(3)?.tick();
		actual.digits.at(4)?.tick();
		actual.digits.at(5)?.tick();
		actual.digits.at(6)?.tick();
		actual.digits.at(7)?.tick();
		actual.digits.at(8)?.tick();
		actual.digits.at(9)?.tick();
		actual.digits.at(10)?.tick();

		expect(actual.score()).toBe(55);
	});

	it('with 11 digit ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits.at(0)?.tick();
		actual.digits.at(1)?.tick();
		actual.digits.at(2)?.tick();
		actual.digits.at(3)?.tick();
		actual.digits.at(4)?.tick();
		actual.digits.at(5)?.tick();
		actual.digits.at(6)?.tick();
		actual.digits.at(7)?.tick();
		actual.digits.at(8)?.tick();
		actual.digits.at(9)?.tick();
		actual.digits.at(10)?.tick();

		expect(actual.score()).toBe(66);
	});
});
