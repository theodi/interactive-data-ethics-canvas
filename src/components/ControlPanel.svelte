<script lang="ts">
  import { canvasState, savedCanvases, serialisedCanvas } from '../store';
  import { Group } from '../types';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();

  const groups = Object.keys(Group);
  let visibleGroups = groups;
  $: {
    for ( let i = 0; i < $canvasState.blobs.length; i++ ) {
      $canvasState.blobs[i].dimmed = !visibleGroups.includes($canvasState.blobs[i].group)
    }
  }
  $: dataUrl = URL.createObjectURL(
    new Blob([JSON.stringify($serialisedCanvas)], { type: 'application/json'})
  )
  $: downloadFilename = `DataEthicsCanvas_${ $canvasState.uuid }.json`
</script>

<aside>
  <button on:click={ () => canvasState.resetState() }>CLEAR TEMPLATE</button>

  <fieldset>
    <legend><h2>{ $t('group:Title') }</h2></legend>

    {#each groups as group}
      <input id={group} type=checkbox bind:group={ visibleGroups } value="{ group }">
      <label for={group}>{ $t(`group:${group}`) }</label>
    {/each}
  </fieldset>
  
  <a href='{ dataUrl }' download='{ downloadFilename }'>{ $t('file:Download') }</a>

  <h2>Saved canvases</h2>
  <ul>
    {#each $savedCanvases as canvas }
      <li>{canvas}</li>
    {/each}
  </ul>
  <button on:click={ () => { localStorage.clear(); canvasState.resetState();} }>DELETE ALL</button>
</aside>