<script lang='typescript'>
  import { afterUpdate } from 'svelte'
  import Trash from './icons/noun_Trash_3775714.svelte';
  export let title: string;
  export let lastUpdated: Date;

  export let loaded: boolean = false;
  export let renameAction: (name: string) => void;
  export let deleteAction: () => void;

  let renaming = false;
  let newName: string;
  // $: if (newName !== title) renameAction(newName)
  $: newName = title;
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
  <p class='small-font'>Status: { 'TKTKTK' }</p>
  <p class='small-font'>Last saved: { lastUpdated.toLocaleString() }</p>
  <footer>
    <p>{ loaded ? 'Loaded' : 'Load' }</p>
    <ul>
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
  }
  footer {
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    align-items: flex-end;
  }
  footer > p {
    flex-grow: 1;
  }
  footer :global(svg) {
    height: 1.5em;
    position: relative;
    bottom: -0.4em;
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