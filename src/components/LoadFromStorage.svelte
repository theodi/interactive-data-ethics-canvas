<script lang='typescript'>
  import { savedCanvases, canvasState } from '../store';
  import { lastUpdate } from '../store/last-updated';
  import CanvasCard from './CanvasCard.svelte';
  import { load, renameSavedCanvas, deleteCanvas } from '../utils/local-storage';

  let currentCanvas;
  $: {
    const { title, uuid } = $canvasState;
    const lastUpdated = $lastUpdate;
    currentCanvas = { title, uuid, lastUpdated };
  };
  const deleteCurrent = () => {
    const thisUuid = $canvasState.uuid;
    const otherUuid = $savedCanvases.map(x => x.uuid).filter(x => x !== $canvasState.uuid);
    if (otherUuid.length < 1)
      canvasState.resetState()
    else
      load(otherUuid[0]);
    deleteCanvas(thisUuid);
  }
</script>

<div>
  <ul>
    <li class='loaded'>
      <CanvasCard
        title={ $canvasState.title }
        uuid={ $canvasState.uuid }
        lastUpdated={ $lastUpdate }
        blobs={ $canvasState.blobs }
        loaded={ true }
        renameAction={ (newName) => $canvasState.title = newName }
        deleteAction={ () => deleteCurrent() }
      />
    </li>
    {#each $savedCanvases as canvas }
      {#if canvas.uuid !== $canvasState.uuid }
      <li class='loadable' on:click={ () => load(canvas.uuid)}>
        <CanvasCard
          title={ canvas.title }
          uuid={ canvas.uuid }
          lastUpdated={ canvas.lastUpdated }
          blobs={ canvas.blobs }
          renameAction={ (newName) => renameSavedCanvas(canvas.uuid, newName) }
          deleteAction={ () => deleteCanvas(canvas.uuid) }
        />
      </li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    display: block;
    height: 100px;
    border: 1px dashed var(--mid-grey);
    width: 100%;
    margin-bottom: 0.5em;
    margin-right: 0.5em;
    padding: 0.3em;
    max-width: 280px;
  }
  .loaded {
    border-style: none;
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
  @media (min-width: 1480px) {
    ul {
      display: initial;
    }
    li {
      margin-right: 0;
      max-width: initial;
    }
  }
</style>