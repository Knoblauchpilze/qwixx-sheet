<script lang="ts">
	import { Color } from '$lib/enums/color';
	import type { Snippet } from 'svelte';
	import { cssColorsFromColor } from './colorUtils';

	interface Props {
		color: Color;
		selected?: boolean;
		onClick?: (ticked: boolean) => boolean;
		children?: Snippet;
	}

	let { color, selected = false, onClick, children }: Props = $props();

	const palette = $derived(cssColorsFromColor(color));

	// https://tailwindcss.com/docs/fill
	// See also the changes in the svg files.
	const bgColor = $derived(selected ? palette.bgSelectedColor : palette.bgColor);
	const bgHoverColor = $derived(selected ? '' : palette.bgHoverColor);
	const borderColor = $derived(palette.borderColor);

	const style = 'font-bold text-xl border-2 rounded-xl min-w-14 min-h-14';

	const onClickInternal = () => {
		selected = !selected;
		if (onClick !== undefined) {
			selected = onClick(selected);
		}
	};
</script>

<button
	class="{palette.textColor} {bgColor} {borderColor} {bgHoverColor} {style}"
	onclick={onClickInternal}
>
	{@render children?.()}
</button>
