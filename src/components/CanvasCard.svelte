<script lang='typescript'>
  import Trash from './icons/noun_Trash_3775714.svelte';
  export let canvas: { uuid: string, title: string, lastUpdated: Date };
  export let loaded: boolean = false;
  export let deleteAction: () => {};
</script>

<section>
  <h2>{ canvas.title || 'Untitled' }</h2>
  <p class='small-font'>Status: { 'TKTKTK' }</p>
  <p class='small-font'>Last saved: { canvas.lastUpdated.toLocaleString() }</p>
  <footer>
    <p>{ loaded ? 'Loaded' : 'Load' }</p>
    <ul>
      {#if deleteAction }
      <li on:click={ deleteAction }><Trash /></li>
      {/if}
    </ul>
  </footer>
</section>

<style>
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
</style>