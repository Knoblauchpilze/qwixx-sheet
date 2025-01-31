<script lang="ts">
	import DigitLine from '$lib/components/DigitLine.svelte';
	import GameCard from '$lib/components/GameCard.svelte';
	import PenaltyCard from '$lib/components/PenaltyCard.svelte';
	import { Color } from '$lib/enums/color';
	import { Qwixx } from '$lib/game/qwixx';
	import {
		FlexContainer,
		StyledButton,
		StyledText,
		StyledTitle
	} from '@totocorpsoftwareinc/frontend-toolkit';

	const game = $state(new Qwixx());

	let score = $state(0);
	let penaltyScore = $state(0);

	function onDigitClicked() {
		score = game.score();
	}

	function onPenaltyClicked(ticked: boolean) {
		if (ticked) {
			game.addPenalty();
		} else {
			game.removePenalty();
		}

		penaltyScore = game.penaltyScore();
		score = game.score();
	}

	function onReset() {
		console.log('reset');
	}
</script>

<FlexContainer align={'stretch'} styling={'border-2 rounded-xl border-accent'}>
	<FlexContainer vertical={false} extensible={false}>
		<StyledTitle text="Qwixx sheet" />
	</FlexContainer>

	<FlexContainer align={'stretch'}>
		<FlexContainer>
			<DigitLine line={game.reds} color={Color.RED} onClick={onDigitClicked} />
			<DigitLine line={game.yellows} color={Color.YELLOW} onClick={onDigitClicked} />
			<DigitLine line={game.greens} color={Color.GREEN} onClick={onDigitClicked} />
			<DigitLine line={game.blues} color={Color.BLUE} onClick={onDigitClicked} />
		</FlexContainer>

		<FlexContainer vertical={false} extensible={false} align={'end'}>
			<FlexContainer vertical={false} justify={'center'}>
				<PenaltyCard onClick={onPenaltyClicked} />
				<PenaltyCard onClick={onPenaltyClicked} />
				<PenaltyCard onClick={onPenaltyClicked} />
				<PenaltyCard onClick={onPenaltyClicked} />
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
