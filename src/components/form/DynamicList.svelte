<script lang="ts">
  import Question from './Question.svelte';
  import type { UserContent } from '../../types';
import { lastUpdate } from '../../store/last-updated';

  export let question: string;
  export let content: string[];

  const contentTest = (c: UserContent): boolean => c && Array.isArray(c) && c.length > 0;
  const initialValue = [''];

  $: {
    lastUpdate.lock();
    if (!contentTest(content)) content = initialValue;
    const lastItem = content.slice(-1)[0];
    if (lastItem !== '') content = [...content, ''];
    lastUpdate.lock();
  }
</script>

<form>
  <Question { question } />
  <ol>
    {#each content as value, i}
      <li class='ninety-five'><span>{ i + 1 }</span><input id='item-{ i }' bind:value /></li>
    {/each}
  </ol>  
</form>

<style>
  input {
    display: inline-block;
    width: 95%;
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
    padding-bottom: 1em;
  }
</style>