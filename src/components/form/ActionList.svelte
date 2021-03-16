<script lang="ts">
    import Question from './Question.svelte';
    import Textarea from './Textarea.svelte';
    import BooleanAndTextarea from './BooleanAndTextarea.svelte';

    import { Priority } from '../../types';
    import { Choice } from '../../types';
    import type { Action } from '../../types';
    import SelectBox from './SelectBox.svelte';

    import type { UserContent } from '../../types';

    export let questions: any;
    export let content: Action[];

    const contentTest = (c: UserContent): boolean => c && Array.isArray(c) && c.length > 0;
    const initialValue = [{ title: null, priority: Priority.MEDIUM}]

    $: {
        if (!contentTest(content)) content = initialValue;
          const lastItem = content.slice(-1)[0];
        if (lastItem && lastItem.title) content = [...content,{ title: null, priority: Priority.MEDIUM}];
    }
    
</script>
    <form>
        <ol>
            {#each content as l, i}
                <h2>Action { i + 1 }</h2>
                <li>
                    <Question question={questions[0]} />
                    <input id='title-{ i }' bind:value={ l.title} />
                    <SelectBox bind:value={ l.priority }
                        label={ 'Priority:' }
                        options={[
                            { value: Priority.LOW, label: 'Low' },
                            { value: Priority.MEDIUM, label: 'Medium' },
                            { value: Priority.HIGH, label: 'High' },
                        ]}
                    />
                    <br><br>
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
    span {
      width: 5%;
      display: inline-block;
      text-align: right;
      padding-right: 1em;
    }
    form {
      padding-bottom: 1em;
    }

    textarea {
        width: 100%;
        font-size: 1em;
        box-sizing: border-box;
        border: none;
        resize: none;
        margin-bottom: 1em;
    }
  </style>