<script lang='ts'>
  import Question from './Question.svelte';
  export let question: string;
  export let content;
  $: {
    if (!content) content = { checked: false, text: null };
  }
</script>

<form>
  <Question { question } />
  <input type='checkbox' bind:checked={ content.checked } />
  <textarea bind:value={ content.text } rows=10></textarea>
</form>

<style>
  [type=checkbox] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: solid 2px white;
    margin-right: 8px;
    position: relative;
  }
  [type=checkbox]:checked::before {
    /* content: "\2713"; */
    content: '';
    width: 10px;
    height: 10px;
    background-color: white;
    position: absolute;
    top: 3px;
    left: 3px;
  }
  textarea {
    width: 100%;
    font-size: 1em;
    box-sizing: border-box;
    border: none;
    resize: none;
  }
</style>