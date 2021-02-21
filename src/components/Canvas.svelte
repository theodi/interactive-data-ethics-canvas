<script lang="ts">
  import Blob from './Blob.svelte';
  import Editor from './Editor.svelte';

  import { canvasState } from '../store';
  const cols = 5;
  const rows = 3;
  const areaConfig = { size: 200, overlap: 0.05 };
  const margin = areaConfig.size * areaConfig.overlap * 4;
  const topMargin = 40;
  const height = rows * areaConfig.size;
  $: focusBlob = $canvasState.blobs.findIndex((x) => x.focussed === true);
</script>

<svg
  viewBox="-{margin} -{margin + topMargin} {cols * areaConfig.size +
    2 * margin} {height + 2 * margin + topMargin}"
>
  <defs>
    {#each $canvasState.blobs as blobState, index}
      <g id={'blob-' + index}>
        <Blob
          {...blobState}
          {...areaConfig}
          canvasHeight={height}
        />
      </g>
    {/each}
  </defs>

  <g class="cloud" transform="scale({areaConfig.size}) translate(0.5 0.5)">
    {#each Array(cols * rows)
      .fill(null)
      .map((_, i) => i) as cell}
      <ellipse
        cy={Math.floor(cell / 5)}
        cx={cell % 5}
        rx={0.5 + areaConfig.overlap * 2}
      />
    {/each}
    <rect width={cols - 1} height={rows - 1} />
  </g>
  <text
    x={Math.round((cols + areaConfig.overlap * 2) * areaConfig.size)}
    y={-topMargin - 5}>Data Ethics Canvas</text
  >

  {#each $canvasState.blobs as blobState, index}
    {#if blobState && blobState.dimmed}
      <use xlink:href={`#blob-${index}`} />
    {/if}
  {/each}

  {#each $canvasState.blobs as blobState, index}
    {#if blobState && !blobState.focussed && !blobState.dimmed}
      <use
        xlink:href={`#blob-${index}`}
        on:mouseover={() => (blobState.hovered = true)}
        on:mouseout={() => (blobState.hovered = false)}
        on:click={() => (blobState.focussed = true)}
      />
    {/if}
  {/each}

  {#if focusBlob > -1}
    <Editor { focusBlob } x={ -margin } y={ - margin - topMargin } width={ cols * areaConfig.size + 2 * margin } height={ height + 2 * margin + topMargin } canvasHeight={ height }/>
  {/if}
</svg>

<style>
  svg {
    background-color: #eee;
  }
  text {
    font-size: 3em;
    text-anchor: end;
    font-weight: bold;
    fill: #345b9f;
  }
  .cloud {
    fill: white;
  }
</style>
