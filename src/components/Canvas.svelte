<script>
  import Blob from './Blob.svelte';
  import { blobs } from '../store';
  const cols = 5;
  const rows = 3;
  const areaConfig = { size: 200, overlap: 0.05 };
  const margin = areaConfig.size * areaConfig.overlap * 5;
  const height = rows * areaConfig.size;
</script>

<svg viewBox="-{ margin } -{ margin } { cols * areaConfig.size + 2 * margin} { height + 2 * margin }">
  <g class="cloud" transform="scale({ areaConfig.size }) translate(0.5 0.5)">
    {#each Array(cols * rows).fill().map((_, i) => i) as cell}
      <ellipse cy={ Math.floor(cell / 5) } cx={ cell % 5 } rx={ 0.5 + areaConfig.overlap * 3 }/>
    {/each}
    <rect width={ cols - 1 } height={ rows - 1 }/>
  </g>

  {#each blobs as blobStore}
    <Blob
      state={ blobStore }
      { ...areaConfig }
      canvasHeight={ height }
    />
  {/each}
</svg>

<style>
  svg {
    background-color: #eee;
  }
  .cloud {
    fill: white;
  }
</style>