<script lang="ts">
	import DigitLine from '$lib/components/DigitLine.svelte';
	import GameCard from '$lib/components/GameCard.svelte';
	import { Color } from '$lib/enums/color';
	import { FlexContainer, StyledTitle } from '@totocorpsoftwareinc/frontend-toolkit';

	const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const decreasingDigits = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
</script>

<FlexContainer align={'stretch'} styling={'border-2 rounded-xl border-accent'}>
	<StyledTitle text="Qwixx sheet" />
	<FlexContainer align={'stretch'}>
		<DigitLine {digits} color={Color.RED}></DigitLine>
		<DigitLine {digits} color={Color.YELLOW}></DigitLine>
		<DigitLine digits={decreasingDigits} color={Color.GREEN}></DigitLine>
		<DigitLine digits={decreasingDigits} color={Color.BLUE}></DigitLine>

		<FlexContainer vertical={false} align={'end'}>
			<FlexContainer vertical={false} justify={'center'}>
				<GameCard text={''} color={Color.NEUTRAL} ></GameCard>
				<GameCard text={''} color={Color.NEUTRAL} ></GameCard>
				<GameCard text={''} color={Color.NEUTRAL} ></GameCard>
				<GameCard text={''} color={Color.NEUTRAL} ></GameCard>
				<GameCard text={'0'} color={Color.NEUTRAL} locked={true}></GameCard>
			</FlexContainer>

			<FlexContainer vertical={false} justify={'center'}>
				<GameCard text={'0'} color={Color.NEUTRAL} locked={true}></GameCard>
			</FlexContainer>
		</FlexContainer>
	</FlexContainer>
</FlexContainer>
