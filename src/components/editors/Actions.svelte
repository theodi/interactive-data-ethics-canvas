<script lang="ts">
    import { canvasState } from '../../store';
    import { getLocalization } from '../../i18n';
    import ActionList from '../form/ActionList.svelte';
    import Textarea from '../form/Textarea.svelte';
    import BooleanAndTextarea from '../form/BooleanAndTextarea.svelte';
  
    export let ref: number;
  
    const { t } = getLocalization();
    const id = canvasState.getBlobId(ref);
  </script>
  
  <ActionList questions={ $t('areas:' + id + '.questions', { returnObjects: true }) } bind:content={ $canvasState.blobs[ref].content[0] } />
  <Textarea question={ $t('areas:' + id + '.questions.1') } bind:content={ $canvasState.blobs[ref].content[1] } />
  <BooleanAndTextarea question={ $t('areas:' + id + '.questions.2') } questionIndex={2} bind:content={ $canvasState.blobs[ref].content[2]}/>