<script lang="ts">
    import Choices from './Choices.svelte';
    import Question from './Question.svelte';
    import { Choice } from '../../types';
    import { getLocalization } from '../../i18n';
    
    const { t } = getLocalization();

    export let title: string;
    export let sourceIndex: number;

    export let content: { title: string, license_rights: string, sensitive: {checked: Choice, text: string }};

  $: {
    if (!content) content  = { title: title, license_rights: null, sensitive: {checked: Choice.UNSET, text: null }};
  }

  </script>

  <form>
    <h2>{ title }</h2>
    <Question question='License / Rights' />
    <input id='license-rights-{ sourceIndex }' bind:value={ content.license_rights} /> 
    <Question question='Sensitive?' />

    <Choices bind:value={ content.sensitive.checked }
      options={
        [
          { value: Choice.YES, label: $t(Choice.YES)},
          { value: Choice.NO, label: $t(Choice.NO)},
          { value: Choice.UNSET, label: $t(Choice.UNSET)},
        ]
      }
    />

    <textarea bind:value={ content.sensitive.text } rows=10></textarea>
  </form>
 
  <style>

    h2 {
      width: 100%;
      font-weight: bold;
      font-size: 1.4em;
      padding: 0.7rem;
      padding-left: 0;
    }
    input:not([type=radio] ) {
      display: inline-block;
      width: 100%;
      margin-bottom: 1em;
      padding: 0.3em;
      border: none;
      background: rgba(255,255,255);
    }
    form {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 1em;
      border-bottom: 1px dashed white;
    }
    textarea {
      width: 100%;
      font-size: 1em;
      box-sizing: border-box;
      border: none;
      resize: none;
    }
  </style>