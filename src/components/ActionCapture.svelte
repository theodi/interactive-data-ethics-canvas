<script lang="ts">
  import { canvasState } from '../store';
  import { getLocalization } from '../i18n';
  import ActionList from './form/ActionList.svelte';

  let ref: number = $canvasState.blobs.findIndex(x => x.id === 'actions');

  const { t } = getLocalization();
  if ( !$canvasState.blobs[ref].content ) $canvasState.blobs[ref].content = [];
</script>
  
<ActionList questions={ $t('areas:actions.questions', { returnObjects: true }) } bind:content={ $canvasState.blobs[ref].content[0] } />
