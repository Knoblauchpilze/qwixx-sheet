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

	let automaticallyLocked = $state(false);
	let score = $derived(calculateLineScore(line));
	let lastDigitsTicked: number[] = $state([]);

	function onDigitClicked(digitIndex: number, ticked: boolean): boolean {
		const out = checkDigit(line, digitIndex, ticked);
		if (onClick !== undefined) {
			onClick(ticked);
		}

		if (out) {
			lastDigitsTicked.push(digitIndex);
			if (isLastDigit(digitIndex)) {
				automaticallyLocked = true;
				locked = true;
			}
		}
		if (!out) {
			if (isIndexEqualToLastDigitTicked(digitIndex)) {
				lastDigitsTicked.pop();
			}
			if (automaticallyLocked) {
				locked = !isLastDigit(digitIndex);
			}
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

	function isLastDigit(digitIndex: number): boolean {
		return digitIndex === line.length - 1;
	}

	function isIndexEqualToLastDigitTicked(digitIndex: number): boolean {
		if (lastDigitsTicked.length === 0) {
			return false;
		}

		const lastDigitIndexTicked = lastDigitsTicked.at(-1);
		return lastDigitIndexTicked === digitIndex;
	}

	function isDigitLocked(digitIndex: number): boolean {
		const lockedBecauseLineIsLocked = locked;
		const lockedBecauseBiggerDigitIsTicked = isDigitBeforeLastTicked(digitIndex);
		const unlockedBecauseLastDigit = isLastDigit(digitIndex) && automaticallyLocked;

		return (
			(lockedBecauseLineIsLocked || lockedBecauseBiggerDigitIsTicked) && !unlockedBecauseLastDigit
		);
	}
</script>

<FlexContainer vertical={false}>
	<FlexContainer vertical={false} styling="w-4/5 mr-4">
		{#each line as digit, index}
			<GameCard
				text={'' + digit.value}
				{color}
				selected={digit.selected}
				locked={isDigitLocked(index)}
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
