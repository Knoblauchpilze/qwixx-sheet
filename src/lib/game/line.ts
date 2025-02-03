import type { Digit } from './digit';

function countTickedDigits(line: Digit[]): number {
	return line.reduce((sum, digit) => (digit.selected ? sum + 1 : sum), 0);
}

function scoreFromNumberOfDigitsChecked(digitsTicked: number): number {
	switch (digitsTicked) {
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
		case 12:
			return 78;
		default:
			return 0;
	}
}

function scoreFromLastDigitTicked(lastDigitTicked: boolean, digitsTicked: number): number {
	if (!lastDigitTicked) {
		return 0;
	}

	const scoreWithoutBonus = scoreFromNumberOfDigitsChecked(digitsTicked);
	const scoreWithAdditionalDigitTickedForClosingTheLine = scoreFromNumberOfDigitsChecked(
		digitsTicked + 1
	);

	return scoreWithAdditionalDigitTickedForClosingTheLine - scoreWithoutBonus;
}

export function calculateLineScore(line: Digit[]): number {
	const count = countTickedDigits(line);
	const scoreFromCount = scoreFromNumberOfDigitsChecked(count);
	// http://middys.nsv.de/wp-content/uploads/2018/01/qwixx-classic-english.pdf
	// https://stackoverflow.com/questions/58780817/using-optional-chaining-operator-for-object-property-access
	const scoreFromLastDigit = scoreFromLastDigitTicked(line.at(-1)?.selected ?? false, count);

	return scoreFromCount + scoreFromLastDigit;
}

function isLastDigitClickedWithoutMinimumRequirement(
	line: Digit[],
	index: number,
	ticked: boolean
): boolean {
	if (!ticked) {
		return false;
	}

	if (index !== line.length - 1) {
		return false;
	}

	const MINIMUM_DIGIT_TO_TICK_LAST_ONE = 5;
	return countTickedDigits(line) < MINIMUM_DIGIT_TO_TICK_LAST_ONE;
}

function isDigitClickedWhenHigherOneAlreadyTicked(line: Digit[], index: number): boolean {
	const lastSelected = line.findLastIndex((d) => d.selected === true);
	return index < lastSelected;
}

export function checkDigit(line: Digit[], index: number, ticked: boolean): boolean {
	if (index < 0 || index >= line.length) {
		return false;
	}

	if (isLastDigitClickedWithoutMinimumRequirement(line, index, ticked)) {
		return false;
	}

	if (isDigitClickedWhenHigherOneAlreadyTicked(line, index)) {
		return false;
	}

	line[index].selected = ticked;
	return ticked;
}
