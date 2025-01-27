<script lang="ts">
	import { Color } from '$lib/enums/color';
	import { FlexContainer } from '@totocorpsoftwareinc/frontend-toolkit';
	import GameCard from './GameCard.svelte';
	import LockCard from './LockCard.svelte';

	interface Props {
		digits: number[];
		color: Color;
	}

	let { digits, color }: Props = $props();
</script>

<FlexContainer vertical={false}>
	<FlexContainer vertical={false} styling="w-4/5 mr-4">
		{#each digits as digit}
			<GameCard text={'' + digit} {color} />
		{/each}
	</FlexContainer>

	<FlexContainer vertical={false} styling="w-1/5 ml-4 space-x-2">
		<LockCard locked={false} {color}></LockCard>
		<GameCard text={'0'} {color} />
	</FlexContainer>
</FlexContainer>
