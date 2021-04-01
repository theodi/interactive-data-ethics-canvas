<script lang="ts">
    import { canvasState } from '../../store/canvas';
    import { getLocalization } from '../../i18n';
    import Textarea from '../form/Textarea.svelte';
    import DynamicListWithDescription from '../form/DynamicListWithDescription.svelte';

    export let ref: number;
  
    const { t } = getLocalization();
    const id = canvasState.getBlobId(ref);
</script>

<DynamicListWithDescription question={ $t('areas:' + id + '.questions.0') }  descriptionlabel='How?' bind:content={ $canvasState.blobs[ref].content[0] } />
<Textarea question={ $t('areas:' + id + '.questions.1') } bind:content={ $canvasState.blobs[ref].content[1] } />