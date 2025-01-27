import { Color } from "$lib/enums/color";

export function cssTextColorFromColor(color: Color): string {
	switch (color) {
		case Color.RED:
			return 'text-red-600';
		case Color.YELLOW:
			return 'text-yellow-600';
		case Color.GREEN:
			return 'text-green-600';
		case Color.BLUE:
			return 'text-blue-600';
	}
}

export function cssBgColorFromColor(color: Color): string {
	switch (color) {
		case Color.RED:
			return 'bg-red-300';
		case Color.YELLOW:
			return 'bg-yellow-300';
		case Color.GREEN:
			return 'bg-green-300';
		case Color.BLUE:
			return 'bg-blue-300';
	}
}

export function cssBgHoverColorFromColor(color: Color): string {
	switch (color) {
		case Color.RED:
			return 'hover:bg-red-100';
		case Color.YELLOW:
			return 'hover:bg-yellow-100';
		case Color.GREEN:
			return 'hover:bg-green-100';
		case Color.BLUE:
			return 'hover:bg-blue-100';
	}
}

export function cssBorderColorFromColor(color: Color): string {
	switch (color) {
		case Color.RED:
			return 'border-red-800';
		case Color.YELLOW:
			return 'border-yellow-800';
		case Color.GREEN:
			return 'border-green-800';
		case Color.BLUE:
			return 'border-blue-800';
	}
}
