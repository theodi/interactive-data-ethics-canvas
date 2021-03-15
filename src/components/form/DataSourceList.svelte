<script lang="ts">
    import Question from './Question.svelte';
    import type { UserContent } from '../../types';
    import type { DataSource } from '../../types';
  
  
    export let question: string;
    export let content: DataSource[];

    const contentTest = (c: UserContent): boolean => c && Array.isArray(c) && c.length > 0;
    const initialValue = [{ title: null, description : null, url: null, owner: null}]

    $: {
        if (!contentTest(content)) content = initialValue;
          const lastItem = content.slice(-1)[0];
        if (lastItem && lastItem.title && lastItem.description && lastItem.url && lastItem.owner) content = [...content, { title: null, description : null, url: null, owner: null}];
    }
    
  </script>
  
  <form>
    <Question { question } />
    <ol>
        {#each content as l, i}
            <li><Question question={'Title'} /><input id='title-{ i }' bind:value={ l.title} /><Question question={'Description'}/><textarea id='description-{ i}' bind:value={ l.description } rows=10></textarea><Question question={'URL'}/><input id='url-{ i }' bind:value={ l.url} /><Question question={'Owner'}/><input id='owner-{ i }' bind:value={ l.owner} /></li>
        {/each}
    </ol>  
  </form>
  
  <style>
    li {
        border-bottom: 1px dashed white;
        margin-bottom: 1em;
    }
    input {
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
      padding-bottom: 1em;
    }

    textarea {
        width: 100%;
        font-size: 1em;
        box-sizing: border-box;
        border: none;
        resize: none;
        margin-bottom: 1em;
    }
  </style>