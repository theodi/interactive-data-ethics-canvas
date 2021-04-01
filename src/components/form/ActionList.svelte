<script lang="ts">
  import { getLocalization } from '../../i18n';
  import { lastUpdate } from '../../store/last-updated';
  import type { Action,UserContent } from '../../types';
  import { Priority } from '../../types';
  import Choices from './Choices.svelte';
  import Question from './Question.svelte';
  import Textarea from './Textarea.svelte';
  
  export let content: Action[];
  export let selector: (value: any) => boolean = () => true;
  
  const { t } = getLocalization();

  const contentTest = (c: UserContent): boolean =>
    c && Array.isArray(c) && c.length > 0;
  const initialValue = [];

  lastUpdate.lock();
  if (!contentTest(content)) content = initialValue;
  lastUpdate.unlock();
</script>

<ol>
  {#each content as l, i}
  {#if selector(l)}
    <li>
      <Question question={ $t('action:title_with_link', { type: l.type, area: l.area }) } />
      <input class="ninety-five" id="title-{i}" bind:value={l.title} />
      {#if l.type === 'action' }
      <Choices
        bind:value={ l.priority }
        label={ $t('action:priority') }
        options={[
          { value: Priority.LOW, label: $t('priority:LOW') },
          { value: Priority.MEDIUM, label: $t('priority:MEDIUM') },
          { value: Priority.HIGH, label: $t('priority:HIGH') },
        ]}
      />
      {/if}
      <Textarea question={ $t('action:description') } bind:content={ l.description } />
      <Question question={ $t('action:responsible') } />
      <input class='ninety-five' bind:value={ l.responsibility } />
    </li>
  {/if}
  {/each}
</ol>

<style>
  li {
    padding-top: 1em;
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
</style>
