<div class="loader text-lg"></div>

<style>
	.loader {
		width: fit-content;
		font-family: monospace;
		clip-path: inset(0 3ch 0 0);
		animation: l4 1s steps(4) infinite;
	}
	.loader:before {
		content: 'Waiting for opponent...';
	}
	@keyframes l4 {
		to {
			clip-path: inset(0 -1ch 0 0);
		}
	}
</style>
