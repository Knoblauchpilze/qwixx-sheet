import type { Digit } from './digit';

export interface DigitLine {
	digits: Digit[];
}

export function newDigitLine(digits: Digit[]): DigitLine {
	return {
		digits: digits
	};
}

function countTickedDigits(line: DigitLine): number {
	return line.digits.reduce((sum, digit) => (digit.selected ? sum + 1 : sum), 0);
}

export function calculateLineScore(line: DigitLine): number {
	const count = countTickedDigits(line);

	// TODO: it seems there's a bonus equal to the amount of digits
	// ticked plus one.
	switch (count) {
		case 1:
			return 1;
		case 2:
			return 3;
		case 3:
			return 6;
		case 4:
			return 10;
		case 5:
			return 15;
		case 6:
			return 21;
		case 7:
			return 28;
		case 8:
			return 36;
		case 9:
			return 45;
		case 10:
			return 55;
		case 11:
			return 66;
		default:
			return 0;
	}
}

export function checkDigit(line: DigitLine, index: number, ticked: boolean): boolean {
	if (index < 0 || index >= line.digits.length) {
		return false;
	}

	if (ticked && index === line.digits.length - 1) {
		const MINIMUM_DIGIT_TO_TICK_LAST_ONE = 5;
		if (countTickedDigits(line) < MINIMUM_DIGIT_TO_TICK_LAST_ONE) {
			return false;
		}
	}

	line.digits[index].selected = ticked;
	return ticked;
}
