<script lang="ts">
	import { Color } from '$lib/enums/color';
	// https://stackoverflow.com/questions/67337435/how-to-config-for-using-svg-file-in-sveltekit
	import PadlockLocked from '$lib/assets/padlock-locked.svg?raw';
	import PadlockUnlocked from '$lib/assets/padlock-open.svg?raw';
	import SvgCard from './SvgCard.svelte';

	interface Props {
		locked: boolean;
		color: Color;
		onClick?: (ticked: boolean) => void;
	}

	let { locked, color, onClick }: Props = $props();

	const handleClick = () => {
		locked = !locked;
		if (onClick !== undefined) {
			onClick(locked);
		}
		return locked;
	};
</script>

{#if !locked}
	<SvgCard {color} selected={locked} onClick={handleClick}>
		<!-- https://sveltejs.github.io/eslint-plugin-svelte/rules/no-at-html-tags/ -->
		<!-- In this case it's safe to disable this rule as we own the injected SVG -->
		<!-- eslint-disable svelte/no-at-html-tags -->
		{@html PadlockUnlocked}
	</SvgCard>
{:else}
	<SvgCard {color} selected={locked} onClick={handleClick}>
		{@html PadlockLocked}
	</SvgCard>
{/if}
