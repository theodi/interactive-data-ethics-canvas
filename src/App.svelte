<script lang="ts">
  import Canvas from './components/Canvas.svelte';
  import ControlPanel from './components/ControlPanel.svelte';
  import StatusBar from './components/StatusBar.svelte';
  import Welcome from './components/Welcome.svelte';
  import Warning from './components/Warning.svelte';

  import { initLocalizationContext } from './i18n';
  initLocalizationContext();
</script>

<main role="main">
  <section>
    <Canvas />
    <ControlPanel />
  </section>
  <footer>
    <StatusBar />
  </footer>
  <Welcome />
  <Warning />
</main>

<style>
	main {
		margin: 0 auto;
    min-width: 1024px;
    max-width: 1200px;
    background: var(--pale-grey);
    position: relative;
	}
  :global(:root) {
    --know: hsl(321, 77%, 52%);
    --explore: hsl(36, 72%, 55%);
    --plan: hsl(92, 54%, 38%);
    --integrate: hsl(201, 100%, 61%);

    --know-light: hsl(321, 76.9%, 66.1%);
    --explore-light: hsl(36, 71.6%, 68.2%);
    --plan-light: hsl(92, 32.7%, 56.3%);
    --integrate-light: hsl(201, 100%, 72.5%);

    --pale-grey: hsl(0, 0%, 93%);
    --mid-grey: #777;
    --dark-blue: hsl(218, 51%, 41%);
  }
  @media (min-width: 1480px) {
    main {
      max-width: 1480px;
    }
    section {
      display: flex;
    }
  }
</style>