<script lang='ts'>
  import Question from './Question.svelte';
  export let question: string;
  export let questionIndex: number;
  export let content: { checked: Choice, text: string };

  enum Choice {
    UNSET = 'UNSET',
    YES = 'YES',
    NO = 'NO',
  }

  $: {
    if (!content) content  = { checked: Choice.UNSET, text: null };
  }
</script>

<form>
  <Question { question } />
  <fieldset class:highlight={ content.checked !== Choice.YES && content.checked !== Choice.NO }>
    <input id='opt-yes-{questionIndex}'  type='radio' bind:group={ content.checked } value={ Choice.YES } />
    <label for='opt-yes-{questionIndex}'>Yes</label>
    /
    <input id='opt-no-{questionIndex}' type='radio' bind:group={ content.checked } value={ Choice.NO } />
    <label for='opt-no-{questionIndex}'>No</label>
    <input id='opt-unset' type='radio' bind:group={ content.checked } value={ Choice.UNSET } />
  </fieldset>

  <textarea bind:value={ content.text } rows=10></textarea>
</form>

<style>
  form {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 1em;
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