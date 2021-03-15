<script lang="ts">
    import { canvasState } from '../../store';
    import { getLocalization } from '../../i18n';
    import DataSourceList from '../form/DataSourceList.svelte';
  
    export let ref: number;
  
    const { t } = getLocalization();
    const id = canvasState.getBlobId(ref);
  </script>
  
  <DataSourceList question={ $t('areas:' + id + '.questions', { joinArrays: ' ' }) } bind:content={ $canvasState.blobs[ref].content } />
  