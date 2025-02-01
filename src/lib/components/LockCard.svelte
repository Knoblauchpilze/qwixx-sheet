<script lang="ts">
	import { Color } from '$lib/enums/color';
	import GameCard from './GameCard.svelte';

	interface Props {
		locked: boolean;
		color: Color;
		onClick?: (ticked: boolean) => void;
	}

	let { locked, color, onClick }: Props = $props();

	const handleClick = () => {
		locked = !locked;
		if (onClick !== undefined) {
			onClick(locked);
		}
		return locked;
	};
</script>

{#if !locked}
	<GameCard text="Lock" {color} onClick={handleClick} />
{:else}
	<GameCard text="Unlock" {color} selected={true} onClick={handleClick} />
{/if}
