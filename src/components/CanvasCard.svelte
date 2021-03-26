<script lang='typescript'>
  import Trash from './icons/noun_Trash_3775714.svelte';
  import Print from './icons/noun_print_89538.svelte';
  import { getOverallCanvasStatus } from '../utils/canvas-state';
  import type { BlobState } from '../types';
  import { getLocalization } from '../i18n';

  const { t } = getLocalization();

  export let title: string;
  export let uuid: string;
  export let lastUpdated: Date;
  export let blobs: BlobState[];

  export let loaded: boolean = false;
  export let renameAction: (name: string) => void;
  export let deleteAction: () => void;

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
  <p class='small-font'>Status: { $t('status:' + state) }</p>
  <p class='small-font'>Last saved: { lastUpdated.toLocaleString() }</p>
  <footer>
    <ul>
      <li>
        { $t(loaded ? 'loaded' : 'load_action') }
      </li>
      <li>
        <a href='./report?uuid={ uuid }' target='_blank' alt='Open a printable version of this canvas'><Print /></a>
      </li>
      {#if deleteAction }
        <li on:click|stopPropagation={ deleteAction }><Trash /></li>
      {/if}
    </ul>
  </footer>
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
</style>