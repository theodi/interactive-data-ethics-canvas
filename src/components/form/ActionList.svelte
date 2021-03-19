<script lang="ts">
    import Question from './Question.svelte';
    import Textarea from './Textarea.svelte';
    import Choices from './Choices.svelte';

    import { getLocalization } from '../../i18n';
    const { t } = getLocalization();

    import { Priority } from '../../types';
    import type { Action } from '../../types';

    import type { UserContent } from '../../types';

    export let questions: any;
    export let content: Action[];

    const contentTest = (c: UserContent): boolean => c && Array.isArray(c) && c.length > 0;
    const initialValue = [{ title: null, priority: Priority.MEDIUM, responsibility: null}]

    $: {
        if (!contentTest(content)) content = initialValue;
          const lastItem = content.slice(-1)[0];
        if (lastItem && lastItem.title) content = [...content,{ title: null, priority: Priority.MEDIUM, responsibility: null}];
    }
    
</script>
    <form>
      <Question question={questions[0]} />
        <ol>
          {#each content as l, i}
            <li>
              <h2>Action { i + 1 }</h2>
              <input class='ninety-five' id='title-{ i }' bind:value={ l.title} />
              <Choices bind:value={ l.priority }
                label={ 'Priority:' }
                options={[
                    { value: Priority.LOW, label: $t('priority:LOW') },
                    { value: Priority.MEDIUM, label: $t('priority:MEDIUM') },
                    { value: Priority.HIGH, label: $t('priority:HIGH') },
                ]}
              />
              <br>
              <Textarea question={ questions[1] } bind:content={ l.responsibility } />
            </li>
          {/each}
        </ol>  
    </form>
  <style>
    h2 {
      font-weight: bold;
      font-size: 1.4em;
      padding: 0.7rem;
      padding-left: 0;
    }  
    form {
        border-bottom: 1px dashed white;
        margin-bottom: 1em;
    }
    input {
      display: inline-block;
      width: 100%;
      margin-bottom: 1em;
      padding: 0.3em;
      border: none;
      background: rgba(255,255,255);
    }
    form {
      padding-bottom: 1em;
    }
    li {
      border-top: 1px dashed white;
      padding-top: 1em;
      margin-bottom: 1em;
    }
  </style>