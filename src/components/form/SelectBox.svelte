<script lang="typescript">
  export let label: string;
  export let options: { value:string, label: string }[]
  export let value: any;
</script>

<label for='status'>{ label }</label>
<select id='status' bind:value>
  {#each options as { value: v, label: l }}
    <option value={ v }>{ l }</option>
  {/each}
</select>

<style>
  select {
    padding: 0.25em 0.5em;
    cursor: pointer;
    line-height: 1.1;
    background-color: white;
  }
</style>
