<script lang='ts'>
import Question from './Question.svelte';

  export let question: string;
  export let content: string;
</script>

<form>
  <Question { question } />
  <textarea class='ninety-five' bind:value={ content } rows=10></textarea>
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
</style>