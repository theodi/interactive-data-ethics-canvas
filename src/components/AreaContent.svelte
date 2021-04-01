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
    <p>
      { description }
    </p>
  {/if}
</section>

<style>
  section {
    height: 100%;
    color: white;
    font-size: 0.8em;
    padding: 0.7em;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }
  section.focussed {
    font-size: 1em;
    padding: 1.7em;
    cursor: unset;
    display: block;
  }
  h2 {
    font-weight: bold;
    font-size: 1.4em;
    flex-grow: 1;
    padding-bottom: 0.7em;
  }
</style>
