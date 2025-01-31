import type { Digit } from './digit';

export class DigitLine {
	digits: Digit[];

	constructor(digits: Digit[]) {
		this.digits = digits;
	}

	private countTickedDigits(): number {
		return this.digits.reduce((sum, digit) => (digit.selected ? sum + 1 : sum), 0);
	}

	public check(index: number, ticked: boolean): boolean {
		if (index < 0 || index >= this.digits.length) {
			return false;
		}

		if (ticked && index === this.digits.length - 1) {
			const MINIMUM_DIGIT_TO_TICK_LAST_ONE = 5;
			if (this.countTickedDigits() < MINIMUM_DIGIT_TO_TICK_LAST_ONE) {
				return false;
			}
		}

		this.digits.at(index)?.check(ticked);
		return ticked;
	}

	public score(): number {
		const count = this.countTickedDigits();

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
}
