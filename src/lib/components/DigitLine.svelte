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
		history: number[];
		locked: boolean;
		onClick?: (lineColor: Color, digit: Digit, ticked: boolean) => void;
	}

	let { color, line, history = $bindable(), locked, onClick }: Props = $props();

	let automaticallyLocked = $state(false);
	let score = $derived(calculateLineScore(line));

	function onDigitClicked(digitIndex: number, ticked: boolean): boolean {
		const out = checkDigit(line, digitIndex, ticked);

		const clickWasAccepted = (out && ticked) || (!out && !ticked);

		if (clickWasAccepted && onClick !== undefined) {
			const digit = line.at(digitIndex);
			if (digit !== undefined) {
				onClick(color, digit, ticked);
			}
		}

		if (out) {
			history.push(digitIndex);
			if (isLastDigit(digitIndex)) {
				automaticallyLocked = true;
				locked = true;
			}
		}
		if (!out) {
			if (isIndexEqualToLastDigitTicked(digitIndex)) {
				history.pop();
			}
			if (automaticallyLocked) {
				locked = !isLastDigit(digitIndex);
			}
		}

		return out;
	}

	function onLineLocked(ticked: boolean) {
		locked = ticked;
		automaticallyLocked = false;
	}

	function isDigitBeforeLastTicked(digitIndex: number): boolean {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
		const lastTickedDigitIndex = history.at(-1);
		if (lastTickedDigitIndex === undefined) {
			return false;
		}
		return digitIndex < lastTickedDigitIndex;
	}

	function isLastDigit(digitIndex: number): boolean {
		return digitIndex === line.length - 1;
	}

	function isIndexEqualToLastDigitTicked(digitIndex: number): boolean {
		if (history.length === 0) {
			return false;
		}

		const lastDigitIndexTicked = history.at(-1);
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
				color={digit.color}
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
