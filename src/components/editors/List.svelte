<script lang="ts">
  import { canvasState } from '../../store';
  import { getLocalization } from '../../i18n';
  import type { UserContent } from '../../types';
  const { t } = getLocalization();
  
  export let ref: number;
  const id = canvasState.getBlobId(ref);

  const contentTest = (c: UserContent): boolean => Array.isArray(c);
  const initialValue = [null]

  if (!$canvasState.blobs[ref].content || !contentTest($canvasState.blobs[ref].content)) $canvasState.blobs[ref].content = initialValue;

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
    padding: 0.3em;
    border: none;
    background: rgba(255,255,255,0.6);
  }
</style>