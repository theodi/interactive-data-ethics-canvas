<script lang='typescript'>
  export let backAction: () => void;
  
  import NewOrUpload from './NewOrUpload.svelte';
  import LoadFromStorage from './LoadFromStorage.svelte';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();
</script>

<div>
  <button class='large-button' on:click={ () => backAction() }>{ $t('back_button') }</button>
  <NewOrUpload />
</div>
<div class='two-cols'>
  <LoadFromStorage />
</div>


<style>
  div {
    margin-right: 0.5em;
  }
  div:last-child {
    margin-right: 0;
  }
  .two-cols {
    grid-column-end: span 2;
  }
  @media (min-width: 1480px) {
    div {
      margin-right: 0;
    }
  }
</style>
