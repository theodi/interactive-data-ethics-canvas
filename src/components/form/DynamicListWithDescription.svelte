<script lang="ts">
    import Question from './Question.svelte';
    import Textarea from './Textarea.svelte';
    import type { ListWithDescription } from '../../types';
    import type { UserContent } from '../../types';
    import { bind } from 'svelte/internal';
  
    export let question: string;
    export let content: ListWithDescription[];
    
    export let descriptionlabel: string;
    const contentTest = (c: UserContent): boolean => c && Array.isArray(c) && c.length > 0;
    const initialValue = [{title: null, description : null}]


    $: {
        if (!contentTest(content)) content = initialValue;
          const lastItem = content.slice(-1)[0];
        if (lastItem && lastItem.title) content = [...content, { title: null, description : null}];
    }
  </script>
  
  <form>
    <Question { question } />
    <ol>
      {#each content as l, i}
        <li class='ninety-five'><span>{ i + 1 }</span><input id='item-{ i }' bind:value={ l.title } /><p>{descriptionlabel }</p><textarea rows="5" bind:value={ l.description } /></li>
      {/each}
    </ol>  
  </form>
  
  <style>

    li {
        border-bottom: 1px dashed white;
        margin: 1em 0;
    }

    li:first-child {
        margin-top: 2em;
    }

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

    textarea {
        width: 95%;
        margin-bottom: 1em;
        margin-left: 5%;
    }

    li p {
      margin-bottom: 0.5em;
      flex-grow: 1;
      font-size: 1em;
      margin-left: 2.5%;
    }
  </style>