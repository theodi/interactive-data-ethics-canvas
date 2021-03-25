<script>
  let fileJSON, fileinput;
  import { canvasState } from '../store';
  import { canvasReviver } from '../utils/canvas-reviver';
  import { savedCanvases } from '../store';

  let uuidClash = false;

  function cancelUpload() {
    uuidClash = false;
  }

  function proceedUpload() {
    if (fileJSON) {
      canvasState.loadCanvas(fileJSON);
      uuidClash = false;
    }
  }

  const onFileSelected =(e)=>{
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = e => {
      fileJSON = JSON.parse(e.target.result, canvasReviver);
      uuidClash = ((fileJSON && $savedCanvases.map(canvas => canvas.uuid).indexOf(fileJSON.uuid) > -1) ? true : false);
      if (uuidClash == false) {
        canvasState.loadCanvas(fileJSON);
      }
    };
  }

</script>

<div>
  <h2>Upload canvas</h2>
  
</div>
{#if uuidClash == false}
  <input type="file" accept=".json" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
{:else}
  <p>You already have a version of this canvas saved. Loading from file will overwrite your existing version.</p>
  <button class="large-button" on:click={proceedUpload}>Proceed</button>
  <button class="large-button" on:click={cancelUpload}>Cancel</button> 
{/if}


<style>
  h2 {
    font-weight: bold;
    margin: 1em 0.3em 0.5em 0.3em;
  }

  input {
    margin: 0 0.3em 2em 0.3em;
  }

</style>