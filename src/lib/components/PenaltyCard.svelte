<script lang="ts">
	import { Color } from '$lib/enums/color';
	import GameCard from './GameCard.svelte';

	interface Props {
		onClick?: (ticked: boolean) => void;
	}

	let { onClick }: Props = $props();

	let selected = $state(false);

	function onClickInternal(ticked: boolean) {
		selected = ticked;
		if (onClick !== undefined) {
			onClick(ticked);
		}
	}
</script>

{#if !selected}
	<GameCard text="" color={Color.NEUTRAL} {selected} onClick={onClickInternal} />
{:else}
	<GameCard text="X" color={Color.NEUTRAL} {selected} onClick={onClickInternal} />
{/if}
