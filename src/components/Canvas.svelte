<script>
  import Blob from './Blob.svelte';
  import { canvasState } from '../store';
  import { fade } from 'svelte/transition'
  const cols = 5;
  const rows = 3;
  const areaConfig = { size: 200, overlap: 0.05 };
  const margin = areaConfig.size * areaConfig.overlap * 5;
  const height = rows * areaConfig.size;
  $: focusBlob = $canvasState.blobs.findIndex((x) => x.focussed === true);
</script>

<svg viewBox="-{ margin } -{ margin } { cols * areaConfig.size + 2 * margin} { height + 2 * margin }">
  <g class="cloud" transform="scale({ areaConfig.size }) translate(0.5 0.5)">
    {#each Array(cols * rows).fill().map((_, i) => i) as cell}
      <ellipse cy={ Math.floor(cell / 5) } cx={ cell % 5 } rx={ 0.5 + areaConfig.overlap * 3 }/>
    {/each}
    <rect width={ cols - 1 } height={ rows - 1 }/>
  </g>

  {#each $canvasState.blobs as blobState}
    <Blob
      { ...blobState }
      setHover={ (state) => blobState.hovered = state }
      setFocus={ (state) => blobState.focussed = state }
      { ...areaConfig }
      canvasHeight={ height }
    />
  {/each}

  {#if focusBlob > -1}
  <g class="editor">
    <rect in:fade class="blank" x={-margin} y={-margin} width={ cols * areaConfig.size + 2 * margin} height={ height + 2 * margin } />
    <Blob 
      { ...$canvasState.blobs[focusBlob] }
      { ...areaConfig }
      canvasHeight={ height }
    />
    <g class="button" transform="translate({ cols * areaConfig.size - 50 } { 0 })" on:click={ () => $canvasState.blobs[focusBlob].focussed = false } >
      <rect x=0 y=0 width=50 height=50 />
      <line x1=10 y1=10 x2=40 y2=40 />
      <line x1=10 y1=40 x2=40 y2=10 />
    </g>
  </g>
  {/if}
  
</svg>

<style>
  svg {
    background-color: #eee;
  }
  .blank {
    fill: white;
  }
  .cloud {
    fill: white;
  }
  .button {
    stroke: black;
    stroke-width: 5;
    fill: white;
  }
</style>