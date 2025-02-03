<script lang="ts">
	import { Color } from '$lib/enums/color';
	import { FlexContainer } from '@totocorpsoftwareinc/frontend-toolkit';
	import GameCard from './GameCard.svelte';
	import LockCard from './LockCard.svelte';
	import { calculateLineScore, checkDigit } from '$lib/game/line';
	import type { Digit } from '$lib/game/digit';

	interface Props {
		color: Color;
		line: Digit[];
		locked: boolean;
		onClick?: (ticked: boolean) => void;
	}

	let { color, line, locked, onClick }: Props = $props();

	let score = $derived(calculateLineScore(line));
	let lastDigitsTicked: number[] = $state([]);

	function onDigitClicked(digitIndex: number, ticked: boolean): boolean {
		const out = checkDigit(line, digitIndex, ticked);
		if (onClick !== undefined) {
			onClick(ticked);
		}

		if (out) {
			lastDigitsTicked.push(digitIndex);
		}
		if (!out && lastDigitsTicked.length > 0 && digitIndex === lastDigitsTicked.at(-1)) {
			lastDigitsTicked.pop();
		}

		return out;
	}

	function onLineLocked(ticked: boolean) {
		locked = ticked;
	}

	function isDigitBeforeLastTicked(digitIndex: number): boolean {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
		const lastTickedDigitIndex = lastDigitsTicked.at(-1);
		if (lastTickedDigitIndex === undefined) {
			return false;
		}
		return digitIndex < lastTickedDigitIndex;
	}
</script>

<FlexContainer vertical={false}>
	<FlexContainer vertical={false} styling="w-4/5 mr-4">
		{#each line as digit, index}
			<GameCard
				text={'' + digit.value}
				{color}
				selected={digit.selected}
				locked={locked || isDigitBeforeLastTicked(index)}
				onClick={(ticked: boolean): boolean => {
					return onDigitClicked(index, ticked);
				}}
			/>
		{/each}
	</FlexContainer>

	<FlexContainer vertical={false} styling="w-1/5 ml-4 space-x-2">
		<LockCard {locked} {color} onClick={onLineLocked}></LockCard>
		<GameCard text={score.toString()} {color} locked={true} />
	</FlexContainer>
</FlexContainer>
