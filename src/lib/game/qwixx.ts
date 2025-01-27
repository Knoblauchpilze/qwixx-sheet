import { generateAscendingLine, generateDescendingLine } from './digit';
import { DigitLine } from './line';

export class Qwixx {
	reds: DigitLine;
	yellows: DigitLine;
	greens: DigitLine;
	blues: DigitLine;

	penalties: number = 0;
	score: number = 0;

	constructor() {
		this.reds = new DigitLine(generateAscendingLine());
		this.yellows = new DigitLine(generateAscendingLine());
		this.greens = new DigitLine(generateDescendingLine());
		this.blues = new DigitLine(generateDescendingLine());
	}

	public getReds(): DigitLine {
		return this.reds;
	}

	public getYellows(): DigitLine {
		return this.yellows;
	}

	public getGreens(): DigitLine {
		return this.greens;
	}

	public getBlues(): DigitLine {
		return this.blues;
	}
}
