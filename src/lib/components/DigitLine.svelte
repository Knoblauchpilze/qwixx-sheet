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

	// https://svelte.dev/docs/svelte/$state
	let score = $state(0);

	function onDigitClicked(digitIndex: number, ticked: boolean) {
		line.digits.at(digitIndex)?.check(ticked);
		score = line.score();
	}
</script>

<FlexContainer vertical={false}>
	<FlexContainer vertical={false} styling="w-4/5 mr-4">
		{#each line.digits as digit, index}
			<GameCard
				text={'' + digit.value}
				{color}
				onClick={(ticked: boolean) => {
					onDigitClicked(index, ticked);
				}}
			/>
		{/each}
	</FlexContainer>

	<FlexContainer vertical={false} styling="w-1/5 ml-4 space-x-2">
		<LockCard locked={line.locked} {color}></LockCard>
		<GameCard text={score.toString()} {color} locked={true} />
	</FlexContainer>
</FlexContainer>
