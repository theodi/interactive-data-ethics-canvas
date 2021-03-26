<script lang='typescript'>
  import { canvasState } from '../store';
  import Upload from './Upload.svelte';
  import { getLocalization } from '../i18n';

  import File from './icons/noun_File_3809021.svelte';
  import Plus from './icons/noun_Plus_2224966.svelte';
  import UploadIcon from './icons/noun_Upload_3814884.svelte';

  const { t } = getLocalization();

  let startScreen;
  let actionComponent;
  let actionComponentOptions;

  let fileInput;

  function reset() {
    startScreen = true;
    actionComponent = undefined;
    actionComponentOptions = {};
  }
  reset();
</script>

<nav>
  {#if startScreen }
    <button on:click={ () => startScreen = false }>
      <Plus />
      <h2>{ $t('new_canvas_button') }</h2>
    </button>
  {:else if actionComponent }
    <svelte:component this={ actionComponent } { ...actionComponentOptions } doneAction={ () => reset() }/>
  {:else}
    <div>
      <button class='right-border' on:click={ () => { canvasState.resetState(); reset(); } }>
        <File />
        <p>{ $t('blank_button') }</p>
      </button>
      <button><label for='file-loader'>
        <UploadIcon />
        <p>{ $t('upload_button') }</p>
      </label></button>  
    </div>
  {/if}
</nav>
<input id='file-loader' type="file" accept=".json" bind:this={ fileInput } on:change={ () => { actionComponentOptions = { fileInput }; actionComponent = Upload; }} >

<style>
  nav {
    height: 100px;
    width: 100%;
    border: 1px dashed var(--mid-grey);
    margin-bottom: 0.5em;
    padding: 0.5em 0;
  }
  #file-loader {
    display: none;
  }
  .right-border {
    border-right: 1px dashed var(--mid-grey);
  }
  nav :global(svg) {
    height: 2.5em;
  }
  div {
    display: flex;
    align-items: bottom;
    height: 100%;
  }
  button {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>