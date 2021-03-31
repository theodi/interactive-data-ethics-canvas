<script lang='typescript'>
  import { canvasState } from '../store';
  import Upload from './Upload.svelte';
  import { getLocalization } from '../i18n';

  import Icon from 'svelte-awesome';
  import { plus, fileO, upload } from 'svelte-awesome/icons';

  const { t } = getLocalization();

  const scale = 3;

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

{#if startScreen }
  <button on:click={ () => startScreen = false }>
    <Icon data={ plus } { scale }/>
    <h2>{ $t('new_canvas_button') }</h2>
  </button>
{:else if actionComponent }
  <svelte:component this={ actionComponent } { ...actionComponentOptions } doneAction={ () => reset() }/>
{:else}
  <div>
    <button class='right-border' on:click={ () => { canvasState.resetState(); reset(); } }>
      <Icon data={ fileO } { scale }/>
      <p>{ $t('blank_button') }</p>
    </button>
    <button><label for='file-loader'>
      <Icon data={ upload } { scale } />
      <p>{ $t('upload_button') }</p>
      <input id='file-loader' type="file" accept=".json" bind:this={ fileInput } on:change={ () => { actionComponentOptions = { fileInput }; actionComponent = Upload; }} >
    </label></button>  
  </div>
{/if}

<style>
  #file-loader {
    display: none;
  }
  .right-border {
    border-right: 1px dashed var(--mid-grey);
  }
  /* nav :global(svg) {
    height: 2.5em;
  } */
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