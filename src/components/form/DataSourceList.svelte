<script lang="ts">
  import { getLocalization } from '../../i18n';
  import { lastUpdate } from '../../store/last-updated';
  import type { DataSource,UserContent } from '../../types';
  import Question from './Question.svelte';

  export let question: string;
  export let content: DataSource[];
  
  const { t } = getLocalization();

  const contentTest = (c: UserContent): boolean =>
    c && Array.isArray(c) && c.length > 0;
  const initialValue = [
    { title: '', description: '', url: '', owner: '' },
  ].filter(x => x);

  $: {
    lastUpdate.lock();
    if (!contentTest(content)) content = initialValue;
    lastUpdate.unlock();
  }
  $: {
    const lastItem = content.slice(-1)[0];
    if (lastItem && lastItem.title){
      lastUpdate.lock();
      content = [
        ...content,
        { title: '', description: '', url: '', owner: '' },
      ].filter(x => x);
      lastUpdate.unlock();
    }
  }
</script>

<form class="dataSourceList">
  <Question {question} />
  <ol>
    {#each content as l, i}
      <li>
        <Question class="subQuestion" question={ $t('areas:sources.labels.title') } /><input
          class="ninety-five"
          id="title-{i}"
          bind:value={l.title}
        /><Question class="subQuestion" question={ $t('areas:sources.labels.description') } /><textarea
          class="ninety-five"
          id="description-{i}"
          bind:value={l.description}
          rows="10"
        /><Question class="subQuestion" question={ $t('areas:sources.labels.url') } /><input
          class="ninety-five"
          id="url-{i}"
          bind:value={l.url}
        /><Question class="subQuestion" question={ $t('areas:sources.labels.owner') } /><input
          class="ninety-five"
          id="owner-{i}"
          bind:value={l.owner}
        />
      </li>
    {/each}
  </ol>
</form>

<style>
  li {
    border-bottom: 1px dashed white;
    margin-bottom: 1em;
  }
  input {
    display: inline-block;
    width: 100%;
    margin-bottom: 1em;
    padding: 0.3em;
    border: none;
    background: rgba(255, 255, 255);
  }
  form {
    padding-bottom: 1em;
  }

  textarea {
    width: 100%;
    box-sizing: border-box;
    border: none;
    margin-bottom: 1em;
  }

  .dataSourceList :global(.subQuestion) {
    font-size: 1em;
    margin-left: 1.25%;
  }
</style>
