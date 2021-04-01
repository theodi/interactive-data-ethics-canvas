<script lang="ts">
  import { canvasState } from '../store';
  import Editor from './Editor.svelte';

  export let blobRef: number;
  export let focussed: boolean;

  let title: string;
  let description: string;
  $: {
    ({
      title,
      description
    } = $canvasState.blobs[blobRef]);
  }
</script>

<section class:focussed>
  <h2>
    { title }
  </h2>
  {#if focussed}
    <Editor { blobRef } on:resetarea />
  {:else}
    <p class='description'>
      { description }
    </p>
  {/if}
</section>

<style>
  section {
    height: 100%;
    color: white;
    font-size: 0.8em;
    position: fixed;
    left: 0;
    right: 0;
    cursor: pointer;
  }
  section.focussed {
    font-size: 1em;
    margin: 1em;
  }
  h2, .description {
    padding: 0.7rem;
  }
  h2 {
    font-weight: bold;
    font-size: 1.4em;
  }
  .description {
    position: absolute;
    display: block;
    width: 100%;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
  }
</style>
