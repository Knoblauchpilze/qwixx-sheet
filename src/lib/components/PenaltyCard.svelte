<script lang="ts">
	import { Color } from '$lib/enums/color';
	import GameCard from './GameCard.svelte';

	interface Props {
		selected: boolean;
		onClick?: (ticked: boolean) => void;
	}

	let { selected, onClick }: Props = $props();

	function onClickInternal(ticked: boolean): boolean {
		selected = ticked;
		if (onClick !== undefined) {
			onClick(ticked);
		}
		return selected;
	}
</script>

{#if !selected}
	<GameCard text="" color={Color.NEUTRAL} {selected} onClick={onClickInternal} />
{:else}
	<GameCard text="X" color={Color.NEUTRAL} {selected} onClick={onClickInternal} />
{/if}
