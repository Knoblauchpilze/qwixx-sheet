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
		<StyledButton text="Reset" border={true} onClick={onReset}></StyledButton>
	</FlexContainer>

	<FlexContainer align={'stretch'}>
		<DigitLine line={game.reds} color={Color.RED} onClick={onDigitClicked}></DigitLine>
		<DigitLine line={game.yellows} color={Color.YELLOW} onClick={onDigitClicked}></DigitLine>
		<DigitLine line={game.greens} color={Color.GREEN} onClick={onDigitClicked}></DigitLine>
		<DigitLine line={game.blues} color={Color.BLUE} onClick={onDigitClicked}></DigitLine>

		<FlexContainer vertical={false} align={'end'}>
			<FlexContainer vertical={false} justify={'center'}>
				<PenaltyCard onClick={onPenaltyClicked}></PenaltyCard>
				<PenaltyCard onClick={onPenaltyClicked}></PenaltyCard>
				<PenaltyCard onClick={onPenaltyClicked}></PenaltyCard>
				<PenaltyCard onClick={onPenaltyClicked}></PenaltyCard>
				<GameCard text={penaltyScore.toString()} color={Color.NEUTRAL} locked={true}></GameCard>
			</FlexContainer>

			<FlexContainer vertical={false} justify={'center'}>
				<StyledText text="Score:" styling={'m-4'}></StyledText>
				<GameCard text={score.toString()} color={Color.NEUTRAL} locked={true}></GameCard>
			</FlexContainer>
		</FlexContainer>
	</FlexContainer>
</FlexContainer>
