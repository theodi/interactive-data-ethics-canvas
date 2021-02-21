<script lang='ts'>
  export let content = null;
</script>

<form>
  <textarea bind:value={ content } rows=10></textarea>
</form>

<style>
  textarea {
    width: 100%;
    font-size: 1em;
    box-sizing: border-box;
    border: none;
  }
</style>