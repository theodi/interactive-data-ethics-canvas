<script lang='ts'>
  import { canvasState } from '../store';
  import Basic from './editors/Basic.svelte';
  const editors = {
    Basic
  }
  export let blobRef: number;
</script>

<section>
  <svelte:component this={ editors['Basic'] } bind:content={ $canvasState.blobs[blobRef].content } />
</section>

<style>
  section {
    box-sizing: border-box;
    width: 100%;
  }
</style>