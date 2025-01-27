import { Color } from '$lib/enums/color';
export interface CardColor {
	readonly textColor: string;
	readonly bgColor: string;
	readonly bgHoverColor: string;
	readonly bgSelectedColor: string;
	readonly borderColor: string;
}

export function cssColorsFromColor(color: Color): CardColor {
	switch (color) {
		case Color.NEUTRAL:
			return {
				textColor: 'text-white',
				bgColor: 'bg-gray-400',
				bgHoverColor: 'hover:bg-gray-200',
				bgSelectedColor: 'bg-gray-600',
				borderColor: 'border-gray-800'
			};
		case Color.RED:
			return {
				textColor: 'text-qred-dark',
				bgColor: 'bg-qred-light',
				bgHoverColor: 'hover:bg-qred-bright',
				bgSelectedColor: 'bg-qred-medium',
				borderColor: 'border-qred-dark'
			};
		case Color.YELLOW:
			return {
				textColor: 'text-qyellow-dark',
				bgColor: 'bg-qyellow-light',
				bgHoverColor: 'hover:bg-qyellow-bright',
				bgSelectedColor: 'bg-qyellow-medium',
				borderColor: 'border-qyellow-dark'
			};
		case Color.GREEN:
			return {
				textColor: 'text-qgreen-dark',
				bgColor: 'bg-qgreen-light',
				bgHoverColor: 'hover:bg-qgreen-bright',
				bgSelectedColor: 'bg-qgreen-medium',
				borderColor: 'border-qgreen-dark'
			};
		case Color.BLUE:
			return {
				textColor: 'text-qblue-dark',
				bgColor: 'bg-qblue-light',
				bgHoverColor: 'hover:bg-qblue-bright',
				bgSelectedColor: 'bg-qblue-medium',
				borderColor: 'border-qblue-dark'
			};
	}
}
