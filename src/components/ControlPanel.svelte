<script lang="ts">
  import { canvasState, savedCanvases } from '../store';
</script>

<aside>
  <button on:click={ () => canvasState.resetState() }>CLEAR TEMPLATE</button>

  <h2>Saved canvases</h2>
  <ul>
    {#each $savedCanvases as canvas }
      <li>{canvas}</li>
    {/each}
  </ul>
  <button on:click={ () => { localStorage.clear(); canvasState.resetState();} }>DELETE ALL</button>
</aside>