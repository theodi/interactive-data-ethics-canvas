<script lang='typescript'>
  import New from './New.svelte';
  import Upload from './Upload.svelte';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();

  let actionComponent = undefined;
</script>

<nav>
  {#if actionComponent}
    <svelte:component this={ actionComponent } doneAction={ () => actionComponent = undefined }/>
  {:else}
    <button class='large-button' on:click={ () => actionComponent = New }>{ $t('blank_button') }</button>
    <button class='large-button' on:click={ () => actionComponent = Upload }>{ $t('upload_button') }</button>
  {/if}
</nav>
