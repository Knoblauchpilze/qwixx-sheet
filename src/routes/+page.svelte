<script lang="ts">
	import DigitLine from '$lib/components/DigitLine.svelte';
	import GameCard from '$lib/components/GameCard.svelte';
	import { Color } from '$lib/enums/color';
	import { Qwixx } from '$lib/game/qwixx';
	import { FlexContainer, StyledTitle } from '@totocorpsoftwareinc/frontend-toolkit';

	const game = new Qwixx();

	function getPenaltyText(ticked: boolean): string {
		return ticked ? 'X' : '';
	}
</script>

<FlexContainer align={'stretch'} styling={'border-2 rounded-xl border-accent'}>
	<StyledTitle text="Qwixx sheet" />
	<FlexContainer align={'stretch'}>
		<DigitLine line={game.reds} color={Color.RED}></DigitLine>
		<DigitLine line={game.yellows} color={Color.YELLOW}></DigitLine>
		<DigitLine line={game.greens} color={Color.GREEN}></DigitLine>
		<DigitLine line={game.blues} color={Color.BLUE}></DigitLine>

		<FlexContainer vertical={false} align={'end'}>
			<FlexContainer vertical={false} justify={'center'}>
				<GameCard text={getPenaltyText(game.penalties > 0)} color={Color.NEUTRAL}></GameCard>
				<GameCard text={getPenaltyText(game.penalties > 0)} color={Color.NEUTRAL}></GameCard>
				<GameCard text={getPenaltyText(game.penalties > 0)} color={Color.NEUTRAL}></GameCard>
				<GameCard text={getPenaltyText(game.penalties > 0)} color={Color.NEUTRAL}></GameCard>
				<GameCard text={'0'} color={Color.NEUTRAL} locked={true}></GameCard>
			</FlexContainer>

			<FlexContainer vertical={false} justify={'center'}>
				<GameCard text={game.score.toString()} color={Color.NEUTRAL} locked={true}></GameCard>
			</FlexContainer>
		</FlexContainer>
	</FlexContainer>
</FlexContainer>
