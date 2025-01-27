<script lang="ts">
	import { Color } from '$lib/enums/color';
	import { cssColorsFromColor } from './colorUtils';

	interface Props {
		text: string;
		color: Color;
		selected?: boolean;
		locked?: boolean;
		onClick?: () => void;
	}

	let { text, color, selected = false, locked = false, onClick }: Props = $props();

	const palette = $derived(cssColorsFromColor(color));

	const bgColor = $derived(selected ? palette.bgSelectedColor : palette.bgColor);
	const bgHoverColor = $derived(selected || locked ? '' : palette.bgHoverColor);
	const borderColor = $derived(palette.borderColor);

	const style = 'border-2 rounded-xl min-w-8 h-8';

	const onClickInternal = () => {
		if (onClick !== undefined) {
			onClick();
		}
		selected = !selected;
	};
</script>

<button
	class="font-bold {palette.textColor} {bgColor} {borderColor} {bgHoverColor} {style}"
	onclick={onClickInternal}>{text}</button
>
