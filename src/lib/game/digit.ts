export class Digit {
	readonly value: number;
	selected: boolean = false;

	constructor(value: number) {
		this.value = value;
	}

	public tick() {
		this.check(true);
	}

	public untick() {
		this.check(false);
	}

	public check(tick: boolean) {
		this.selected = tick;
	}
}

export function generateAscendingLine(): Digit[] {
	const out: Digit[] = [];
	out.push(new Digit(2));
	out.push(new Digit(3));
	out.push(new Digit(4));
	out.push(new Digit(5));
	out.push(new Digit(6));
	out.push(new Digit(7));
	out.push(new Digit(8));
	out.push(new Digit(9));
	out.push(new Digit(10));
	out.push(new Digit(11));
	out.push(new Digit(12));

	return out;
}

export function generateDescendingLine(): Digit[] {
	return generateAscendingLine().reverse();
}
