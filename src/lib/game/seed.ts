const DEFAULT_SEED_LENGTH = 10;
const SEED_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function generateSeed(): string {
	let out = '';

	let count = 0;
	while (count < DEFAULT_SEED_LENGTH) {
		const id = Math.floor(Math.random() * SEED_CHARACTERS.length);
		const char = SEED_CHARACTERS.at(id);
		out += char;
		++count;
	}

	return out;
}
