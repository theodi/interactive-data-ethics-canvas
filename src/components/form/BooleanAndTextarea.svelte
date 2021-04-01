<script lang='ts'>
  import { v4 as uuid } from 'uuid';
  import { getLocalization } from '../../i18n';
  import { lastUpdate } from '../../store/last-updated';
  import { Choice } from '../../types';
  import Choices from './Choices.svelte';

  export let question: string;
  export let content: { checked: Choice, text: string };

  const { t } = getLocalization();

  $: {
    if (!content) {
      lastUpdate.lock();
      content  = { checked: Choice.UNSET, text: '' };
      lastUpdate.unlock();
    }
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
  }
</style>