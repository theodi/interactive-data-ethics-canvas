<script lang='typescript'>
  import { getOverallCanvasStatus } from '../utils/canvas-state';
  import type { BlobState } from '../types';
  import { getLocalization } from '../i18n';
  import Icon from 'svelte-awesome';
  import { print, trash, download } from 'svelte-awesome/icons';
  import DownloadLink from './DownloadLink.svelte';

  const { t } = getLocalization();

  export let title: string;
  export let uuid: string;
  export let lastUpdated: Date;
  export let blobs: BlobState[];

  export let loaded: boolean = false;
  export let renameAction: (name: string) => void;
  export let deleteAction: () => void;

  const scale = 1.3; 
  let action = undefined;
  let renaming = false;
  let newName: string;
  $: newName = title;
  $: state = getOverallCanvasStatus(blobs);
</script>

<section>
  <h2 class:action={ renameAction !== undefined } on:click|stopPropagation={ () => { if (renameAction !== undefined) renaming = true; } }>
    {#if renaming || title === '' }
      <input
        class:highlight={ title === '' }
        bind:value={ newName }
        on:keyup={ (e) => {
          renameAction(newName);
          if (e.key == 'Enter') renaming = false;
        } }
        on:focusout={ (e) => {
          renameAction(newName);
          renaming = false;
        }}
      >
    {:else}
      <input type='disabled' value={ title } />
    {/if}
  </h2>
  {#if action === undefined}
  <p class='small-font'>Status: { $t('status:' + state) }</p>
  <p class='small-font'>Last saved: { lastUpdated.toLocaleString() }</p>
  <footer>
    <ul>
      <li>
        { $t(loaded ? 'loaded' : 'load_action') }
      </li>
      <li>
        <DownloadLink getter={ () => localStorage.getItem(uuid) } { title } { lastUpdated }>
          <Icon data={ download } />
        </DownloadLink>
      </li>
      <li>
        <a href='./report?uuid={ uuid }' target='_blank' alt='Open a printable version of this canvas'><Icon data={ print } { scale } /></a>
      </li>
      {#if deleteAction }
        <li on:click|stopPropagation={ () => action = 'delete' }><Icon data={ trash }  { scale } /></li>
      {/if}
    </ul>
  </footer>
  {:else if action === 'delete'}
    <p>{ $t('confirm_delete') }</p>
    <footer class='actions'>
      <button on:click={ () => { deleteAction(); action = undefined; } }>{ $t('confirm_delete_yes') }</button>
      <button on:click={ () => { action = undefined; } }>{ $t('confirm_delete_no') }</button>
    </footer>
  {/if}
</section>

<style>
  .action {
    cursor: pointer;
  }
  section {
    position: relative;
    height: 100%;
  }
  .small-font {
    font-size: 0.7em;
  }
  h2 {
    display: block;
    height: 1.5em;
  }
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  footer ul {
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    align-items: center;
  }
  footer ul > li:first-child {
    flex-grow: 1;
  }
  footer :global(svg) {
    cursor: pointer;
    height: 1.2em;
    position: relative;
    padding-left: 0.2em;
  }
  input {
    font-size: inherit;
    padding: 0;
    background: none;
    color: inherit;
    width: 100%;
    border-bottom-width: 2px;
    border-bottom-style: unset;
    outline: none;
  }
  .highlight, input:focus, input:hover {
    border-bottom-width: 2px;
    border-bottom-style: dotted;
  }
  a {
    color: inherit;
  }
</style>