import type { Digit } from './digit';

export class DigitLine {
	digits: Digit[];
	locked: boolean = false;

	constructor(digits: Digit[]) {
		this.digits = digits;
	}

	public lock() {
		this.locked = true;
	}

	public unlock() {
		this.locked = false;
	}

	public score(): number {
		const count = this.digits.reduce((sum, digit) => (digit.selected ? sum + 1 : sum), 0);

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
