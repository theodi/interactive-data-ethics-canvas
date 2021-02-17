<script lang="ts">
  import Blob from './Blob.svelte';
  import SvgButton from './SvgButton.svelte';
  import Cross from './icons/Cross.svelte';

  import { canvasState } from '../store';
  import { fade } from 'svelte/transition'
  const cols = 5;
  const rows = 3;
  const areaConfig = { size: 200, overlap: 0.05 };
  const margin = areaConfig.size * areaConfig.overlap * 4;
  const topMargin = 40;
  const height = rows * areaConfig.size;
  $: focusBlob = $canvasState.blobs.findIndex((x) => x.focussed === true);
</script>

<svg viewBox="-{ margin } -{ margin + topMargin } { cols * areaConfig.size + 2 * margin} { height + 2 * margin + topMargin }">
  <g class="cloud" transform="scale({ areaConfig.size }) translate(0.5 0.5)">
    {#each Array(cols * rows).fill(null).map((_, i) => i) as cell}
      <ellipse cy={ Math.floor(cell / 5) } cx={ cell % 5 } rx={ 0.5 + areaConfig.overlap * 2 }/>
    {/each}
    <rect width={ cols - 1 } height={ rows - 1 }/>
  </g>
  <text x={ Math.round((cols + areaConfig.overlap * 2) * areaConfig.size) } y={ -topMargin - 5 }>Data Ethics Canvas</text> 

  {#each $canvasState.blobs as blobState, index}
    {#if index !== focusBlob }
    <Blob
      { ...blobState }
      setHover={ (state) => { blobState.hovered = state } }
      setFocus={ (state) => blobState.focussed = state }
      { ...areaConfig }
      canvasHeight={ height }
    />
    {/if}
  {/each}

  {#if focusBlob > -1}
  <g class="editor" transition:fade>
    <rect class="overlay" x={-margin} y={-margin - topMargin} width={ cols * areaConfig.size + 2 * margin} height={ height + 2 * margin + topMargin} />
    <Blob 
      { ...$canvasState.blobs[focusBlob] }
      { ...areaConfig }
      bind:content={ $canvasState.blobs[focusBlob].content }
      canvasHeight={ height }
    />
    <SvgButton x={ cols * areaConfig.size - 50 } y=0 action={ () => setTimeout(() => $canvasState.blobs[focusBlob].focussed = false, 600) } icon={ Cross } />
  </g>
  {/if}
  
</svg>

<style>
  svg {
    background-color: #eee;
  }
  text {
    font-size: 3em;
    text-anchor: end;
    dominant-baseline: middle;
    font-weight: bold;
    fill: #345B9F;
  }
  .overlay {
    fill: white;
    opacity: 50%;
  }
  .cloud {
    fill: white;
  }
</style>