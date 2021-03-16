<script lang="typescript">
  import { v4 as uuid } from 'uuid';
  export let label: string;
  export let options: { value:string, label: string }[]
  export let value: any;
  const id = uuid();
</script>

<fieldset>
{#if label}<p>{ label }</p>{/if}
  {#each options as { value: v, label: l }, idx}
    <span>
      <input id={ `${id}-${idx}` } type='radio' bind:group={ value } value={ v }/>
      <label for={ `${id}-${idx}` }>{ l }</label>  
    </span>
  {/each}
</fieldset>

<style>
  fieldset {
    font-size: 1.2em;
    flex-shrink: 0;
    display: flex;
  }
  span {
    padding-left: 0.5em;
  }
  p {
    max-width: 50%;
  }
</style>