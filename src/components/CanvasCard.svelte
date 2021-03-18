<script lang='typescript'>
  import Trash from './icons/noun_Trash_3775714.svelte';
  export let canvas: { uuid: string, title: string, lastUpdated: Date };
  export let loaded: boolean = false;
  export let renameAction: (name: string) => void;
  export let deleteAction: () => void;

  let renaming = false;
  let newName = canvas.title;
</script>

<section>
  <h2 class:action={ renameAction !== undefined } on:click|stopPropagation={ () => { if (renameAction !== undefined) renaming = true; } }>
    {#if renaming}
      <form class='name-edit'>
        <input
          bind:value={ newName }
          on:keyup|preventDefault|stopPropagation={ (e) => {
            if (!e) return;
            if(e.key == 'Enter') {
              renameAction(newName);
              renaming = false;
            }
            if (e.key == 'Escape') {
              newName = canvas.title;
              renaming = false;
            }
          } }>
      </form>
    {:else}
      { canvas.title || 'Untitled' }
    {/if}
  </h2>
  <p class='small-font'>Status: { 'TKTKTK' }</p>
  <p class='small-font'>Last saved: { canvas.lastUpdated.toLocaleString() }</p>
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
  button {
    background: none;
  }
  .name-edit :global(svg) {
    height: 1em;
  }
</style>