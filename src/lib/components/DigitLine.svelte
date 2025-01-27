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

	const score = 12;
</script>

<FlexContainer vertical={false} styling={'space-x-1'}>
	{#each digits as digit}
		<GameCard text={'' + digit} {color} />
	{/each}

	<LockCard locked={false} {color}></LockCard>
	<GameCard text={score.toString()} {color} />
</FlexContainer>
