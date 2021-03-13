<script lang="ts">
  import { canvasState, savedCanvases, serialisedCanvas } from '../store';
  import { Group, Status } from '../types';
  import { getLocalization } from '../i18n';
  import DownloadIcon from './icons/noun_Notebook_791773.svelte';

  const { t } = getLocalization();

  const groups = Object.keys(Group);
  const statuses = Object.keys(Status);

  let visibleGroups = groups;
  let visibleStatuses = statuses;
  let showExportControls = false;
  let showLoadControls = false;

  $: {
    for ( let i = 0; i < $canvasState.blobs.length; i++ ) {
      $canvasState.blobs[i].dimmed = !(
        visibleGroups.includes($canvasState.blobs[i].group) &&
        visibleStatuses.includes($canvasState.blobs[i].status || Status.IN_PROGRESS)
      )
    }
  }
  $: dataUrl = URL.createObjectURL(
    new Blob([JSON.stringify($serialisedCanvas)], { type: 'application/json'})
  )
  $: downloadFilename = `DataEthicsCanvas_${ $canvasState.uuid }.json`
</script>

<aside class='container'>
  <div>
    <button on:click={ () => canvasState.resetState() }>{ $t('new_canvas_button') }</button>
    <div>
      <button on:click={ () => showExportControls = !showExportControls }>{ $t('export_button') }</button>
      {#if showExportControls}
        <div class='export-controls'>
          <a href='{ dataUrl }' download='{ downloadFilename }' class='icon-button'>
            <DownloadIcon />
            <span>{ $t('file:Download') }</span>
          </a>
        </div>
      {/if}
  
    </div>
    <button on:click={ () => showLoadControls = !showLoadControls }>{ $t('load_button') }</button>  
  </div>

  <fieldset class='two-cols'>
    <legend><h2>{ $t('filter_by_group_title') }</h2></legend>

    <ul>
      {#each groups as group}
        <li>
          <input id={group} type=checkbox bind:group={ visibleGroups } value="{ group }">
          <label for={group}>{ $t(`group:${group}`) }</label>  
        </li>
      {/each}
    </ul>
  </fieldset>

  <fieldset class='two-cols'>
    <legend><h2>{ $t('filter_by_status_title') }</h2></legend>

    <ul>
      {#each statuses as status}
        <li>
        <input id={status} type=checkbox bind:group={ visibleStatuses } value="{ status }">
        <label for={status}>{ $t(`status:${status}`) }</label>
        </li>
      {/each}
    </ul>
  </fieldset>

</aside>

{#if showLoadControls}
<h2>Saved canvases</h2>
<ul>
  {#each $savedCanvases as canvas }
    <li>{canvas}</li>
  {/each}
</ul>
<button on:click={ () => { localStorage.clear(); canvasState.resetState();} }>DELETE ALL</button>
{/if}

<style>
  aside {
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-gap: 10px;
    padding-top: 10px;
    max-width: 1200px;
    font-size: 1.25em;
  }
  button {
    width: 100%;
    margin-bottom: 1em;
  }
  a, button {
    padding: 0.75em 1em;
    color: white;
    background: var(--dark-blue);
    display: block;
    text-decoration: none;
  }
  a:hover, button:hover {
    box-shadow: 5px 5px black;
    position: relative;
    top: -5px;
    left: -5px;
  }
  .two-cols {
    grid-column-end: span 2;
  }
  h2 {
    font-size: 1.25em;
    padding-bottom: 1em;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  li {
    display: block;
    width: 50%;
    padding-bottom: 0.5em;
  }
  .container {
    position: relative;
  }
  .export-controls {
    position: absolute;
    left: 20%;
    top: 50px;
    background: var(--pale-grey);
    padding: 20px;
  }
  .icon-button :global(svg) {
    height: 1em;
    top: .125em;
    position: relative;
    padding-right: 0.5em;
  }
  .icon-button :global(svg path, svg polygon) {
    fill: white;
  }
  @media (min-width: 1400px) {
    aside {
      display: initial;
      padding-left: 20px;
      padding-top: 0;
      min-width: 180px;
      max-width: 280px;
    }
    .export-controls {
      position: relative;
      left: initial;
      top: -1em;
    }
    h2 {
      padding-top: 1em;
    }
  }
</style>