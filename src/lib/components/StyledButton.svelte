<script lang="ts">
	interface Props {
		text?: string;
		enabled?: boolean;
		border?: boolean;
		onClick?: () => void;
	}

	let { text = 'Click me', enabled = true, border = false, onClick }: Props = $props();

	let borderStyle = $state('');
	if (border === true) {
		borderStyle = 'border-solid border-2 border-secondary ';
	}
	// https://tailwindcss.com/docs/responsive-design
	borderStyle += 'rounded-[8px] px-3 md:px-12 py-1 md:py-4';
</script>

{#if enabled}
	<button class="bg-primary text-secondary hover:bg-primary-hover {borderStyle}" onclick={onClick}
		>{text}</button
	>
{:else}
	<!-- https://stackoverflow.com/questions/34684467/dont-redirect-on-button-click-with-css -->
	<button disabled class="bg-primary-selected text-secondary {borderStyle}" onclick={onClick}
		>{text}</button
	>
{/if}
