import { describe, expect, it } from 'vitest';
import { calculateLineScore, checkDigit } from './line';
import { newDigit, generateAscendingLine, generateDescendingLine } from './digit';

describe.concurrent('Manipulating line', () => {
	it('ticking digit should update score', () => {
		const line = generateAscendingLine();
		expect(calculateLineScore(line)).toBe(0);

		line[1].selected = true;
		expect(calculateLineScore(line)).toBe(1);
	});

	it('ticking already ticked digit should not update score', () => {
		const line = generateAscendingLine();
		expect(calculateLineScore(line)).toBe(0);

		line[1].selected = true;
		expect(calculateLineScore(line)).toBe(1);

		line[1].selected = true;
		expect(calculateLineScore(line)).toBe(1);
	});

	it('unticking digit should update score', () => {
		const line = generateAscendingLine();
		line[1].selected = true;
		expect(calculateLineScore(line)).toBe(1);

		line[1].selected = false;
		expect(calculateLineScore(line)).toBe(0);
	});

	it('unticking already unticked digit should not update score', () => {
		const line = generateAscendingLine();
		line[1].selected = true;
		expect(calculateLineScore(line)).toBe(1);

		line[1].selected = false;
		expect(calculateLineScore(line)).toBe(0);

		line[1].selected = false;
		expect(calculateLineScore(line)).toBe(0);
	});
});

describe.concurrent('Manupulating digits', () => {
	const SAMPLE_DIGITS = [newDigit(1), newDigit(2)];

	it('should disregard invalid indices', () => {
		const line = SAMPLE_DIGITS;

		checkDigit(line, -2, true);
		let actual = line.findIndex((d) => d.selected === true);
		expect(actual).toBe(-1);

		checkDigit(line, 26, true);
		actual = line.findIndex((d) => d.selected === true);
		expect(actual).toBe(-1);
	});

	it('should tick digit when allowed', () => {
		const line = SAMPLE_DIGITS;
		checkDigit(line, 0, true);
		expect(line.at(0)?.selected).toBe(true);
		expect(line.at(1)?.selected).toBe(false);
	});

	it('should return true when tick is successful', () => {
		const line = SAMPLE_DIGITS;
		const actual = checkDigit(line, 0, true);
		expect(actual).toBe(true);
	});

	it('should return false when tick is not successful', () => {
		const line = SAMPLE_DIGITS;

		let actual = checkDigit(line, -1, true);
		expect(actual).toBe(false);

		actual = checkDigit(line, 6, true);
		expect(actual).toBe(false);

		actual = checkDigit(line, 1, true);
		expect(actual).toBe(false);
	});

	it('when ticking multiple times should keep the digit ticked', () => {
		const line = SAMPLE_DIGITS;
		checkDigit(line, 0, true);
		expect(line.at(0)?.selected).toBe(true);

		checkDigit(line, 0, true);
		expect(line.at(0)?.selected).toBe(true);
	});

	it('should untick digit when allowed', () => {
		const line = SAMPLE_DIGITS;
		checkDigit(line, 0, true);

		checkDigit(line, 0, false);
		expect(line.at(0)?.selected).toBe(false);
		expect(line.at(1)?.selected).toBe(false);
	});

	it('should return false when untick is successful', () => {
		const line = SAMPLE_DIGITS;
		const actual = checkDigit(line, 0, false);
		expect(actual).toBe(false);
	});

	it('should return false when untick is not successful', () => {
		const line = SAMPLE_DIGITS;

		let actual = checkDigit(line, -1, false);
		expect(actual).toBe(false);

		actual = checkDigit(line, 6, false);
		expect(actual).toBe(false);
	});

	it('when unticking multiple times should keep the digit unticked', () => {
		const line = SAMPLE_DIGITS;
		checkDigit(line, 0, true);

		checkDigit(line, 0, false);
		expect(line.at(0)?.selected).toBe(false);

		checkDigit(line, 0, false);
		expect(line.at(0)?.selected).toBe(false);
	});

	it('should prevent ticking last digit when not enough digits are ticked', () => {
		const line = generateAscendingLine();

		const actual = checkDigit(line, 10, true);
		expect(actual).toBe(false);
	});

	it('should allow ticking last digit when enough digits are ticked', () => {
		const line = generateAscendingLine();

		checkDigit(line, 0, true);
		checkDigit(line, 1, true);
		checkDigit(line, 4, true);
		checkDigit(line, 7, true);

		let actual = checkDigit(line, 10, true);
		expect(actual).toBe(false);

		checkDigit(line, 8, true);

		actual = checkDigit(line, 10, true);
		expect(actual).toBe(true);
	});

	it('should not allow ticking a digit when a bigger one is ticked', () => {
		const line = generateAscendingLine();
		checkDigit(line, 2, true);

		const actual = checkDigit(line, 0, true);
		expect(actual).toBe(false);
	});
});

describe.concurrent('Calculating score', () => {
	it('with 0 digits ticked', () => {
		const line = generateAscendingLine();
		expect(calculateLineScore(line)).toBe(0);
	});

	it('with 1 digit ticked', () => {
		const line = generateAscendingLine();
		line[0].selected = true;

		expect(calculateLineScore(line)).toBe(1);
	});

	it('with 2 digits ticked', () => {
		const line = generateAscendingLine();
		line[0].selected = true;
		line[2].selected = true;

		expect(calculateLineScore(line)).toBe(3);
	});

	it('with 3 digits ticked', () => {
		const line = generateDescendingLine();
		line[1].selected = true;
		line[3].selected = true;
		line[5].selected = true;

		expect(calculateLineScore(line)).toBe(6);
	});

	it('with 4 digits ticked', () => {
		const line = generateDescendingLine();
		line[0].selected = true;
		line[1].selected = true;
		line[2].selected = true;
		line[3].selected = true;

		expect(calculateLineScore(line)).toBe(10);
	});

	it('with 5 digits ticked', () => {
		const line = generateAscendingLine();
		line[2].selected = true;
		line[4].selected = true;
		line[6].selected = true;
		line[8].selected = true;
		line[9].selected = true;

		expect(calculateLineScore(line)).toBe(15);
	});

	it('with 6 digits ticked', () => {
		const line = generateAscendingLine();
		line[5].selected = true;
		line[4].selected = true;
		line[3].selected = true;
		line[2].selected = true;
		line[1].selected = true;
		line[0].selected = true;

		expect(calculateLineScore(line)).toBe(21);
	});

	it('with 7 digits ticked', () => {
		const line = generateAscendingLine();
		line[2].selected = true;
		line[3].selected = true;
		line[4].selected = true;
		line[5].selected = true;
		line[6].selected = true;
		line[7].selected = true;
		line[9].selected = true;

		expect(calculateLineScore(line)).toBe(28);
	});

	it('with 8 digits ticked', () => {
		const line = generateAscendingLine();
		line[2].selected = true;
		line[3].selected = true;
		line[4].selected = true;
		line[5].selected = true;
		line[6].selected = true;
		line[7].selected = true;
		line[8].selected = true;
		line[9].selected = true;

		expect(calculateLineScore(line)).toBe(36);
	});

	it('with 9 digits ticked', () => {
		const line = generateAscendingLine();
		line[1].selected = true;
		line[2].selected = true;
		line[3].selected = true;
		line[4].selected = true;
		line[5].selected = true;
		line[6].selected = true;
		line[7].selected = true;
		line[8].selected = true;
		line[9].selected = true;

		expect(calculateLineScore(line)).toBe(45);
	});

	it('with 10 digits ticked', () => {
		const line = generateAscendingLine();
		line[0].selected = true;
		line[1].selected = true;
		line[2].selected = true;
		line[3].selected = true;
		line[4].selected = true;
		line[5].selected = true;
		line[6].selected = true;
		line[7].selected = true;
		line[8].selected = true;
		line[9].selected = true;

		expect(calculateLineScore(line)).toBe(55);
	});

	it('with 11 digit ticked expect bonus to be applied', () => {
		const line = generateAscendingLine();
		line[0].selected = true;
		line[1].selected = true;
		line[2].selected = true;
		line[3].selected = true;
		line[4].selected = true;
		line[5].selected = true;
		line[6].selected = true;
		line[7].selected = true;
		line[8].selected = true;
		line[9].selected = true;
		line[10].selected = true;

		expect(calculateLineScore(line)).toBe(78);
	});

	it('when last digit is ticked expect bonus to be applied', () => {
		const line = generateAscendingLine();
		line[2].selected = true;
		line[5].selected = true;
		line[6].selected = true;
		line[7].selected = true;
		line[9].selected = true;
		line[10].selected = true;

		expect(calculateLineScore(line)).toBe(28);
	});
});
