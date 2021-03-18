<script lang='typescript'>
  import { savedCanvases, canvasState, lastUpdate, canvasReviver } from '../store';
  import CanvasCard from './CanvasCard.svelte';
  import { refreshStoredCanvasList } from '../events';

  let currentCanvas;
  const load = (uuid: string) => {
    const data = JSON.parse(localStorage.getItem(uuid), canvasReviver);
    canvasState.loadCanvas(data);
  }

  const deleteCanvas = (uuid: string) => {
    localStorage.removeItem(uuid);
    dispatchEvent(refreshStoredCanvasList);
  }

  $: {
    const { title, uuid } = $canvasState;
    const lastUpdated = $lastUpdate;
    currentCanvas = { title, uuid, lastUpdated };
  };
</script>

<div>
  <ul>
    <li class='loaded'>
      <CanvasCard canvas={ currentCanvas } loaded={ true } />
    </li>
    {#each $savedCanvases as canvas }
      {#if canvas.uuid !== $canvasState.uuid }
      <li class='loadable' on:click={ () => load(canvas.uuid)}>
        <CanvasCard { canvas } deleteAction={ () => deleteCanvas(canvas.uuid) } />
      </li>
      {/if}
    {/each}
  </ul>
</div>

<button on:click={ () => { localStorage.clear(); canvasState.resetState();} }>DELETE ALL</button>

<style>
  li {
    display: block;
    height: 5em;
    border: 1px dotted var(--mid-grey);
    width: 100%;
    margin-bottom: 0.5em;
    padding: 0.3em;
  }
  .loaded {
    border: none;
    background-color: var(--dark-blue);
    color: white;
  }
  .loadable {
    cursor: pointer;
  }
</style>