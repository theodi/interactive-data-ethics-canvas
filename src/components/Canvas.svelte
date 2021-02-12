<script lang="ts">
  import Blob from './Blob.svelte';
  import SvgButton from './SvgButton.svelte';
  import Cross from './icons/Cross.svelte';

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
  <g class="editor" transition:fade="{{ duration: 100 }}">
    <rect class="blank" x={-margin} y={-margin} width={ cols * areaConfig.size + 2 * margin} height={ height + 2 * margin } />
    <Blob 
      { ...$canvasState.blobs[focusBlob] }
      { ...areaConfig }
      canvasHeight={ height }
    />
    <SvgButton x={ cols * areaConfig.size - 50 } y=0 action={ () => $canvasState.blobs[focusBlob].focussed = false } icon={ Cross } />
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
</style>