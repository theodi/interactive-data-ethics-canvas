<script lang="typescript">
  import { v4 as uuid } from 'uuid';
  import Question from './Question.svelte';

  export let label: string;
  export let options: { value:string, label: string }[]
  export let value: any;
  const id = uuid();
</script>

<div>
  {#if label}
    <Question question={ label } />
  {/if}
  {#each options as { value: v, label: l }, idx}
    <span>
      <input id={ `${id}-${idx}` } type='radio' bind:group={ value } value={ v }/>
      <label for={ `${id}-${idx}` }>{ l }</label>  
    </span>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin-bottom: 0.5em;
  }
  div :global(p) {
    margin-bottom: 0;
    flex-grow: 1;
  }
  span {
    padding-left: 0.5em;
    flex-shrink: 0;
  }
</style>