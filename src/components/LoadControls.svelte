<script lang='typescript'>
  export let backAction: () => void;
  
  import Upload from './Upload.svelte';
  import LoadFromStorage from './LoadFromStorage.svelte';
  import { canvasState } from '../store';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();
</script>

<button class='large-button' on:click={ () => backAction() }>{ $t('back_button') }</button>

<div class='wip'>
  <p>WIP - not styled</p>
  <button class='large-button' on:click={ () => canvasState.resetState() }>{ $t('new_button') }</button>
  <Upload />
</div>

<LoadFromStorage />
