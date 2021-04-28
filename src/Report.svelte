<script lang='typescript'>
  import { setContext } from 'svelte';
  import { canvasReviver } from './utils/canvas-reviver';

  import Title from './report/Title.svelte';
  import Actions from './report/Actions.svelte';

  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get('uuid');

  const canvas = JSON.parse(localStorage.getItem(uuid), canvasReviver);

  setContext('canvas', canvas);
</script>

{#if canvas}
  <main role='main'>
    <Title />
    <Actions />

  </main>

  <aside>
    <code><pre>{ JSON.stringify(canvas, null, 2) }</pre></code>
  </aside>
{:else}
  <p>There has been an error retrieving canvas { uuid }.</p>
  <p>Please <a href='.'>return to the canvas</a> to try again.</p>
{/if}

<style>
  main {
    margin-left: auto;
    margin-right: auto;
    max-width: 800px;
  }
  aside {
    background: black;
    color: green;
    position: fixed;
    height: 250px;
    bottom: 0;
    overflow-y: scroll;
  }
  :global(h1) {
    font-size: 2em;
  }
  :global(h2) {
    font-size: 1.7em;
  }
  :global(h3) {
    font-size: 1.4em;
  }
  main :global(h1, h2, h3, table, p) {
    padding-top: 1em;
  }
  code {
    font-family: monospace;
  }
</style>