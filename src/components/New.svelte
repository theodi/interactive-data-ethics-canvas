<script lang='typescript'>
  import { canvasState } from '../store';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();
  export let doneAction: () => void;
  canvasState.resetState();
</script>

<label for='title'>{ $t('title_label') }</label>
<input id='title' bind:value={ $canvasState.title } on:keypress={ (e) => {
  if (!e) return;
  if(e.key == 'Enter') {
    doneAction();
  }
}
  
}>
<button on:click|stopPropagation={ () => doneAction() }>{ $t('done_button') }</button>
