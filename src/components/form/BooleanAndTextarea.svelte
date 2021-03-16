<script lang='ts'>
  import { v4 as uuid } from 'uuid';

  import Question from './Question.svelte';
  import { getLocalization } from '../../i18n';
  import { Choice } from '../../types';
  import Choices from './Choices.svelte';

  export let question: string;
  export let content: { checked: Choice, text: string };

  const { t } = getLocalization();

  $: {
    if (!content) content  = { checked: Choice.UNSET, text: null };
  }
  const id = uuid();
</script>

<form>
  <div>
    <Question { question } />

    <Choices bind:value={ content.checked } options={
      [
        { value: Choice.YES, label: $t(Choice.YES) },
        { value: Choice.NO, label: $t(Choice.NO) },
        { value: Choice.UNSET, label: $t(Choice.UNSET) },
      ]
    } />
  </div>
  <textarea bind:value={ content.text } rows=10></textarea>
</form>

<style>
  form {
    padding-bottom: 1em;
  }
  div {
    display: flex;
    flex-wrap: nowrap;
  }
  textarea {
    width: 100%;
    font-size: 1em;
    box-sizing: border-box;
    border: none;
    resize: none;
  }
  /* form :global(fieldset) {
    flex-shrink: 0;
  }
  /* form :global(p) {
    max-width: 50%;
  } */
</style>