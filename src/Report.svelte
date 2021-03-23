<script lang='typescript'>
  import { setContext } from 'svelte';
  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get('uuid');

  const canvas = JSON.parse(localStorage.getItem(uuid));

  setContext('canvas', canvas);
</script>

{#if canvas}
  <h1>Hello: This is the report for { uuid }</h1>
  <code><pre>{ canvas }</pre></code>
{:else}
  <p>There has been an error retrieving canvas { uuid }.</p>
  <p>Please <a href='.'>return to the canvas</a> to try again.</a>
{/if}
