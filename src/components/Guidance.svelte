<script lang='typescript'>
  import guidance from '../guidance';
  import { getLocalization } from '../i18n';
  
  export let id: string;

  const { t } = getLocalization();
  
  let slug: string;
  $: slug = id.replace(/-(.)/g, (s, x) => x.toUpperCase())
</script>

<section class="guidance">
  <h2>{ $t(`areas:${ id }.title`) }</h2>
  {#if guidance[slug] }
    <svelte:component this={ guidance[slug] } />
  {/if}
</section>

<style>
  section {
    height: 100%;
  }
  section :global(h2) {
    font-size: 1.5em;
    padding-bottom: 1em;
  }
  section :global(h3) {
    font-size: 1.3em;
    padding-top: 0;
    padding-bottom: 0.5em;
  }
  section :global(p) {
    padding-bottom: 1em;
  }
  section :global(ul) {
    padding-left: 1em;
    list-style: "\203A";
  }
  section :global(li) {
    padding-left: 1em;
  }
  section :global(.card-list) {
    padding: 0;
    list-style: none;
  }
  section :global(.card-list li) {
    display: block;
    border: 1px dashed;
    padding-top: 0.5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    margin-bottom: 1em;
  }
  section :global(.card-list p) {
    line-height: 1.1em;
  }
  section :global(.card-list a) {
    color: inherit;
  }
</style>