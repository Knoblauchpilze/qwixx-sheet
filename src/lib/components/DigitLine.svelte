<script lang="ts">
	import { Color } from '$lib/enums/color';
	import { FlexContainer } from '@totocorpsoftwareinc/frontend-toolkit';
	import GameCard from './GameCard.svelte';
	import LockCard from './LockCard.svelte';
	import type { DigitLine } from '$lib/game/line';

	interface Props {
		line: DigitLine;
		color: Color;
		onClick?: (ticked: boolean) => void;
	}

	let { line, color, onClick }: Props = $props();

	// https://svelte.dev/docs/svelte/$state
	let score = $state(0);
	let locked = $state(false);

	function onDigitClicked(digitIndex: number, ticked: boolean) {
		line.digits.at(digitIndex)?.check(ticked);
		score = line.score();
		if (onClick !== undefined) {
			onClick(ticked);
		}
	}

	function onLineLocked(ticked: boolean) {
		locked = ticked;
	}
</script>

<FlexContainer vertical={false}>
	<FlexContainer vertical={false} styling="w-4/5 mr-4">
		{#each line.digits as digit, index}
			<GameCard
				text={'' + digit.value}
				{color}
				{locked}
				onClick={(ticked: boolean) => {
					onDigitClicked(index, ticked);
				}}
			/>
		{/each}
	</FlexContainer>

	<FlexContainer vertical={false} styling="w-1/5 ml-4 space-x-2">
		<LockCard {locked} {color} onClick={onLineLocked}></LockCard>
		<GameCard text={score.toString()} {color} locked={true} />
	</FlexContainer>
</FlexContainer>
