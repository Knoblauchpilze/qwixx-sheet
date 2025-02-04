<script lang="ts">
	import { Color } from '$lib/enums/color';
	import SvgCard from './SvgCard.svelte';

	interface Props {
		locked: boolean;
		color: Color;
		onClick?: (ticked: boolean) => void;
	}

	let { locked, color, onClick }: Props = $props();

	let svgBackground = $derived(locked ? 'bg-padlock-locked' : 'bg-padlock-open');

	const handleClick = () => {
		locked = !locked;
		if (onClick !== undefined) {
			onClick(locked);
		}
		return locked;
	};
</script>

<SvgCard {svgBackground} {color} selected={locked} onClick={handleClick} />
