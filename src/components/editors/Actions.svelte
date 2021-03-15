<script lang="ts">
    import { canvasState } from '../../store';
    import { getLocalization } from '../../i18n';
    import ActionList from '../form/ActionList.svelte';
  
    export let ref: number;
  
    const { t } = getLocalization();
    const id = canvasState.getBlobId(ref);
  </script>
  
  <ActionList questions={ $t('areas:' + id + '.questions', { returnObjects: true }) } bind:content={ $canvasState.blobs[ref].content } />
  