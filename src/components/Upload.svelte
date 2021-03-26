<script lang='typescript'>
  export let fileInput;
  export let doneAction: () => void;

  import { v4 as newUuid } from 'uuid';
  import { canvasState } from '../store';
  import { savedCanvases } from '../store';
  import { getLocalization } from '../i18n';
  import { loadFile } from '../utils/file-loader';

  const { t } = getLocalization();
  
  let contents;
  const loader = loadFile(fileInput.files[0]).then(res => contents = res);

  let uuidClash = false;
  $: {
    if (contents !== undefined ) {
      uuidClash = $savedCanvases.map(canvas => canvas.uuid).indexOf(contents.uuid) > -1;
      if (!uuidClash) proceedUpload();
    }
  }

  function duplicateBeforeLoad() {
    contents.uuid = newUuid();
  }

  function proceedUpload() {
    canvasState.loadCanvas(contents);
    doneAction();
  }
</script>

{#await loader }
  <p>{ $t('file_loading_message') }</p>
{:then res}
  {#if uuidClash == true }
    <p>{ $t('duplicate_file_message') }</p>
    <div class='actions'>
      <button on:click={ proceedUpload }>{ $t('duplicate_file_overwrite') }</button>
      <button on:click={ duplicateBeforeLoad }>{ $t('duplicate_file_clone') }</button>
      <button on:click={ doneAction }>{ $t('duplicate_file_cancel' )}</button> 
    </div>
  {/if}
{/await}

<style>
  p {
    padding: 0 0.5em;
    font-size: 0.8em;
  }
  button {
    font-size: 0.8em;
  }
</style>