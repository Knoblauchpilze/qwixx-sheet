import type { Digit } from './digit';

export class DigitLine {
	digits: Digit[];
	locked: boolean = false;

	score: number = 0;

	constructor(digits: Digit[]) {
		this.digits = digits;
	}

	public lock() {
		this.locked = true;
	}

	public unlock() {
		this.locked = false;
	}
}
