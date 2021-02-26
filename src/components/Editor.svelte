<script lang='ts'>
  import { canvasState } from '../store';
  import Basic from './editors/Basic.svelte';
  import SimpleList from './editors/SimpleList.svelte';

  const editors = {
    Basic,
    SimpleList,
  }
  export let blobRef: number;

  if ( !$canvasState.blobs[blobRef].content ) $canvasState.blobs[blobRef].content = [];
</script>

<section>
  <svelte:component this={ editors[$canvasState.blobs[blobRef].editor] } ref={ blobRef } />
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