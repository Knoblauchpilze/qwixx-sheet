import { calculateLineScore, type DigitLine } from './line';

export interface Qwixx {
	reds: DigitLine;
	yellows: DigitLine;
	greens: DigitLine;
	blues: DigitLine;

	penalties: number;
}

export function calculateScore(qwixx: Qwixx): number {
	const positive =
		calculateLineScore(qwixx.reds) +
		calculateLineScore(qwixx.yellows) +
		calculateLineScore(qwixx.greens) +
		calculateLineScore(qwixx.blues);
	return positive + calculatePenaltyScore(qwixx);
}

export function calculatePenaltyScore(qwixx: Qwixx): number {
	if (qwixx.penalties === 0) {
		return 0;
	}

	const PENALTY = -5;
	return qwixx.penalties * PENALTY;
}
