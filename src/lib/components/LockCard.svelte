<script lang="ts">
	import { Color } from '$lib/enums/color';
	import GameCard from './GameCard.svelte';

	interface Props {
		locked: boolean;
		color: Color;
	}

	let { locked, color }: Props = $props();

	const handleClick = () => {
		locked = !locked;
		return locked;
	};
</script>

{#if !locked}
	<GameCard text="Lock" {color} onClick={handleClick} />
{:else}
	<GameCard text="Unlock" {color} onClick={handleClick} />
{/if}
