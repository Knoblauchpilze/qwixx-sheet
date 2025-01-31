import { describe, expect, it } from 'vitest';
import { Qwixx } from './qwixx';

describe.concurrent('Creating qwixx', () => {
	it('should have red digits as ascending', () => {
		const game = new Qwixx();
		const actual = game.reds.digits.map((d) => d.value);

		const EXPECTED_DIGITS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		expect(actual).toEqual(EXPECTED_DIGITS);
	});

	it('should have yellow digits as ascending', () => {
		const game = new Qwixx();
		const actual = game.yellows.digits.map((d) => d.value);

		const EXPECTED_DIGITS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		expect(actual).toEqual(EXPECTED_DIGITS);
	});

	it('should have green digits as descending', () => {
		const game = new Qwixx();
		const actual = game.greens.digits.map((d) => d.value);

		const EXPECTED_DIGITS = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
		expect(actual).toEqual(EXPECTED_DIGITS);
	});

	it('should have blue digits as descending', () => {
		const game = new Qwixx();
		const actual = game.blues.digits.map((d) => d.value);

		const EXPECTED_DIGITS = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
		expect(actual).toEqual(EXPECTED_DIGITS);
	});

	it('should not have any digit ticked', () => {
		const game = new Qwixx();

		let actual = game.reds.digits.findIndex((d) => d.selected === true);
		expect(actual).toBe(-1);

		actual = game.yellows.digits.findIndex((d) => d.selected === true);
		expect(actual).toBe(-1);

		actual = game.greens.digits.findIndex((d) => d.selected === true);
		expect(actual).toBe(-1);

		actual = game.blues.digits.findIndex((d) => d.selected === true);
		expect(actual).toBe(-1);
	});

	it('should have a score of 0', () => {
		const game = new Qwixx();
		expect(game.score()).toBe(0);
	});

	it('should have 0 penalties', () => {
		const game = new Qwixx();
		expect(game.penalties).toBe(0);
	});

	it('should have a penalty score of 0', () => {
		const game = new Qwixx();
		expect(game.penaltyScore()).toBe(0);
	});
});

describe.concurrent('Manipulating penalties', () => {
	it('should cap at 4 penalties', () => {
		const game = new Qwixx();

		game.addPenalty();
		expect(game.penalties).toBe(1);

		game.addPenalty();
		expect(game.penalties).toBe(2);

		game.addPenalty();
		expect(game.penalties).toBe(3);

		game.addPenalty();
		expect(game.penalties).toBe(4);

		game.addPenalty();
		expect(game.penalties).toBe(4);
	});

	it('should not go below 0 penalties', () => {
		const game = new Qwixx();
		game.removePenalty();
		expect(game.penalties).toBe(0);
	});

	it('should clear all penalties when requested', () => {
		const game = new Qwixx();
		game.clearPenalties();
		expect(game.penalties).toBe(0);

		game.addPenalty();
		expect(game.penalties).toBe(1);
		game.clearPenalties();
		expect(game.penalties).toBe(0);

		game.addPenalty();
		game.addPenalty();
		expect(game.penalties).toBe(2);
		game.clearPenalties();
		expect(game.penalties).toBe(0);

		game.clearPenalties();
		expect(game.penalties).toBe(0);
	});

	it('should allow to remove penalties in a row', () => {
		const game = new Qwixx();
		game.addPenalty();
		game.addPenalty();
		game.addPenalty();
		expect(game.penalties).toBe(3);

		game.removePenalty();
		expect(game.penalties).toBe(2);

		game.removePenalty();
		expect(game.penalties).toBe(1);

		game.removePenalty();
		expect(game.penalties).toBe(0);

		game.removePenalty();
		expect(game.penalties).toBe(0);
	});
});

describe.concurrent('Manipulating penalty score', () => {
	it('should yield 0 with no penalties', () => {
		const game = new Qwixx();
		const actual = game.penaltyScore();
		expect(actual).toBe(0);
	});

	it('should be -5 with one penalty', () => {
		const game = new Qwixx();
		game.addPenalty();
		const actual = game.penaltyScore();
		expect(actual).toBe(-5);
	});

	it('should be -10 with two penalties', () => {
		const game = new Qwixx();
		game.addPenalty();
		game.addPenalty();
		const actual = game.penaltyScore();
		expect(actual).toBe(-10);
	});
});

describe.concurrent('Manipulating score', () => {
	it('should be 0 with no penalties and no digit ticked', () => {
		const game = new Qwixx();
		expect(game.score()).toBe(0);
	});

	it('with 1 digit ticked', () => {
		const game = new Qwixx();
		game.reds.digits[0].selected = true;
		expect(game.score()).toBe(1);
	});

	it('with 1 digit ticked in two lines', () => {
		const game = new Qwixx();
		game.reds.digits[0].selected = true;
		game.blues.digits[3].selected = true;
		expect(game.score()).toBe(2);
	});

	it('with 2 digits in a single line', () => {
		const game = new Qwixx();
		game.reds.digits[0].selected = true;
		game.reds.digits[3].selected = true;
		expect(game.score()).toBe(3);
	});

	it('with 1 penalty', () => {
		const game = new Qwixx();
		game.addPenalty();
		expect(game.score()).toBe(-5);
	});

	it('with 3 digits in two different lines and 1 penalty', () => {
		const game = new Qwixx();
		game.yellows.digits[8].selected = true;
		game.yellows.digits[7].selected = true;
		game.greens.digits[2].selected = true;
		game.addPenalty();
		expect(game.score()).toBe(-1);
	});
});
