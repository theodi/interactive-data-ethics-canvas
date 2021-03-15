<script lang="ts">
    import Question from './Question.svelte';
    export let title: string;
    export let sourceIndex: number;

    export let content: { title: string, license_rights: string, sensitive: {checked: Choice, text: string }};

  enum Choice {
    UNSET = 'UNSET',
    YES = 'YES',
    NO = 'NO',
  }

  $: {
    if (!content) content  = { title: title, license_rights: null, sensitive: {checked: Choice.UNSET, text: null }};
  }

  </script>

  <form>
    <h2>{ title }</h2>
    <Question question='License / Rights' />
    <input id='license-rights-{ sourceIndex }' bind:value={ content.license_rights} /> 
    <Question question='Sensitive?' />
    <fieldset class:highlight={ content.sensitive.checked !== Choice.YES && content.sensitive.checked !== Choice.NO }>
      <input id='opt-yes-{sourceIndex}'  type='radio' bind:group={ content.sensitive.checked } value={ Choice.YES } />
      <label for='opt-yes-{sourceIndex}'>Yes</label>
        /
      <input id='opt-no-{sourceIndex}' type='radio' bind:group={ content.sensitive.checked } value={ Choice.NO } />
      <label for='opt-no-{sourceIndex}'>No</label>
      <input id='opt-unset' type='radio' bind:group={ content.sensitive.checked } value={ Choice.UNSET } />
    </fieldset>
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
    li {
        border-bottom: 1px dashed white;
        margin-bottom: 1em;
    }
    input:not([type=radio] ) {
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
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 1em;
      border-bottom: 1px dashed white;
    }
    [type=radio] {
      appearance: none;
      position: fixed;
    }
    :checked + label {
      text-decoration: underline;
      font-weight: bold;
    }

    fieldset {
      margin-bottom: 0.5em;
    }

    textarea {
      width: 100%;
      font-size: 1em;
      box-sizing: border-box;
      border: none;
      resize: none;
    }
  </style>