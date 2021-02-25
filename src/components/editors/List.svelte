<script lang="ts">
  import { canvasState } from '../../store';
  import { getLocalization } from '../../i18n';
  const { t } = getLocalization();
  
  export let ref: number;
  const id = canvasState.getBlobId(ref);

  if (!$canvasState.blobs[ref].content || !Array.isArray($canvasState.blobs[ref].content)) $canvasState.blobs[ref].content = ['']

  $: {
    const lastItem = $canvasState.blobs[ref].content.slice(-1)[0];
    if (lastItem) $canvasState.blobs[ref].content = [...$canvasState.blobs[ref].content, ''];
  }
</script>

<p>
  { $t('areas:' + id + '.questions', { joinArrays: ' ' }) }
</p>
<ul>
  {#each $canvasState.blobs[ref].content as value, i}
    <li><input id='item-{ i }' bind:value /></li>
  {/each}
</ul>

<style>
  p {
    margin-bottom: 1em;
  }
  input {
    display: block;
    width: 100%;
    margin-bottom: 1em;
    padding: 0.2em;
  }
</style>