<script lang="ts">
  import { canvasState } from '../store/canvas';
  import { lastUpdate } from '../store/last-updated';
  import { filtered } from '../store/filtered';
  import { serialisedCanvas } from '../store/serialised-canvas';
  import { Group, Status } from '../types';
  import { getLocalization } from '../i18n';
  import Info from './Info.svelte';
  import LoadControls from './LoadControls.svelte';
  import DownloadLink from './DownloadLink.svelte';

  const { t } = getLocalization();

  const groups = Object.keys(Group);
  const statuses = Object.keys(Status);

  let visibleGroups = groups;
  let visibleStatuses = statuses;
  let sidebarComponent = undefined;

  let infoPane = undefined;

  $: {
    for ( let i = 0; i < $canvasState.blobs.length; i++ ) {
      filtered.setState(
        $canvasState.blobs[i].id,
        !(
          visibleGroups.includes($canvasState.blobs[i].group) &&
          visibleStatuses.includes($canvasState.blobs[i].status || Status.IN_PROGRESS)
        )
      )
    }
  }
</script>

<aside class='container'>
  {#if sidebarComponent}
    <svelte:component
      this={ sidebarComponent }
      backAction={ () => sidebarComponent = undefined }
    />
  {:else}
    <div class='content-holder narrow-bordered-right wide-bordered-bottom'>
      <button class='large-button' on:click={ () => sidebarComponent = LoadControls }>{ $t('new_button') }</button>
      <DownloadLink classes='large-button' getter={ () => JSON.stringify($serialisedCanvas) } title={ $canvasState.title } lastUpdated={ $lastUpdate }>
        { $t('export_button') }
      </DownloadLink>

      <a
        class='large-button'
        href='report?uuid={ $canvasState.uuid }'
        target='_blank'>{ $t('print_button') }</a>  
    </div>

    <div class='two-cols narrow-bordered-right'>
      <fieldset class='content-holder wide-bordered-bottom  narrow-bordered-bottom'>
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

      <fieldset class='content-holder wide-bordered-bottom'>
        <legend><h2>{ $t('filter_by_group_title') }</h2></legend>

        <ul>
          {#each groups as group}
            <!-- <li on:mouseover={ () => infoPane = group } on:mouseout={ () => infoPane = undefined }> -->
            <li>
              <input id={group} type=checkbox bind:group={ visibleGroups } value="{ group }">
              <label for={group}>{ $t(`group:${group}`) }</label>  
            </li>
          {/each}
        </ul>
      </fieldset>
    </div>

    <div class="content-holder two-cols">
      <Info { infoPane }/>
    </div>
  {/if}
</aside>

<style>
  aside {
    display: grid;
    grid-template-columns: 245px 280px auto;
    padding: 0.5em;
    max-width: 1200px;
    font-size: 1.25em;
    border-top: 1px dashed var(--mid-grey);
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
  h2 {
    font-size: 1em;
    padding-top: 0.3em;
    padding-bottom: 0.3em;
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
    font-size: 0.8em;
  }
  fieldset {
    display: block;
    margin: 0.5em;
  }
  .container {
    position: relative;
  }
  aside :global(.content-holder) {
    padding: 0.5em;
    margin-bottom: 0.5em;
  }
  .narrow-bordered-right {
    border-right: 1px dashed var(--mid-grey);
  }
  .narrow-bordered-bottom {
    border-bottom: 1px dashed var(--mid-grey);
  }
  @media (min-width: 1480px) {
    .narrow-bordered-right {
      border-right: none;
    }
    aside {
      display: initial;
      padding: 0.5em;
      width: 280px;
      border-top: none;
      border-left: 1px dashed var(--mid-grey);
      overflow-y: auto;
      max-height: 800px;
    }
    fieldset {
      margin: 0em;
    }
    .wide-bordered-bottom {
      border-bottom: 1px dashed var(--mid-grey);
    }
  }
</style>