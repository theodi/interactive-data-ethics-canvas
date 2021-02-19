<script lang='ts'>
  import Basic from './editors/Basic.svelte';
  const editors = {
    Basic
  }
  export let content = null;
</script>

<div>
  <svelte:component this={ editors['Basic'] } bind:content />
  <!-- <textarea bind:value={ content }></textarea> -->
</div>

<style>
  textarea {
    width: 100%;
    font-size: 1em;
    box-sizing: border-box;
    border: none;
  }
</style>