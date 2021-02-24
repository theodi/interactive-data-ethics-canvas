<script lang="ts">
  import { canvasState } from '../store';
  import Editor from './Editor.svelte';

  export let blobRef: number;

  let title: string;
  let description: string;
  let focussed: boolean;
  $: {
    ({
      title,
      focussed,
      description
    } = $canvasState.blobs[blobRef]);
  }
</script>

<section>
  <h2>
    { title }
  </h2>
  {#if focussed}
    <Editor { blobRef } />
  {:else}
    <p class='description'>
      { description }
    </p>
  {/if}
</section>

<style>
  section {
    padding: 1rem;
    height: 100%;
    color: white;
  }
  h2 {
    font-weight: bold;
    font-size: 1.1em;
    padding-bottom: 1em;
  }
  .description {
    position: absolute;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    bottom: 0;
    left: 0;
  }
</style>
