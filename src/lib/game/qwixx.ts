import { generateAscendingLine, generateDescendingLine } from './digit';
import { calculateScore, newDigitLine, type DigitLine } from './line';

export class Qwixx {
	reds: DigitLine;
	yellows: DigitLine;
	greens: DigitLine;
	blues: DigitLine;

	penalties: number = 0;

	constructor() {
		this.reds = newDigitLine(generateAscendingLine());
		this.yellows = newDigitLine(generateAscendingLine());
		this.greens = newDigitLine(generateDescendingLine());
		this.blues = newDigitLine(generateDescendingLine());
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
			calculateScore(this.reds) +
			calculateScore(this.yellows) +
			calculateScore(this.greens) +
			calculateScore(this.blues);
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
