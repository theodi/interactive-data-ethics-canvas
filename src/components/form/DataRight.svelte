<script lang="ts">
  import { lastUpdate } from '../../store/last-updated';
  import { Choice } from '../../types';
  import BooleanAndTextarea from './BooleanAndTextarea.svelte';
  import Question from './Question.svelte';
  import Textarea from './Textarea.svelte';
  
  export let title: string;
  export let sourceIndex: number;
  export let content: {title: string, license: string, data_collection: {checked: Choice, text: string },personal_information: {checked: Choice, text: string }, commercial_data: {checked: Choice, text: string }, notes: string};

  $: {
    lastUpdate.lock();
    if (!content) content  = {title: title, license: null, data_collection: {checked: Choice.UNSET, text: null }, personal_information: {checked: Choice.UNSET, text: null}, commercial_data: {checked: Choice.UNSET, text: null }, notes: null};
    lastUpdate.unlock();
  }
</script>

  <form class="dataRight">
    <h3>{ title }</h3>
    <Question question='What basis or licence do you have for using this data?' />
    <input class='ninety-five' id='license-rights-{ sourceIndex }' bind:value={ content.license } /> 
    <BooleanAndTextarea question='Was the data collected for this project or another purpose?' questionIndex={ sourceIndex + 'data_collection' } bind:content={ content.data_collection } />
    <BooleanAndTextarea question='Does the data contain any personal information?' questionIndex={ sourceIndex + 'personal_information' } bind:content={ content.personal_information } />
    <BooleanAndTextarea question='Does the data contain any commercially or otherwise sensitive information? ' questionIndex={ sourceIndex + 'commercial_data' } bind:content={ content.commercial_data } />
    <Textarea question='Additional notes related to this data source.' bind:content={ content.notes } />
  </form>
 
  <style>
    h3 {
      width: 100%;
      font-weight: bold;
      font-size: 1.3em;
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
  </style>