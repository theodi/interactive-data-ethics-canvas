<script lang="ts">
  import { getContext } from 'svelte';
  import { getLocalization } from '../i18n';
  import { canvasState } from '../store';
  import marked from 'marked';

  export let blobIndex: number;

  const id = canvasState.getBlobId(blobIndex);

  const { width, margin, height } = getContext('canvasConfig');
  const { t } = getLocalization();
</script>

<foreignObject x={width + 2 * margin - 450} y=0 width=450 {height}>
  <aside class="guidance">
    <h2>{ $t('guidance_title') }</h2>
    {@html marked($t(`areas:${ id }.guidance`)) } 
  </aside>
</foreignObject>

<style>
  aside {
    background: white;
    box-sizing: border-box;
    width: 100%;
    margin: 1em;
    padding: 1em;
    padding-right: 4em;
    border: solid 1px hsl(0, 0%, 90%);
    box-shadow: 0 0 10px hsla(0, 0%, 0%, 10%);
  }
  h2 {
    font-weight: bold;
    font-size: 1.1em;
    padding-bottom: 1em;
  }
  :global(.guidance p) {
    padding-bottom: 1em;
  }
  :global(.guidance ul) {
    padding-left: 1em;
    list-style: "\203A";
  }
  :global(.guidance li) {
    padding-left: 1em;
  }
</style>