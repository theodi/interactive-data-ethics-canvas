<script lang='typescript'>
  function handleClose(event: BeforeUnloadEvent) {
    event.returnValue = '';
  }
</script>

<svelte:window on:beforeunload|preventDefault={ handleClose } />
