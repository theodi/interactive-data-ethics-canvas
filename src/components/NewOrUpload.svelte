<script lang='typescript'>
  import { canvasState } from '../store';
  import Upload from './Upload.svelte';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();

  let actionComponent = undefined;
</script>

<nav>
  {#if actionComponent}
    <svelte:component this={ actionComponent } doneAction={ () => actionComponent = undefined }/>
  {:else}
    <button class='large-button' on:click={ () => canvasState.resetState() }>{ $t('blank_button') }</button>
    <button class='large-button' on:click={ () => actionComponent = Upload }>{ $t('upload_button') }</button>
  {/if}
</nav>
