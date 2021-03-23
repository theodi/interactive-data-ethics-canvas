<script lang="ts">
  import { canvasState, savedCanvases, serialisedCanvas } from '../store';
  import { Group, Status } from '../types';
  import { getLocalization } from '../i18n';
  import Info from './Info.svelte';
  import LoadControls from './LoadControls.svelte';
  import DownloadIcon from './icons/noun_Notebook_791773.svelte';

  const { t } = getLocalization();

  const groups = Object.keys(Group);
  const statuses = Object.keys(Status);

  let visibleGroups = groups;
  let visibleStatuses = statuses;
  let sidebarComponent = undefined;

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
  {#if sidebarComponent}
    <svelte:component
      this={ sidebarComponent }
      backAction={ () => sidebarComponent = undefined }
    />
  {:else}
    <div class='narrow-bordered-right wide-bordered-bottom'>
      <button class='large-button' on:click={ () => sidebarComponent = LoadControls }>{ $t('new_button') }</button>
      <a class='large-button' href='{ dataUrl }' download='{ downloadFilename }'>{ $t('export_button') }</a>
      <a
        class='large-button'
        href='report?uuid={ $canvasState.uuid }'
        target='_blank'>{ $t('print_button') }</a>  
    </div>

    <div class='two-cols narrow-bordered-right'>
      <fieldset class='wide-bordered-bottom narrow-bordered-bottom'>
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

      <fieldset class='wide-bordered-bottom'>
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
    </div>

    <div class="two-cols">
      <Info />
    </div>
  {/if}
</aside>

<!--
{#if showLoadControls}
<h2>Saved canvases</h2>
<ul>
  {#each $savedCanvases as canvas }
    <li>{canvas}</li>
  {/each}
</ul>
<button on:click={ () => { localStorage.clear(); canvasState.resetState();} }>DELETE ALL</button>
{/if}
-->

<style>
  aside {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1em;
    padding: 1em;
    max-width: 1200px;
    font-size: 1.25em;
    border-top: 1px dashed var(--dark-blue);
  }
  :global(.large-button) {
    width: 100%;
    margin-bottom: 1em;
    padding: 0.75em 1em;
    color: white;
    background: var(--dark-blue);
    display: block;
    text-decoration: none;
    text-align: center;
    line-height: normal;
  }
  :global(.large-button:hover) {
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
  .narrow-bordered-right {
    border-right: 1px dashed var(--dark-blue);
    padding-right: 1em;
  }
  .narrow-bordered-bottom {
    border-bottom: 1px dashed var(--dark-blue);
    padding-bottom: 1em;
    margin-bottom: 1em;
  }
  @media (min-width: 1480px) {
    .narrow-bordered-right {
      border: none;
      padding-right: 0;
    }
    aside {
      display: initial;
      padding: 1em;
      width: 280px;
      border-top: none;
      border-left: 1px dashed var(--dark-blue);
      overflow-y: auto;
    }
    h2 {
      padding-top: 1em;
    }
    .wide-bordered-bottom {
      border-bottom: 1px dashed var(--dark-blue);
      padding-bottom: 1em;
    }
  }
</style>