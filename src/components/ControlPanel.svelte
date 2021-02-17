<script lang="ts">
  import { canvasState, savedCanvases } from '../store';
  import { Group } from '../types';
  const groups = Object.keys(Group);
  let visibleGroups = groups;
  $: {
    for ( let i = 0; i < $canvasState.blobs.length; i++ ) {
      $canvasState.blobs[i].dimmed = !visibleGroups.includes($canvasState.blobs[i].group)
    }
  }
</script>

<aside>
  <button on:click={ () => canvasState.resetState() }>CLEAR TEMPLATE</button>

  <fieldset>
    <legend><h2>Group filter</h2></legend>

    {#each groups as group}
      <input id={group} type=checkbox bind:group={ visibleGroups } value="{ group }">
      <label for={group}>{ group }</label>
    {/each}
    { visibleGroups }
  </fieldset>

  <h2>Saved canvases</h2>
  <ul>
    {#each $savedCanvases as canvas }
      <li>{canvas}</li>
    {/each}
  </ul>
  <button on:click={ () => { localStorage.clear(); canvasState.resetState();} }>DELETE ALL</button>
</aside>