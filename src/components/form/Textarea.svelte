<script lang='ts'>
import Question from './Question.svelte';

  export let question: string;
  export let content: string;
</script>

<form>
  <Question { question } />
  <textarea bind:value={ content } rows=10></textarea>
</form>

<style>
  form {
    padding-bottom: 1em;
  }
  textarea {
    width: 100%;
    font-size: 1em;
    box-sizing: border-box;
    border: none;
    resize: none;
  }
</style>