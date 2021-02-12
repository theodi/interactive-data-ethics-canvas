<script lang='ts'>
  export let content;
</script>

<div>
  <textarea bind:value={ content }></textarea>
</div>

<style>
  textarea {
    width: 100%;
    font-size: 1em;
    box-sizing: border-box;
    border: none;
  }
</style>