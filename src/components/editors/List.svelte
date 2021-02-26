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
<ol>
  {#each $canvasState.blobs[ref].content as value, i}
    <li><span>{ i + 1 }</span><input id='item-{ i }' bind:value /></li>
  {/each}
</ol>

<style>
  p {
    margin-bottom: 1em;
  }
  input {
    display: inline-block;
    width: 95%;
    margin-bottom: 1em;
    padding: 0.3em;
    border: none;
    background: rgba(255,255,255);
  }
  span {
    width: 5%;
    display: inline-block;
    text-align: right;
    padding-right: 1em;
  }
</style>