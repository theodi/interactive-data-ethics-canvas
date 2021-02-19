<script lang='ts'>
  export let content = null;
</script>

<div>
  <textarea bind:value={ content } rows=20></textarea>
</div>

<style>
  textarea {
    width: 100%;
    font-size: 1em;
    box-sizing: border-box;
    border: none;
    rows: 20;
  }
</style>