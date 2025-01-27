<script lang="ts">
	import { Color } from '$lib/enums/color';
	import {
		cssBgColorFromColor,
		cssTextColorFromColor,
		cssBorderColorFromColor,
		cssBgHoverColorFromColor
	} from './colorUtils';

	interface Props {
		digit: number;
		color: Color;
	}

	let { digit, color }: Props = $props();

	const textColor = $derived(cssTextColorFromColor(color));
	const bgColor = $derived(cssBgColorFromColor(color));
	const bgHoverColor = $derived(cssBgHoverColorFromColor(color));
	const borderColor = $derived(cssBorderColorFromColor(color));

	const style = $derived(
		'border-2 rounded-xl w-8 h-8 ' + bgColor + ' ' + borderColor + ' ' + bgHoverColor
	);
</script>

<button class="{textColor} font-bold {style}">{digit}</button>
