<script lang="ts">
	import { Color } from '$lib/enums/color';
	import { FlexContainer } from '@totocorpsoftwareinc/frontend-toolkit';
	import DigitCard from './DigitCard.svelte';

	interface Props {
		digits: number[];
		color: Color;
	}

	let { digits, color }: Props = $props();
</script>

<FlexContainer vertical={false} styling={'space-x-1'}>
	{#each digits as digit}
		<DigitCard {digit} {color} />
	{/each}
</FlexContainer>
