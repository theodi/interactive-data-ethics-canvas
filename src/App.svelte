<script lang="ts">
	import Canvas from './components/Canvas.svelte';
  import ControlPanel from './components/ControlPanel.svelte';

  import { initLocalizationContext } from './i18n';
  initLocalizationContext();
</script>

<main>
  <article>
    <Canvas />
    <ControlPanel />
  </article>
</main>

<style>
	main {
		padding: 1em;
		margin: 0 auto;
	}
</style>