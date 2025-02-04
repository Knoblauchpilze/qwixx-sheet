<script lang="ts">
	import { Color } from '$lib/enums/color';
	import { cssColorsFromColor } from './colorUtils';

	interface Props {
		svgBackground: string;
		color: Color;
		selected?: boolean;
		onClick?: (ticked: boolean) => boolean;
	}

	let { svgBackground, color, selected = false, onClick }: Props = $props();

	const palette = $derived(cssColorsFromColor(color));

	const style = 'min-w-14 min-h-14';
	const text = 'font-bold text-xl text-transparent';
	const border = $derived('border-2 rounded-xl ' + palette.borderColor);
	const bgColor = $derived(selected ? palette.bgSelectedColor : palette.bgColor);
	const bgHoverColor = $derived(selected ? '' : palette.bgHoverColor);
	const bg = $derived('bg-contain bg-center bg-no-repeat ' + bgColor + ' ' + bgHoverColor);

	const onClickInternal = () => {
		selected = !selected;
		if (onClick !== undefined) {
			selected = onClick(selected);
		}
	};
</script>

<button class="{style} {text} {bg} {border} {svgBackground}" onclick={onClickInternal}>
	Test
</button>
