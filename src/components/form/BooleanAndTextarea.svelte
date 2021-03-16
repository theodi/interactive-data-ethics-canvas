<script lang='ts'>
  import Question from './Question.svelte';
  import SelectBox from './SelectBox.svelte';
  import { getLocalization } from '../../i18n';
  import { Choice } from '../../types';

  export let question: string;
  export let content: { checked: Choice, text: string };

  const { t } = getLocalization();

  $: {
    if (!content) content  = { checked: Choice.UNSET, text: null };
  }
</script>

<form>
  <Question { question } />

  <SelectBox options={[
      { value: Choice.UNSET, label: $t(Choice.UNSET) },
      { value: Choice.YES, label: $t(Choice.YES) },
      { value: Choice.NO, label: $t(Choice.NO) },
    ]}
    bind:value={ content.checked }
  />

  <textarea bind:value={ content.text } rows=10></textarea>
</form>

<style>
  form {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 1em;
    align-items: baseline;
  }
  textarea {
    width: 100%;
    font-size: 1em;
    box-sizing: border-box;
    border: none;
    resize: none;
  }
</style>