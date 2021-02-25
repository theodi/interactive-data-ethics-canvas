<script lang='ts'>
  import { canvasState } from '../store';
  import Basic from './editors/Basic.svelte';
  import List from './editors/List.svelte';

  const editors = {
    Basic,
    List,
  }
  export let blobRef: number;
</script>

<section>
  <svelte:component this={ editors[$canvasState.blobs[blobRef].editor] } ref={ blobRef } bind:content={ $canvasState.blobs[blobRef].content } />
</section>

<style>
  section {
    box-sizing: border-box;
    width: 100%;
    max-height: 90%;
    padding: 1rem;
    overflow-y: scroll;
  }
</style>