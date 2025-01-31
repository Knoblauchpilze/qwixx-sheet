import { generateAscendingLine, generateDescendingLine } from './digit';
import { DigitLine } from './line';

export class Qwixx {
	reds: DigitLine;
	yellows: DigitLine;
	greens: DigitLine;
	blues: DigitLine;

	penalties: number = 0;

	constructor() {
		this.reds = new DigitLine(generateAscendingLine());
		this.yellows = new DigitLine(generateAscendingLine());
		this.greens = new DigitLine(generateDescendingLine());
		this.blues = new DigitLine(generateDescendingLine());
	}

	public addPenalty() {
		++this.penalties;
		if (this.penalties > 4) {
			this.penalties = 4;
		}
	}

	public removePenalty() {
		--this.penalties;
		if (this.penalties < 0) {
			this.penalties = 0;
		}
	}

	public clearPenalties() {
		this.penalties = 0;
	}

	public score(): number {
		const positive =
			this.reds.score() + this.yellows.score() + this.greens.score() + this.blues.score();
		return positive + this.penaltyScore();
	}

	public penaltyScore(): number {
		if (this.penalties === 0) {
			return 0;
		}

		const PENALTY = -5;
		return this.penalties * PENALTY;
	}
}
