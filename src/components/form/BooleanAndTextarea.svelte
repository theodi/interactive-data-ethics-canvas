<script lang='ts'>
  import { v4 as uuid } from 'uuid';

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
  <Choices bind:value={ content.checked } 
    label={ question }
    options={
      [
        { value: Choice.YES, label: $t(Choice.YES) },
        { value: Choice.NO, label: $t(Choice.NO) },
        { value: Choice.UNSET, label: $t(Choice.UNSET) },
      ]
    }
  />
  <textarea class='ninety-five' bind:value={ content.text } rows=3></textarea>
</form>

<style>
  form {
    padding-bottom: 1em;
  }
  textarea {
    width: 100%;
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