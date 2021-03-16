<script lang='typescript'>
  import { canvasState } from '../store';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();
</script>

<fieldset>
  <label for='title'>{ $t('canvas_title') }</label>
  <input id='title' bind:value={ $canvasState.title } placeholder={ $t('canvas_title_placeholder')}>
</fieldset>

<style>
  fieldset {
    padding: 1em;
  }
  label, input {
    display: block;
  }
  input {
    font-size: 1.5em;
    width: 100%
  }
  label {
    color: var(--dark-blue);
    padding-bottom: 0.2em;
  }
</style>