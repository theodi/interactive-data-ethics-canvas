<script lang='typescript'>
  import { canvasState } from '../store';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();
</script>

<button class='large-button' on:click={ () => canvasState.resetState() }>{ $t('new_button') }</button>
