import { describe, expect, it } from 'vitest';
import { calculateScore, checkDigit, newDigitLine } from './line';
import { newDigit, generateAscendingLine, generateDescendingLine } from './digit';

describe.concurrent('Creating line', () => {
	it('ascending line should contain expected digits', () => {
		const EXPECTED_DIGITS = [newDigit(1), newDigit(2)];
		const line = newDigitLine(EXPECTED_DIGITS);
		expect(line.digits).toBe(EXPECTED_DIGITS);
	});
});

describe.concurrent('Manipulating line', () => {
	it('ticking digit should update score', () => {
		const line = newDigitLine(generateAscendingLine());
		expect(calculateScore(line)).toBe(0);

		line.digits[1].selected = true;
		expect(calculateScore(line)).toBe(1);
	});

	it('ticking already ticked digit should not update score', () => {
		const line = newDigitLine(generateAscendingLine());
		expect(calculateScore(line)).toBe(0);

		line.digits[1].selected = true;
		expect(calculateScore(line)).toBe(1);

		line.digits[1].selected = true;
		expect(calculateScore(line)).toBe(1);
	});

	it('unticking digit should update score', () => {
		const line = newDigitLine(generateAscendingLine());
		line.digits[1].selected = true;
		expect(calculateScore(line)).toBe(1);

		line.digits[1].selected = false;
		expect(calculateScore(line)).toBe(0);
	});

	it('unticking already unticked digit should not update score', () => {
		const line = newDigitLine(generateAscendingLine());
		line.digits[1].selected = true;
		expect(calculateScore(line)).toBe(1);

		line.digits[1].selected = false;
		expect(calculateScore(line)).toBe(0);

		line.digits[1].selected = false;
		expect(calculateScore(line)).toBe(0);
	});
});

describe.concurrent('Manupulating digits', () => {
	const SAMPLE_DIGITS = [newDigit(1), newDigit(2)];

	it('should disregard invalid indices', () => {
		const line = newDigitLine(SAMPLE_DIGITS);

		checkDigit(line, -2, true);
		let actual = line.digits.findIndex((d) => d.selected === true);
		expect(actual).toBe(-1);

		checkDigit(line, 26, true);
		actual = line.digits.findIndex((d) => d.selected === true);
		expect(actual).toBe(-1);
	});

	it('should tick digit when allowed', () => {
		const line = newDigitLine(SAMPLE_DIGITS);
		checkDigit(line, 0, true);
		expect(line.digits.at(0)?.selected).toBe(true);
		expect(line.digits.at(1)?.selected).toBe(false);
	});

	it('should return true when tick is successful', () => {
		const line = newDigitLine(SAMPLE_DIGITS);
		const actual = checkDigit(line, 0, true);
		expect(actual).toBe(true);
	});

	it('should return false when tick is not successful', () => {
		const line = newDigitLine(SAMPLE_DIGITS);

		let actual = checkDigit(line, -1, true);
		expect(actual).toBe(false);

		actual = checkDigit(line, 6, true);
		expect(actual).toBe(false);

		actual = checkDigit(line, 1, true);
		expect(actual).toBe(false);
	});

	it('when ticking multiple times should keep the digit ticked', () => {
		const line = newDigitLine(SAMPLE_DIGITS);
		checkDigit(line, 0, true);
		expect(line.digits.at(0)?.selected).toBe(true);

		checkDigit(line, 0, true);
		expect(line.digits.at(0)?.selected).toBe(true);
	});

	it('should untick digit when allowed', () => {
		const line = newDigitLine(SAMPLE_DIGITS);
		checkDigit(line, 0, true);

		checkDigit(line, 0, false);
		expect(line.digits.at(0)?.selected).toBe(false);
		expect(line.digits.at(1)?.selected).toBe(false);
	});

	it('should return false when untick is successful', () => {
		const line = newDigitLine(SAMPLE_DIGITS);
		const actual = checkDigit(line, 0, false);
		expect(actual).toBe(false);
	});

	it('should return false when untick is not successful', () => {
		const line = newDigitLine(SAMPLE_DIGITS);

		let actual = checkDigit(line, -1, false);
		expect(actual).toBe(false);

		actual = checkDigit(line, 6, false);
		expect(actual).toBe(false);
	});

	it('when unticking multiple times should keep the digit unticked', () => {
		const line = newDigitLine(SAMPLE_DIGITS);
		checkDigit(line, 0, true);

		checkDigit(line, 0, false);
		expect(line.digits.at(0)?.selected).toBe(false);

		checkDigit(line, 0, false);
		expect(line.digits.at(0)?.selected).toBe(false);
	});

	it('should prevent ticking last digit when not enough digits are ticked', () => {
		const line = newDigitLine(generateAscendingLine());

		const actual = checkDigit(line, 10, true);
		expect(actual).toBe(false);
	});

	it('should allow ticking last digit when enough digits are ticked', () => {
		const line = newDigitLine(generateAscendingLine());

		checkDigit(line, 0, true);
		checkDigit(line, 4, true);
		checkDigit(line, 7, true);
		checkDigit(line, 1, true);

		let actual = checkDigit(line, 10, true);
		expect(actual).toBe(false);

		checkDigit(line, 2, true);

		actual = checkDigit(line, 10, true);
		expect(actual).toBe(true);
	});

	it('should allow unticking last digit even when not enough digits are ticked anymore', () => {
		const line = newDigitLine(generateAscendingLine());

		checkDigit(line, 0, true);
		checkDigit(line, 4, true);
		checkDigit(line, 7, true);
		checkDigit(line, 1, true);

		let actual = checkDigit(line, 10, true);
		expect(actual).toBe(false);

		checkDigit(line, 2, true);

		actual = checkDigit(line, 10, true);
		expect(actual).toBe(true);

		checkDigit(line, 6, false);

		actual = checkDigit(line, 10, false);
		expect(actual).toBe(false);
		expect(line.digits.at(10)?.selected).toBe(false);
	});
});

describe.concurrent('Calculating score', () => {
	it('with 0 digits ticked', () => {
		const line = newDigitLine(generateAscendingLine());
		expect(calculateScore(line)).toBe(0);
	});

	it('with 1 digit ticked', () => {
		const line = newDigitLine(generateAscendingLine());
		line.digits[0].selected = true;

		expect(calculateScore(line)).toBe(1);
	});

	it('with 2 digits ticked', () => {
		const line = newDigitLine(generateAscendingLine());
		line.digits[0].selected = true;
		line.digits[2].selected = true;

		expect(calculateScore(line)).toBe(3);
	});

	it('with 3 digits ticked', () => {
		const line = newDigitLine(generateDescendingLine());
		line.digits[1].selected = true;
		line.digits[3].selected = true;
		line.digits[5].selected = true;

		expect(calculateScore(line)).toBe(6);
	});

	it('with 4 digits ticked', () => {
		const line = newDigitLine(generateDescendingLine());
		line.digits[0].selected = true;
		line.digits[1].selected = true;
		line.digits[2].selected = true;
		line.digits[3].selected = true;

		expect(calculateScore(line)).toBe(10);
	});

	it('with 5 digits ticked', () => {
		const line = newDigitLine(generateAscendingLine());
		line.digits[2].selected = true;
		line.digits[4].selected = true;
		line.digits[6].selected = true;
		line.digits[8].selected = true;
		line.digits[10].selected = true;

		expect(calculateScore(line)).toBe(15);
	});

	it('with 6 digits ticked', () => {
		const line = newDigitLine(generateAscendingLine());
		line.digits[5].selected = true;
		line.digits[4].selected = true;
		line.digits[3].selected = true;
		line.digits[2].selected = true;
		line.digits[1].selected = true;
		line.digits[0].selected = true;

		expect(calculateScore(line)).toBe(21);
	});

	it('with 7 digits ticked', () => {
		const line = newDigitLine(generateAscendingLine());
		line.digits[2].selected = true;
		line.digits[3].selected = true;
		line.digits[4].selected = true;
		line.digits[5].selected = true;
		line.digits[6].selected = true;
		line.digits[7].selected = true;
		line.digits[10].selected = true;

		expect(calculateScore(line)).toBe(28);
	});

	it('with 8 digits ticked', () => {
		const line = newDigitLine(generateAscendingLine());
		line.digits[2].selected = true;
		line.digits[3].selected = true;
		line.digits[4].selected = true;
		line.digits[5].selected = true;
		line.digits[6].selected = true;
		line.digits[7].selected = true;
		line.digits[8].selected = true;
		line.digits[10].selected = true;

		expect(calculateScore(line)).toBe(36);
	});

	it('with 9 digits ticked', () => {
		const line = newDigitLine(generateAscendingLine());
		line.digits[2].selected = true;
		line.digits[3].selected = true;
		line.digits[4].selected = true;
		line.digits[5].selected = true;
		line.digits[6].selected = true;
		line.digits[7].selected = true;
		line.digits[8].selected = true;
		line.digits[9].selected = true;
		line.digits[10].selected = true;

		expect(calculateScore(line)).toBe(45);
	});

	it('with 10 digits ticked', () => {
		const line = newDigitLine(generateAscendingLine());
		line.digits[1].selected = true;
		line.digits[2].selected = true;
		line.digits[3].selected = true;
		line.digits[4].selected = true;
		line.digits[5].selected = true;
		line.digits[6].selected = true;
		line.digits[7].selected = true;
		line.digits[8].selected = true;
		line.digits[9].selected = true;
		line.digits[10].selected = true;

		expect(calculateScore(line)).toBe(55);
	});

	it('with 11 digit ticked', () => {
		const line = newDigitLine(generateAscendingLine());
		line.digits[0].selected = true;
		line.digits[1].selected = true;
		line.digits[2].selected = true;
		line.digits[3].selected = true;
		line.digits[4].selected = true;
		line.digits[5].selected = true;
		line.digits[6].selected = true;
		line.digits[7].selected = true;
		line.digits[8].selected = true;
		line.digits[9].selected = true;
		line.digits[10].selected = true;

		expect(calculateScore(line)).toBe(66);
	});
});
