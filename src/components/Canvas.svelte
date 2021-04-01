<script lang="ts">
  import { setContext } from 'svelte';
  import { fade } from 'svelte/transition';

  import CanvasBackground from './CanvasBackground.svelte';
  import Blob from './Blob.svelte';
  import AreaContent from './AreaContent.svelte';
  import Sidebar from './Sidebar.svelte';
  import SvgButton from './SvgButton.svelte';
  import Cross from './icons/Cross.svelte';
  import Status from './Status.svelte';
  import Title from './Title.svelte'

  import { canvasState } from '../store/canvas';
  import { filtered } from '../store/filtered';
  import { getLocalization } from '../i18n';

  const { t } = getLocalization();

  const spacing = 200;
  const overlap = 0.05;
  const rows = 3;
  const columns = 5;
  const width = columns * spacing;
  const height = rows * spacing;
  const margin = spacing * overlap * 4;
  const topMargin = 40;
  const bottomMargin = 20;
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

  const hovered = {};
  let focussed = undefined;

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
    topMargin + bottomMargin}"
>
  <defs>
    {#each $canvasState.blobs as { row, column, id }, index}
      <g id={'blob-' + index}>
        <Blob
          { row } { column }
          hovered={ hovered[id] }
          focussed={ focussed === index }
          dimmed={ $filtered[id] }
          />
      </g>
    {/each}
  </defs>

  <CanvasBackground />
  <foreignObject x=85 y=-85 width=950 height=60>
    <Title />
  </foreignObject>

  {#each $canvasState.blobs as { id, column, row }, index}
    {#if $filtered[id] }
      <g class="dimmed">
        <use xlink:href={`#blob-${index}`} />
        <g
          transform="translate({column * spacing} {row *
            spacing})"
        >
          <foreignObject
            x={contentBoxOffset}
            y={contentBoxOffset}
            width={contentBoxSize}
            height={contentBoxSize}
          >
            <AreaContent blobRef={index} focussed={ false } />
          </foreignObject>
        </g>
      </g>
    {/if}
  {/each}

  {#each $canvasState.blobs as { id, group, column, row }, index}
    {#if focussed !== index && !$filtered[id] }
      <g
        on:mouseover={() => (hovered[id] = true)}
        on:mouseout={() => (hovered[id] = false)}
      >
        <use
          class={group.toLowerCase()}
          xlink:href={`#blob-${index}`}
        />
        <g
          transform="translate({column * spacing} {row *
            spacing})"
          on:click={() => { focussed = index; hovered[id] = false; } }
        >
          <foreignObject
            x={contentBoxOffset}
            y={contentBoxOffset}
            width={contentBoxSize}
            height={contentBoxSize}
          >
            <AreaContent blobRef={index} focussed={ false }/>
          </foreignObject>
        </g>
      </g>
    {/if}
  {/each}

  {#if focussed !== undefined}
    <g transition:fade>
      <rect
        class="overlay"
        x={-margin}
        y={-margin - topMargin}
        width={width + 2 * margin}
        height={height + 2 * margin + topMargin}
        on:click={() => (focussed = undefined)}
      />
    </g>
    <use
      class={$canvasState.blobs[focussed].group.toLowerCase()}
      xlink:href={`#blob-${focussed}`}
    />
    <g transition:fade>
      <foreignObject
        x={(height - content.focussed.size) / 2 }
        y={(height - content.focussed.size) / 2 }
        width={content.focussed.size}
        height={content.focussed.size}
      >
        <AreaContent blobRef={focussed} focussed={ true }
          on:resetarea={(d) => {
            const id = d.detail.id;
            const contentString = JSON.stringify($canvasState.blobs[id].content, null, 2);
            
            $canvasState.blobs[id].notes = $canvasState.blobs[id].notes || 'Rescued content\n';
            $canvasState.blobs[id].notes += contentString;
            $canvasState.blobs[id].notes += '\n\n';
            $canvasState.blobs[id].content = new Array();
            focussed = undefined;
            const reload = window.confirm($t('reload_error'));
            if (reload) window.location.reload();
          }}
        />
      </foreignObject>
      <SvgButton
        x={580}
        y={-10}
        action={() => (focussed = undefined)}
        icon={Cross}
      />

      <Sidebar blobIndex={ focussed } />
      <Status ref={ focussed }/>
    </g>
  {/if}
</svg>

<style>
  svg {
    max-width: 1200px;
    width: 100%;
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
