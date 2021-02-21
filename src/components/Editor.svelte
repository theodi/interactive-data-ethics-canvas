<script lang='ts'>
  import Basic from './editors/Basic.svelte';
  const editors = {
    Basic
  }
  export let content = null;
</script>

<div>
  <svelte:component this={ editors['Basic'] } bind:content />
</div>
