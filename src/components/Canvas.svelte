<script lang="ts">
  import { setContext } from 'svelte';
  import { fade } from 'svelte/transition';

  import CanvasBackground from './CanvasBackground.svelte';
  import Blob from './Blob.svelte';
  import AreaContent from './AreaContent.svelte';
  import AreaGuidance from './AreaGuidance.svelte';
  import SvgButton from './SvgButton.svelte';
  import Cross from './icons/Cross.svelte';

  import { canvasState } from '../store';

  const spacing = 200;
  const overlap = 0.05;
  const rows = 3;
  const columns = 5;
  const width = columns * spacing;
  const height = rows * spacing;
  const margin = spacing * overlap * 4;
  const topMargin = 40;
  const zoomLevel = 4;

  setContext('canvasConfig', {
    spacing,
    overlap,
    rows,
    columns,
    width,
    height,
    margin,
    zoomLevel,
    topMargin,
  });

  $: focusBlob = $canvasState.blobs.findIndex((x) => x.focussed === true);
  const contentBoxSize = spacing * 0.8;
  const contentBoxOffset = (spacing - contentBoxSize) / 2;
  const contentScale = 0.8;
  const content = {
    grid: {
      size: spacing * contentScale,
      offset: (spacing * (1 - contentScale)) / 2,
    },
    focussed: {
      size: spacing * zoomLevel * contentScale,
    },
  };
</script>

<svg
  viewBox="-{margin} -{margin + topMargin} {width + 2 * margin} {height +
    2 * margin +
    topMargin}"
>
  <defs>
    {#each $canvasState.blobs as blobState, index}
      <g id={'blob-' + index}>
        <Blob {...blobState} />
      </g>
    {/each}
  </defs>

  <CanvasBackground />

  {#each $canvasState.blobs as blobState, index}
    {#if blobState && blobState.dimmed}
      <g class="dimmed">
        <use xlink:href={`#blob-${index}`} />
        <g
          transform="translate({blobState.column * spacing} {blobState.row *
            spacing})"
          on:click={() => (blobState.focussed = true)}
        >
          <foreignObject
            x={contentBoxOffset}
            y={contentBoxOffset}
            width={contentBoxSize}
            height={contentBoxSize}
          >
            <AreaContent blobRef={index} />
          </foreignObject>
        </g>
      </g>
    {/if}
  {/each}

  {#each $canvasState.blobs as blobState, index}
    {#if blobState && !blobState.focussed && !blobState.dimmed}
      <g
        on:mouseover={() => (blobState.hovered = true)}
        on:mouseout={() => (blobState.hovered = false)}
      >
        <use
          class={blobState.group.toLowerCase()}
          xlink:href={`#blob-${index}`}
        />
        <g
          transform="translate({blobState.column * spacing} {blobState.row *
            spacing})"
          on:click={() => (blobState.focussed = true)}
        >
          <foreignObject
            x={contentBoxOffset}
            y={contentBoxOffset}
            width={contentBoxSize}
            height={contentBoxSize}
          >
            <AreaContent blobRef={index} />
          </foreignObject>
        </g>
      </g>
    {/if}
  {/each}

  {#if focusBlob > -1}
    <g transition:fade>
      <rect
        class="overlay"
        x={-margin}
        y={-margin - topMargin}
        width={width + 2 * margin}
        height={height + 2 * margin + topMargin}
        on:click={() => ($canvasState.blobs[focusBlob].focussed = false)}
      />
    </g>
    <use
      class={$canvasState.blobs[focusBlob].group.toLowerCase()}
      xlink:href={`#blob-${focusBlob}`}
    />
    <g transition:fade>
      <foreignObject
        transform="translate({(height - content.focussed.size) / 2} {(height -
          content.focussed.size) /
          2})"
        width={content.focussed.size}
        height={content.focussed.size}
      >
        <AreaContent blobRef={focusBlob} />
      </foreignObject>
      <SvgButton
        x={580}
        y={-10}
        action={() => ($canvasState.blobs[focusBlob].focussed = false)}
        icon={Cross}
      />

      <AreaGuidance blobIndex={ focusBlob } />
    </g>
  {/if}
</svg>

<style>
  svg {
    background-color: #eee;
    max-width: 1200px;
  }
  .overlay {
    fill: white;
    opacity: 50%;
  }
  .dimmed {
    /* filter: grayscale(100%) contrast(50%) brightness(140%); */
    fill: hsl(0, 0%, 75%);
  }
  .know {
    fill: var(--know);
  }
  .explore {
    fill: var(--explore);
  }
  .plan {
    fill: var(--plan);
  }
  .integrate {
    fill: var(--integrate);
  }
</style>
