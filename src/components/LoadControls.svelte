<script lang='typescript'>
  export let backAction: () => void;
  
  import LoadFromStorage from './LoadFromStorage.svelte';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();
</script>

<div class='content-holder'>
  <button class='large-button' on:click={ () => backAction() }>{ $t('back_button') }</button>
</div>
<div class='full-width'>
  <LoadFromStorage />
</div>

<style>
  div {
    margin-right: 0.5em;
  }
  div:last-child {
    margin-right: 0;
  }
  .large-button {
    margin-bottom: initial;
  }
  .full-width {
    grid-column-start: 1;
    grid-column-end: span 3;
  }
  @media (min-width: 1480px) {
    div {
      margin-right: 0;
    }
    .full-width {
      position: absolute;
      top: 70px;
      bottom: 0.5em;
      left: 0.5em;
      right: 0.5em;
      overflow-y: auto;
    }
  }
</style>
