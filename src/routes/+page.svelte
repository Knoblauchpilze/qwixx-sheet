<script lang="ts">
	import DigitLine from '$lib/components/DigitLine.svelte';
	import GameCard from '$lib/components/GameCard.svelte';
	import PenaltyCard from '$lib/components/PenaltyCard.svelte';
	import { Color } from '$lib/enums/color';
	import { generateAscendingLine, generateDescendingLine } from '$lib/game/digit';
	import { calculateLineScore } from '$lib/game/line';
	import {
		FlexContainer,
		StyledButton,
		StyledText,
		StyledTitle
	} from '@totocorpsoftwareinc/frontend-toolkit';

	let reds = $state(generateAscendingLine());
	let yellows = $state(generateAscendingLine());
	let greens = $state(generateDescendingLine());
	let blues = $state(generateDescendingLine());

	let penalties = $state([false, false, false, false]);
	let lockedLines = $state([false, false, false, false]);

	let score = $state(0);
	let penaltyScore = $state(0);

	function calculatePenaltyScore(): number {
		const count = penalties.reduce((sum, penalty) => (penalty === true ? sum + 1 : sum), 0);
		if (count === 0) {
			return 0;
		}

		const PENALTY = -5;
		return count * PENALTY;
	}

	function calculateScore(): number {
		const positive =
			calculateLineScore(reds) +
			calculateLineScore(yellows) +
			calculateLineScore(greens) +
			calculateLineScore(blues);
		return positive + calculatePenaltyScore();
	}

	function onDigitClicked() {
		score = calculateScore();
	}

	function onPenaltyClicked(index: number, ticked: boolean) {
		penalties[index] = ticked;
		penaltyScore = calculatePenaltyScore();
		score = calculateScore();
	}

	function onReset() {
		reds = generateAscendingLine();
		yellows = generateAscendingLine();
		greens = generateDescendingLine();
		blues = generateDescendingLine();

		penalties = [false, false, false, false];
		lockedLines = [false, false, false, false];

		score = 0;
		penaltyScore = 0;
		console.log('reset');
	}
</script>

<FlexContainer align={'stretch'} styling={'border-2 rounded-xl border-accent'}>
	<FlexContainer vertical={false} extensible={false}>
		<StyledTitle text="Qwixx sheet" />
	</FlexContainer>

	<FlexContainer align={'stretch'}>
		<FlexContainer>
			<DigitLine color={Color.RED} line={reds} locked={lockedLines[0]} onClick={onDigitClicked} />
			<DigitLine
				color={Color.YELLOW}
				line={yellows}
				locked={lockedLines[1]}
				onClick={onDigitClicked}
			/>
			<DigitLine
				color={Color.GREEN}
				line={greens}
				locked={lockedLines[2]}
				onClick={onDigitClicked}
			/>
			<DigitLine color={Color.BLUE} line={blues} locked={lockedLines[3]} onClick={onDigitClicked} />
		</FlexContainer>

		<FlexContainer vertical={false} extensible={false} align={'end'}>
			<FlexContainer vertical={false} justify={'center'}>
				{#each penalties as penalty, index}
					<PenaltyCard
						selected={penalty}
						onClick={(ticked: boolean) => {
							onPenaltyClicked(index, ticked);
						}}
					/>
				{/each}
				<GameCard text={penaltyScore.toString()} color={Color.NEUTRAL} locked={true} />
			</FlexContainer>

			<FlexContainer vertical={false} justify={'center'}>
				<StyledText text="Score:" styling={'m-4'} />
				<GameCard text={score.toString()} color={Color.NEUTRAL} locked={true} />
			</FlexContainer>
		</FlexContainer>

		<FlexContainer vertical={false} extensible={false} styling={'m-2'}>
			<StyledButton text="Reset" border={true} onClick={onReset} />
			<form method="POST" action="?/generate" class="flex flex-row justify-evenly">
				<input id="seed" type="text" name="seed" placeholder="Enter a seed" class="bg-white" />
				<StyledButton text="Generate" border={true} />
			</form>
		</FlexContainer>
	</FlexContainer>
</FlexContainer>
