<script lang='typescript'>
  import New from './New.svelte';
  import Upload from './Upload.svelte';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();

  let actionComponent = undefined;
</script>

<nav>
  {#if actionComponent}
    <svelte:component this={ actionComponent } />
  {:else}
    <button class='large-button' on:click={ () => actionComponent = New }>{ $t('new_button') }</button>
    <button class='large-button' on:click={ () => actionComponent = Upload }>upload_button</button>
  {/if}
</nav>
