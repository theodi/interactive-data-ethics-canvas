<script lang='typescript'>
  import { savedCanvases, canvasState, lastUpdate } from '../store';
  import CanvasCard from './CanvasCard.svelte';
  import { refreshStoredCanvasList } from '../events';
  import { canvasReviver } from '../utils/canvas-reviver';

  const loadFromLocalStorage = (uuid) => JSON.parse(localStorage.getItem(uuid), canvasReviver);
  const saveToLocalStorage = (uuid, canvas) => localStorage.setItem(uuid, JSON.stringify(canvas));

  let currentCanvas;
  const load = (uuid: string) => {
    const data = loadFromLocalStorage(uuid);
    canvasState.loadCanvas(data);
  }

  const deleteCanvas = (uuid: string) => {
    localStorage.removeItem(uuid);
    dispatchEvent(refreshStoredCanvasList);
  }
  const renameSavedCanvas = (uuid: string, newName: string) => {
    const data = loadFromLocalStorage(uuid);
    data.title = newName;
    data.lastUpdated = new Date();
    saveToLocalStorage(uuid, data);
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
      <CanvasCard
        title={ $canvasState.title }
        lastUpdated={ $lastUpdate }
        loaded={ true }
        renameAction={ (newName) => $canvasState.title = newName }
      />
    </li>
    {#each $savedCanvases as canvas }
      {#if canvas.uuid !== $canvasState.uuid }
      <li class='loadable' on:click={ () => load(canvas.uuid)}>
        <CanvasCard
          title={ canvas.title }
          lastUpdated={ canvas.lastUpdated }
          renameAction={ (newName) => renameSavedCanvas(canvas.uuid, newName) }
          deleteAction={ () => deleteCanvas(canvas.uuid) }
        />
      </li>
      {/if}
    {/each}
  </ul>
</div>

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
  .loaded :global(svg) {
    fill: white;
  }
  li :global(input) {
    border-bottom-width: 3px;
    border-color: var(--mid-grey);
  }
  .loaded :global(input) {
    border-color: white;
  }
  .loadable {
    cursor: pointer;
  }
</style>