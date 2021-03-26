<script lang="ts">
  import Question from './Question.svelte';
  import BooleanAndTextarea from './BooleanAndTextarea.svelte';
  import Textarea from './Textarea.svelte';
  import { Choice } from '../../types';
  import { getLocalization } from '../../i18n';
  
  export let title: string;
  export let sourceIndex: number;
  export let content: {title: string, license: string, data_collection: {checked: Choice, text: string },personal_information: {checked: Choice, text: string }, commercial_data: {checked: Choice, text: string }, notes: string};

  $: {
    if (!content) content  = {title: title, license: null, data_collection: {checked: Choice.UNSET, text: null }, personal_information: {checked: Choice.UNSET, text: null}, commercial_data: {checked: Choice.UNSET, text: null }, notes: null};
  }
</script>

  <form>
    <h2>{ title }</h2>
    <Question question='What basis or licence do you have for using this data?' />
    <input class='ninety-five' id='license-rights-{ sourceIndex }' bind:value={ content.license } /> 
    <BooleanAndTextarea question='Was the data collected for this project or another purpose?' questionIndex={ sourceIndex + 'data_collection' } bind:content={ content.data_collection } />
    <BooleanAndTextarea question='Does the data contain any personal information?' questionIndex={ sourceIndex + 'personal_information' } bind:content={ content.personal_information } />
    <BooleanAndTextarea question='Does the data contain any commercially or otherwise sensitive information? ' questionIndex={ sourceIndex + 'commercial_data' } bind:content={ content.commercial_data } />
    <Textarea question='Additional notes related to this data source.' bind:content={ content.notes } />
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
      padding-bottom: 1em;
      border-bottom: 1px dashed white;
      width: 100%;
    }
    textarea {
      width: 100%;
      font-size: 1em;
      box-sizing: border-box;
      border: none;
      resize: none;
    }
  </style>