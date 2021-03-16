<script lang="typescript">
  import { v4 as uuid } from 'uuid';
  export let label: string;
  export let options: { value:string, label: string }[]
  export let value: any;
  const id = uuid();
</script>

{#if label}<label for={ id }>{ label }</label>{/if}
<select { id } bind:value>
  {#each options as { value: v, label: l }}
    <option value={ v }>{ l }</option>
  {/each}
</select>

<style>
  select {
    padding: 0.25em 0.5em;
    line-height: 1.1;
    background-color: white;
    display: inline-block;
  }
</style>
