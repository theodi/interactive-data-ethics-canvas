<script lang='ts'>
  import { fade } from 'svelte/transition';
  import { canvasState } from '../store';

  import SvgButton from './SvgButton.svelte';
  import Cross from './icons/Cross.svelte';
  import Basic from './editors/Basic.svelte';
  const editors = {
    Basic
  }

  export let focusBlob: number;

  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;

  export let canvasHeight: number;

  const editorSize = 640;
</script>


<g class="editor" transition:fade transform="translate({ x } { y })">
  <rect
    class="overlay"
    { width }
    { height }
  />
  <SvgButton
    x={width - 50}
    y="0"
    action={() =>
      setTimeout(
        () => ($canvasState.blobs[focusBlob].focussed = false),
        600
      )}
    icon={Cross}
  />
</g>
<use xlink:href={`#blob-${focusBlob}`} />
<foreignObject transition:fade x="{ (canvasHeight - editorSize) / 2 }" y="{ (canvasHeight - editorSize) / 2 }" width="{ editorSize }" height="{ editorSize }">
  <section id='editor'>
    <svelte:component this={ editors['Basic'] } bind:content={ $canvasState.blobs[focusBlob].content } />
  </section>
</foreignObject>


<style>
  section {
    top: 0;
    position: relative;
    padding-top: 40px;
    padding-left: 1em;
    padding-right: 1em;
    box-sizing: border-box;
    overflow-y: scroll;
    height: 600px;
    width: 100%;
  }
  .overlay {
    fill: white;
    opacity: 50%;
  }
</style>