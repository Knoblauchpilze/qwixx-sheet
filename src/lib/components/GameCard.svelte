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

	const style = 'font-bold text-xl border-2 rounded-xl min-w-14 h-14';

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
	class="{palette.textColor} {bgColor} {borderColor} {bgHoverColor} {style}"
	onclick={onClickInternal}>{text}</button
>
