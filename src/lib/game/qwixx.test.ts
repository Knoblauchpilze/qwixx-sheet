import { describe, expect, it } from 'vitest';
import { newDigitLine } from './line';
import { calculatePenaltyScore, calculateScore, type Qwixx } from './qwixx';
import { generateAscendingLine, generateDescendingLine } from './digit';

function createSampleGame(): Qwixx {
	return {
		reds: newDigitLine(generateAscendingLine()),
		yellows: newDigitLine(generateAscendingLine()),
		greens: newDigitLine(generateDescendingLine()),
		blues: newDigitLine(generateDescendingLine()),
		penalties: 0
	};
}

describe.concurrent('Manipulating penalty score', () => {
	it('should yield 0 with no penalties', () => {
		const game = createSampleGame();
		const actual = calculatePenaltyScore(game);
		expect(actual).toBe(0);
	});

	it('should be -5 with one penalty', () => {
		const game = createSampleGame();
		game.penalties = 1;
		const actual = calculatePenaltyScore(game);
		expect(actual).toBe(-5);
	});

	it('should be -10 with two penalties', () => {
		const game = createSampleGame();
		game.penalties = 2;
		const actual = calculatePenaltyScore(game);
		expect(actual).toBe(-10);
	});
});

describe.concurrent('Manipulating score', () => {
	it('should be 0 with no penalties and no digit ticked', () => {
		const game = createSampleGame();
		expect(calculateScore(game)).toBe(0);
	});

	it('with 1 digit ticked', () => {
		const game = createSampleGame();
		game.reds.digits[0].selected = true;
		expect(calculateScore(game)).toBe(1);
	});

	it('with 1 digit ticked in two lines', () => {
		const game = createSampleGame();
		game.reds.digits[0].selected = true;
		game.blues.digits[3].selected = true;
		expect(calculateScore(game)).toBe(2);
	});

	it('with 2 digits in a single line', () => {
		const game = createSampleGame();
		game.reds.digits[0].selected = true;
		game.reds.digits[3].selected = true;
		expect(calculateScore(game)).toBe(3);
	});

	it('with 1 penalty', () => {
		const game = createSampleGame();
		game.penalties = 1;
		expect(calculateScore(game)).toBe(-5);
	});

	it('with 3 digits in two different lines and 1 penalty', () => {
		const game = createSampleGame();
		game.yellows.digits[8].selected = true;
		game.yellows.digits[7].selected = true;
		game.greens.digits[2].selected = true;
		game.penalties = 1;
		expect(calculateScore(game)).toBe(-1);
	});
});
