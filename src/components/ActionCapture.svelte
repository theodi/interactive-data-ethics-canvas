<script lang="ts">
  
  import { canvasState } from '../store';
  import { getLocalization } from '../i18n';
  import Choices from './form/Choices.svelte';
  import Question from './form/Question.svelte';
  import { Priority } from '../types';
  import type { Action, AreaIdentifier } from '../types';
  
  export let area: AreaIdentifier;

  let ref: number = $canvasState.blobs.findIndex((x) => x.id === 'actions');

  const { t } = getLocalization();

  if (!$canvasState.blobs[ref].content) $canvasState.blobs[ref].content = [];
  if (!Array.isArray($canvasState.blobs[ref].content[0])) {
    $canvasState.blobs[ref].content[0] = [];
  }

  const blankAction = (i: number): Action => ({
    title: $t('action:title.action') + ' ' + i,
    priority: Priority.MEDIUM,
    description: '',
    responsibility: '',
    type: 'action',
    area,
  });

  const blankDecision = (i: number): Action => ({
    title: $t('action:title.decision') + ' ' + i,
    description: '',
    responsibility: '',
    type: 'decision',
    area,
  });

  const appendItem = (generator) => {
    const len = $canvasState.blobs[ref].content[0].length;
    $canvasState.blobs[ref].content[0][len] = generator(len + 1);
  };

</script>

<header>
  <button on:click={() => appendItem(blankAction)}>Add action</button>
  <button on:click={() => appendItem(blankDecision)}>Add decision</button>
</header>
<ol>
  {#each $canvasState.blobs[ref].content[0] as action, i}
    {#if action.area === area }
    <li>
      <Question question={ $t(`action:title:${ action.type }`) } />
      <input id={'title-' + i} bind:value={action.title} />
      {#if action.type === 'action' }
      <Choices
        bind:value={ action.priority }
        label={ $t('action:priority') }
        options={[
          { value: Priority.LOW, label: $t('priority:LOW') },
          { value: Priority.MEDIUM, label: $t('priority:MEDIUM') },
          { value: Priority.HIGH, label: $t('priority:HIGH') },
        ]}
      />
      {/if}
      <Question question={ $t('action:description') } />
      <textarea id={'description-' + i} bind:value={action.description} />
      <Question question={ $t('action:responsible') } />
      <input bind:value={ action.responsibility } />
    </li>
    {/if}
  {/each}
</ol>

<style>
  header {
    position: fixed;
    display: block;
    padding: 1em;
    top: 3em;
    left: 0;
    right: 0;
    background: inherit;
    z-index: 50;
  }
  input,
  textarea {
    width: 100%;
    padding: 0.3em;
    margin-bottom: 0.4em;
  }
  ol {
    position: absolute;
    top: 4em;
    bottom: 1em;
    left: 1em;
    right: 1em;
    overflow-y: auto;
    font-size: 1.1em;
  }
  li {
    padding-bottom: 1em;
    padding-top: 1em;
    border-bottom: 1px dashed white;
  }
  li:first-child {
    padding-top: 0;
  }
  li:last-child {
    border-bottom: none;
  }
</style>
