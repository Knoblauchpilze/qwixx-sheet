export interface Digit {
	readonly value: number;
	selected: boolean;
}

export function newDigit(value: number): Digit {
	return {
		value: value,
		selected: false
	};
}

export function generateAscendingLine(): Digit[] {
	const out: Digit[] = [];
	out.push(newDigit(2));
	out.push(newDigit(3));
	out.push(newDigit(4));
	out.push(newDigit(5));
	out.push(newDigit(6));
	out.push(newDigit(7));
	out.push(newDigit(8));
	out.push(newDigit(9));
	out.push(newDigit(10));
	out.push(newDigit(11));
	out.push(newDigit(12));

	return out;
}

export function generateDescendingLine(): Digit[] {
	return generateAscendingLine().reverse();
}
