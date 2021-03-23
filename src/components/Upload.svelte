<script>
  let fileJSON, fileinput;
  import { canvasState } from '../store';
  import { canvasReviver } from '../utils/canvas-reviver';

	const onFileSelected =(e)=>{
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = e => {
      fileJSON = JSON.parse(e.target.result, canvasReviver);
      canvasState.loadCanvas(fileJSON);
    };
  }
</script>

<div>
  <h2>Upload canvas</h2>
  <input type="file" accept=".json" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
</div>

<style>
  h2 {
    font-weight: bold;
    margin: 1em 0.3em 0.5em 0.3em;
  }

  input {
    margin: 0 0.3em 2em 0.3em;
  }

</style>