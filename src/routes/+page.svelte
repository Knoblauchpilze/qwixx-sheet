<script lang="ts">
	import DigitLine from '$lib/components/DigitLine.svelte';
	import GameCard from '$lib/components/GameCard.svelte';
	import PenaltyCard from '$lib/components/PenaltyCard.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';
	import StyledTitle from '$lib/components/StyledTitle.svelte';
	import { Color } from '$lib/enums/color';
	import { DigitLayout } from '$lib/enums/digitLayout';
	import type { Digit } from '$lib/game/digit.js';
	import { calculateLineScore } from '$lib/game/line';
	import { FlexContainer, StyledText } from '@totocorpsoftwareinc/frontend-toolkit';

	const { data } = $props();

	// https://svelte.dev/docs/svelte/$state
	let reds = $state(data.reds);
	let yellows = $state(data.yellows);
	let greens = $state(data.greens);
	let blues = $state(data.blues);

	// The history for each line is a list of indices, representing
	// the indices of the digits that were clicked.
	interface History {
		reds: number[];
		yellows: number[];
		greens: number[];
		blues: number[];
	}
	let lastTicked: History = $state({
		reds: [],
		yellows: [],
		greens: [],
		blues: []
	});
	// This general history is a list of digits (with a color and a
	// value) to be displayed as a hint. It also contains the line in
	// which the digit is. The digit data allows to display the value
	// as a hint in the UI. Additionally, the line information can be
	// used to clear a digit (i.e. undo feature) as we can find each
	// digit's in its line and update it.
	interface DigitHistoryEntry {
		digit: Digit;
		line: Color;
	}
	let history: DigitHistoryEntry[] = $state([]);

	let penalties = $state(Array(data.penaltyCount).fill(false));
	let lockedLines = $state([false, false, false, false]);

	let score = $state(0);
	let bonusScore = $state(0);
	let penaltyScore = $state(0);

	function calculatePenaltyScore(): number {
		const count = penalties.reduce((sum, penalty) => (penalty === true ? sum + 1 : sum), 0);
		if (count === 0) {
			return 0;
		}

		return count * data.penaltyScore;
	}

	function calculateBonusScoreFor(digit: number): number {
		const redId = reds.findIndex((d) => d.value == digit);
		const yellowId = yellows.findIndex((d) => d.value == digit);
		const greenId = greens.findIndex((d) => d.value == digit);
		const blueId = blues.findIndex((d) => d.value == digit);

		if (
			redId === undefined ||
			yellowId === undefined ||
			greenId === undefined ||
			blueId === undefined
		) {
			return 0;
		}

		const red = reds[redId];
		const yellow = yellows[yellowId];
		const green = greens[greenId];
		const blue = blues[blueId];

		if (!red.selected || !yellow.selected || !green.selected || !blue.selected) {
			return 0;
		}

		return data.sameDigitBonus;
	}

	function calculateBonusScore(): number {
		const digits = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		return digits.reduce((sum, digit) => sum + calculateBonusScoreFor(digit), 0);
	}

	function calculateScore(): number {
		const positive =
			calculateLineScore(reds) +
			calculateLineScore(yellows) +
			calculateLineScore(greens) +
			calculateLineScore(blues);
		const bonus = calculateBonusScore();
		const penalties = calculatePenaltyScore();

		return positive + bonus + penalties;
	}

	function onDigitClicked(lineColor: Color, digit: Digit, ticked: boolean) {
		bonusScore = calculateBonusScore();
		score = calculateScore();

		if (ticked) {
			history.push({
				digit: digit,
				line: lineColor
			});
		} else {
			const index = history.findIndex(
				(d) => d.digit.value === digit.value && d.digit.color === digit.color
			);
			if (index !== -1) {
				history.splice(index, 1);
			}
		}
	}

	function untickDigit(line: Digit[], history: number[], toRemove: Digit) {
		let index = line.findIndex((d) => d.color === toRemove.color && d.value === toRemove.value);
		if (index !== -1) {
			line[index].selected = false;
		}

		index = history.findIndex((d) => d === index);
		if (index !== -1) {
			history.splice(index, 1);
		}
	}

	function onDigitUnticked(): boolean {
		const entry = history.at(-1);
		if (entry === undefined) {
			return false;
		}

		let processed = true;
		switch (entry.line) {
			case Color.RED:
				untickDigit(reds, lastTicked.reds, entry.digit);
				break;
			case Color.YELLOW:
				untickDigit(yellows, lastTicked.yellows, entry.digit);
				break;
			case Color.GREEN:
				untickDigit(greens, lastTicked.greens, entry.digit);
				break;
			case Color.BLUE:
				untickDigit(blues, lastTicked.blues, entry.digit);
				break;
			default:
				processed = false;
		}

		if (processed) {
			history.pop();
		}

		return false;
	}

	function onPenaltyClicked(index: number, ticked: boolean) {
		penalties[index] = ticked;
		penaltyScore = calculatePenaltyScore();
		score = calculateScore();
	}

	function onReset() {
		reds = data.reds;
		yellows = data.yellows;
		greens = data.greens;
		blues = data.blues;

		lastTicked = {
			reds: [],
			yellows: [],
			greens: [],
			blues: []
		};

		penalties = Array(data.penaltyCount).fill(false);
		lockedLines = [false, false, false, false];

		score = 0;
		bonusScore = 0;
		penaltyScore = 0;
	}

	function getLastTickedDigitColor(): Color {
		if (history.length === 0) {
			return Color.NEUTRAL;
		}
		return history.at(-1)?.digit.color ?? Color.NEUTRAL;
	}

	function getLastTickedDigitValue(): string {
		if (history.length === 0) {
			return '';
		}
		const entry = history.at(-1);
		if (entry === undefined) {
			return '';
		}
		return '' + entry.digit.value;
	}
</script>

<FlexContainer styling="border-2 rounded-xl border-accent">
	<FlexContainer vertical={false} extensible={false}>
		<StyledTitle text="Qwixx sheet" />
	</FlexContainer>

	<FlexContainer align="stretch">
		<FlexContainer>
			<DigitLine
				color={Color.RED}
				line={reds}
				bind:history={lastTicked.reds}
				locked={lockedLines[0]}
				onClick={onDigitClicked}
			/>
			<DigitLine
				color={Color.YELLOW}
				line={yellows}
				bind:history={lastTicked.yellows}
				locked={lockedLines[1]}
				onClick={onDigitClicked}
			/>
			<DigitLine
				color={Color.GREEN}
				line={greens}
				bind:history={lastTicked.greens}
				locked={lockedLines[2]}
				onClick={onDigitClicked}
			/>
			<DigitLine
				color={Color.BLUE}
				line={blues}
				bind:history={lastTicked.blues}
				locked={lockedLines[3]}
				onClick={onDigitClicked}
			/>
		</FlexContainer>

		<FlexContainer vertical={false} extensible={false}>
			<FlexContainer vertical={false} justify="center">
				{#each penalties as penalty, index (index)}
					<PenaltyCard
						selected={penalty}
						onClick={(ticked: boolean) => {
							onPenaltyClicked(index, ticked);
						}}
					/>
				{/each}
				<GameCard text={penaltyScore.toString()} color={Color.NEUTRAL} locked={true} />

				<StyledText text="Last played:" styling="m-1 md:m-4" />
				<GameCard
					text={getLastTickedDigitValue()}
					color={getLastTickedDigitColor()}
					selected={false}
					locked={history.length < 1}
					onClick={onDigitUnticked}
				/>
			</FlexContainer>

			<FlexContainer vertical={false} justify="center">
				<StyledText text="4 digits bonus:" styling="m-1 md:m-4" />
				<GameCard text={bonusScore.toString()} color={Color.NEUTRAL} locked={true} />

				<StyledText text="Score:" styling="m-1 md:m-4" />
				<GameCard text={score.toString()} color={Color.NEUTRAL} locked={true} />
			</FlexContainer>
		</FlexContainer>

		<FlexContainer vertical={false} extensible={false} styling="m-1 md:m-2">
			<StyledButton text="Reset" border={true} onClick={onReset} />
			<FlexContainer vertical={false} extensible={false}>
				<form method="POST" action="?/generate" class="flex flex-row justify-evenly">
					<input class="hidden" id="layout" name="layout" value={DigitLayout.CUSTOM} />
					<input
						class="bg-white"
						id="seed"
						type="text"
						name="seed"
						placeholder="Enter a seed"
						value={data.seed}
					/>
					<StyledButton text="Generate" border={true} />
				</form>
				<form method="POST" action="?/generate" class="flex flex-row justify-evenly">
					<input class="hidden" id="layout" name="layout" value={DigitLayout.CLASSIC} />
					<input
						class="hidden bg-white"
						id="seed"
						type="text"
						name="seed"
						placeholder="Enter a seed"
						value={data.seed}
					/>
					<StyledButton text="Classic" border={true} />
				</form>
			</FlexContainer>
		</FlexContainer>
	</FlexContainer>
</FlexContainer>
