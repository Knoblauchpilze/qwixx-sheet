<script lang="ts">
	import { Color } from '$lib/enums/color';
	import SvgCard from './SvgCard.svelte';

	interface Props {
		locked: boolean;
		color: Color;
		onClick?: (ticked: boolean) => void;
	}

	let { locked, color, onClick }: Props = $props();

	let svgBackground = $derived(determineSvgIcon(color, locked));

	const handleClick = () => {
		locked = !locked;
		if (onClick !== undefined) {
			onClick(locked);
		}
		return locked;
	};

	function determineSvgIcon(color: Color, locked: boolean): string {
		switch (color) {
			case Color.RED:
				return locked ? 'bg-padlock-red-locked' : 'bg-padlock-red-open';
			case Color.YELLOW:
				return locked ? 'bg-padlock-yellow-locked' : 'bg-padlock-yellow-open';
			case Color.GREEN:
				return locked ? 'bg-padlock-green-locked' : 'bg-padlock-green-open';
			case Color.BLUE:
				return locked ? 'bg-padlock-blue-locked' : 'bg-padlock-blue-open';
		}

		return '';
	}
</script>

<SvgCard {svgBackground} {color} selected={locked} onClick={handleClick} />
