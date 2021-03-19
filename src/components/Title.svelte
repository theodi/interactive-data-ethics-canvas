<script lang='typescript'>
  import { canvasState } from '../store';
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();
</script>

<fieldset>
  <input id='title' bind:value={ $canvasState.title } placeholder={ $t('data_ethics_canvas')}>
</fieldset>

<style>
  fieldset {
    padding: 1em;
  }
  input {
    display: block;
    text-align: right;
    font-size: 3.0em;
    font-weight: bold;
    padding: 0;
    width: 100%;
    background: none;
    color: var(--dark-blue);
    outline: none;
  }
  input:hover, input:focus {
    text-decoration: underline dotted;
  }
  ::placeholder {
    opacity: 1;
  }
</style>