<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<title>Guess The Word</title>
<div class="mx-auto mt-2 box-border flex flex-col items-center gap-6">
	<div>
		<nav>
			<a href="/" class="text-4xl font-semibold sm:text-5xl">Guess The Word</a>
		</nav>
		<h1 class="pl-1 text-2xl font-light">Read each other's mind</h1>
	</div>
	{@render children()}
</div>
