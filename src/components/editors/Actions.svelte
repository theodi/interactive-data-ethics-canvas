<script lang="ts">
  import { canvasState } from '../../store';
  import { getLocalization } from '../../i18n';

  import Question from '../form/Question.svelte';
  import ActionList from '../form/ActionList.svelte';
  import BooleanAndTextarea from '../form/BooleanAndTextarea.svelte';
  import { Priority } from '../../types';

  export let ref: number;

  const { t } = getLocalization();
  const id = canvasState.getBlobId(ref);
  $: actionCount = $canvasState.blobs[ref].content[0].length;
</script>

<section>
  <Question question={$t('areas:' + id + '.questions.0')} />

  {#if actionCount === 0}
    <p class="ninety-five">{$t('action:no_actions')}</p>
  {:else}
    <!-- <h3>{ $t('action:priority_title.high') }</h2> -->
    <ActionList
      bind:content={$canvasState.blobs[ref].content[0]}
      selector={(x) => x.type === 'action' && x.priority === Priority.HIGH}
    />

    <!-- <h3>{ $t('action:priority_title.decisions') }</h2> -->
    <ActionList
      bind:content={$canvasState.blobs[ref].content[0]}
      selector={(x) => x.type === 'decision'}
    />

    <!-- <h3>{ $t('action:priority_title.medium') }</h2> -->
    <ActionList
      bind:content={$canvasState.blobs[ref].content[0]}
      selector={(x) => x.type === 'action' && x.priority === Priority.MEDIUM}
    />

    <!-- <h3>{ $t('action:priority_title.low') }</h2> -->
    <ActionList
      bind:content={$canvasState.blobs[ref].content[0]}
      selector={(x) => x.type === 'action' && x.priority === Priority.LOW}
    />
  {/if}
</section>

<BooleanAndTextarea
  question={$t('areas:' + id + '.questions.1')}
  questionIndex={1}
  bind:content={$canvasState.blobs[ref].content[2]}
/>

<style>
  section {
    border-bottom: 1px white dashed;
    padding-bottom: 1em;
    margin-bottom: 1em;
  }
  h3 {
    font-size: 1.1em;
  }
</style>
