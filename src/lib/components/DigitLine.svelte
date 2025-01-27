<script lang="ts">
	import { Color } from '$lib/enums/color';
	import { FlexContainer } from '@totocorpsoftwareinc/frontend-toolkit';
	import GameCard from './GameCard.svelte';
	import LockCard from './LockCard.svelte';
	import type { DigitLine } from '$lib/game/line';

	interface Props {
		line: DigitLine;
		color: Color;
	}

	let { line, color }: Props = $props();

	const digits = $derived(line.digits);
	const locked = $derived(line.locked);
	const score = $derived(line.score);
</script>

<FlexContainer vertical={false}>
	<FlexContainer vertical={false} styling="w-4/5 mr-4">
		{#each digits as digit}
			<GameCard text={'' + digit.value} {color} />
		{/each}
	</FlexContainer>

	<FlexContainer vertical={false} styling="w-1/5 ml-4 space-x-2">
		<LockCard {locked} {color}></LockCard>
		<GameCard text={score.toString()} {color} locked={true} />
	</FlexContainer>
</FlexContainer>
