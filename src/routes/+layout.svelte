<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<title>Guess The Word</title>
<div class="mx-auto max-w-7xl px-6 lg:px-8">
	<nav>
		<h1 class="text-5xl font-semibold sm:text-7xl">Guess The Word</h1>
		<h2 class="mt-4 text-3xl font-light">Come up with the same word as your opponent</h2>
	</nav>
	{@render children()}
</div>
