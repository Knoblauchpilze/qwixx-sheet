<script lang="ts">
	interface Props {
		text?: string;
	}

	let { text = 'Home' }: Props = $props();
</script>

<h1 class="text-secondary px-3 py-1 text-xl font-bold italic md:px-12 md:py-4 md:text-3xl">
	{text}
</h1>
