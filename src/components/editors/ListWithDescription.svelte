<script lang="ts">
    import { canvasState } from '../../store/canvas';
    import { getLocalization } from '../../i18n';
    import DynamicListWithDescription from '../form/DynamicListWithDescription.svelte';
  
    export let ref: number;
  
    const { t } = getLocalization();
    const id = canvasState.getBlobId(ref);
</script>
  
<DynamicListWithDescription question={ $t('areas:' + id + '.questions', { joinArrays: ' ' }) } descriptionlabel={$t('areas:' + id + '.listlabel')} bind:content={ $canvasState.blobs[ref].content[0] } />
  