<script lang="ts">
	import { Color } from '$lib/enums/color';
	import { cssColorsFromColor } from './colorUtils';

	interface Props {
		text: string;
		color: Color;
		selected?: boolean;
		locked?: boolean;
		onClick?: (ticked: boolean) => boolean;
	}

	let { text, color, selected = false, locked = false, onClick }: Props = $props();

	const palette = $derived(cssColorsFromColor(color));

	const bgColor = $derived(selected ? palette.bgSelectedColor : palette.bgColor);
	const bgHoverColor = $derived(selected || locked ? '' : palette.bgHoverColor);
	const borderColor = $derived(palette.borderColor);

	const style = 'min-w-8 md:min-w-14 min-h-8 md:min-h-14';
	const textStyle = 'font-bold text-xl';
	const border = 'border-2 rounded-xl';

	const onClickInternal = () => {
		if (locked !== true) {
			selected = !selected;
			if (onClick !== undefined) {
				selected = onClick(selected);
			}
		}
	};
</script>

<button
	class="{palette.textColor} {bgColor} {borderColor} {bgHoverColor} {style} {textStyle} {border}"
	onclick={onClickInternal}>{text}</button
>
