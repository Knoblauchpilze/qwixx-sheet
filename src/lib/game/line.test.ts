import { describe, expect, it } from 'vitest';
import { DigitLine } from './line';
import { newDigit, generateAscendingLine, generateDescendingLine } from './digit';

describe.concurrent('Creating line', () => {
	it('ascending line should contain expected digits', () => {
		const EXPECTED_DIGITS = [newDigit(1), newDigit(2)];
		const actual = new DigitLine(EXPECTED_DIGITS);

		expect(actual.digits).toBe(EXPECTED_DIGITS);
	});
});

describe.concurrent('Manipulating line', () => {
	it('ticking digit should update score', () => {
		const actual = new DigitLine(generateAscendingLine());
		expect(actual.score()).toBe(0);

		actual.digits[1].selected = true;
		expect(actual.score()).toBe(1);
	});

	it('ticking already ticked digit should not update score', () => {
		const actual = new DigitLine(generateAscendingLine());
		expect(actual.score()).toBe(0);

		actual.digits[1].selected = true;
		expect(actual.score()).toBe(1);

		actual.digits[1].selected = true;
		expect(actual.score()).toBe(1);
	});

	it('unticking digit should update score', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits[1].selected = true;
		expect(actual.score()).toBe(1);

		actual.digits[1].selected = false;
		expect(actual.score()).toBe(0);
	});

	it('unticking already unticked digit should not update score', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits[1].selected = true;
		expect(actual.score()).toBe(1);

		actual.digits[1].selected = false;
		expect(actual.score()).toBe(0);

		actual.digits[1].selected = false;
		expect(actual.score()).toBe(0);
	});
});

describe.concurrent('Manupulating digits', () => {
	const SAMPLE_DIGITS = [newDigit(1), newDigit(2)];

	it('should disregard invalid indices', () => {
		const line = new DigitLine(SAMPLE_DIGITS);

		line.check(-2, true);
		let actual = line.digits.findIndex((d) => d.selected === true);
		expect(actual).toBe(-1);

		line.check(26, true);
		actual = line.digits.findIndex((d) => d.selected === true);
		expect(actual).toBe(-1);
	});

	it('should tick digit when allowed', () => {
		const line = new DigitLine(SAMPLE_DIGITS);
		line.check(0, true);
		expect(line.digits.at(0)?.selected).toBe(true);
		expect(line.digits.at(1)?.selected).toBe(false);
	});

	it('should return true when tick is successful', () => {
		const line = new DigitLine(SAMPLE_DIGITS);
		const actual = line.check(0, true);
		expect(actual).toBe(true);
	});

	it('should return false when tick is not successful', () => {
		const line = new DigitLine(SAMPLE_DIGITS);

		let actual = line.check(-1, true);
		expect(actual).toBe(false);

		actual = line.check(6, true);
		expect(actual).toBe(false);

		actual = line.check(1, true);
		expect(actual).toBe(false);
	});

	it('when ticking multiple times should keep the digit ticked', () => {
		const line = new DigitLine(SAMPLE_DIGITS);
		line.check(0, true);
		expect(line.digits.at(0)?.selected).toBe(true);

		line.check(0, true);
		expect(line.digits.at(0)?.selected).toBe(true);
	});

	it('should untick digit when allowed', () => {
		const line = new DigitLine(SAMPLE_DIGITS);
		line.check(0, true);

		line.check(0, false);
		expect(line.digits.at(0)?.selected).toBe(false);
		expect(line.digits.at(1)?.selected).toBe(false);
	});

	it('should return false when untick is successful', () => {
		const line = new DigitLine(SAMPLE_DIGITS);
		const actual = line.check(0, false);
		expect(actual).toBe(false);
	});

	it('should return false when untick is not successful', () => {
		const line = new DigitLine(SAMPLE_DIGITS);

		let actual = line.check(-1, false);
		expect(actual).toBe(false);

		actual = line.check(6, false);
		expect(actual).toBe(false);
	});

	it('when unticking multiple times should keep the digit unticked', () => {
		const line = new DigitLine(SAMPLE_DIGITS);
		line.check(0, true);

		line.check(0, false);
		expect(line.digits.at(0)?.selected).toBe(false);

		line.check(0, false);
		expect(line.digits.at(0)?.selected).toBe(false);
	});

	it('should prevent ticking last digit when not enough digits are ticked', () => {
		const line = new DigitLine(generateAscendingLine());

		const actual = line.check(10, true);
		expect(actual).toBe(false);
	});

	it('should allow ticking last digit when enough digits are ticked', () => {
		const line = new DigitLine(generateAscendingLine());

		line.check(0, true);
		line.check(4, true);
		line.check(7, true);
		line.check(1, true);

		let actual = line.check(10, true);
		expect(actual).toBe(false);

		line.check(2, true);

		actual = line.check(10, true);
		expect(actual).toBe(true);
	});

	it('should allow unticking last digit even when not enough digits are ticked anymore', () => {
		const line = new DigitLine(generateAscendingLine());

		line.check(0, true);
		line.check(4, true);
		line.check(7, true);
		line.check(1, true);

		let actual = line.check(10, true);
		expect(actual).toBe(false);

		line.check(2, true);

		actual = line.check(10, true);
		expect(actual).toBe(true);

		line.check(6, false);

		actual = line.check(10, false);
		expect(actual).toBe(false);
		expect(line.digits.at(10)?.selected).toBe(false);
	});
});

describe.concurrent('Calculating score', () => {
	it('with 0 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		expect(actual.score()).toBe(0);
	});

	it('with 1 digit ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits[0].selected = true;

		expect(actual.score()).toBe(1);
	});

	it('with 2 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits[0].selected = true;
		actual.digits[2].selected = true;

		expect(actual.score()).toBe(3);
	});

	it('with 3 digits ticked', () => {
		const actual = new DigitLine(generateDescendingLine());
		actual.digits[1].selected = true;
		actual.digits[3].selected = true;
		actual.digits[5].selected = true;

		expect(actual.score()).toBe(6);
	});

	it('with 4 digits ticked', () => {
		const actual = new DigitLine(generateDescendingLine());
		actual.digits[0].selected = true;
		actual.digits[1].selected = true;
		actual.digits[2].selected = true;
		actual.digits[3].selected = true;

		expect(actual.score()).toBe(10);
	});

	it('with 5 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits[2].selected = true;
		actual.digits[4].selected = true;
		actual.digits[6].selected = true;
		actual.digits[8].selected = true;
		actual.digits[10].selected = true;

		expect(actual.score()).toBe(15);
	});

	it('with 6 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits[5].selected = true;
		actual.digits[4].selected = true;
		actual.digits[3].selected = true;
		actual.digits[2].selected = true;
		actual.digits[1].selected = true;
		actual.digits[0].selected = true;

		expect(actual.score()).toBe(21);
	});

	it('with 7 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits[2].selected = true;
		actual.digits[3].selected = true;
		actual.digits[4].selected = true;
		actual.digits[5].selected = true;
		actual.digits[6].selected = true;
		actual.digits[7].selected = true;
		actual.digits[10].selected = true;

		expect(actual.score()).toBe(28);
	});

	it('with 8 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits[2].selected = true;
		actual.digits[3].selected = true;
		actual.digits[4].selected = true;
		actual.digits[5].selected = true;
		actual.digits[6].selected = true;
		actual.digits[7].selected = true;
		actual.digits[8].selected = true;
		actual.digits[10].selected = true;

		expect(actual.score()).toBe(36);
	});

	it('with 9 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits[2].selected = true;
		actual.digits[3].selected = true;
		actual.digits[4].selected = true;
		actual.digits[5].selected = true;
		actual.digits[6].selected = true;
		actual.digits[7].selected = true;
		actual.digits[8].selected = true;
		actual.digits[9].selected = true;
		actual.digits[10].selected = true;

		expect(actual.score()).toBe(45);
	});

	it('with 10 digits ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits[1].selected = true;
		actual.digits[2].selected = true;
		actual.digits[3].selected = true;
		actual.digits[4].selected = true;
		actual.digits[5].selected = true;
		actual.digits[6].selected = true;
		actual.digits[7].selected = true;
		actual.digits[8].selected = true;
		actual.digits[9].selected = true;
		actual.digits[10].selected = true;

		expect(actual.score()).toBe(55);
	});

	it('with 11 digit ticked', () => {
		const actual = new DigitLine(generateAscendingLine());
		actual.digits[0].selected = true;
		actual.digits[1].selected = true;
		actual.digits[2].selected = true;
		actual.digits[3].selected = true;
		actual.digits[4].selected = true;
		actual.digits[5].selected = true;
		actual.digits[6].selected = true;
		actual.digits[7].selected = true;
		actual.digits[8].selected = true;
		actual.digits[9].selected = true;
		actual.digits[10].selected = true;

		expect(actual.score()).toBe(66);
	});
});
