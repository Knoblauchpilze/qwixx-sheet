import type { Color } from '$lib/enums/color';

export interface Digit {
	readonly value: number;
	readonly color: Color;
	selected: boolean;
}

export function newDigit(value: number, color: Color): Digit {
	return {
		value: value,
		color: color,
		selected: false
	};
}

export function generateAscendingLine(color: Color): Digit[] {
	const out: Digit[] = [];
	out.push(newDigit(2, color));
	out.push(newDigit(3, color));
	out.push(newDigit(4, color));
	out.push(newDigit(5, color));
	out.push(newDigit(6, color));
	out.push(newDigit(7, color));
	out.push(newDigit(8, color));
	out.push(newDigit(9, color));
	out.push(newDigit(10, color));
	out.push(newDigit(11, color));
	out.push(newDigit(12, color));

	return out;
}

export function generateDescendingLine(color: Color): Digit[] {
	return generateAscendingLine(color).reverse();
}
