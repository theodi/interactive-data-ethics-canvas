<script lang='typescript'>
  export let backAction: () => void;
  
  import NewOrUpload from './NewOrUpload.svelte';
  import LoadFromStorage from './LoadFromStorage.svelte';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();
</script>

<button class='large-button' on:click={ () => backAction() }>{ $t('back_button') }</button>

<div class='wip'>
  <p>WIP - not properly styled</p>
  <NewOrUpload />
</div>
<LoadFromStorage />
