<script lang="ts">
    import { canvasState } from '../../store';
    import { getLocalization } from '../../i18n';
    import Textarea from '../form/Textarea.svelte';
    import DynamicList from '../form/DynamicList.svelte';

    export let ref: number;
  
    const { t } = getLocalization();
    const id = canvasState.getBlobId(ref);
</script>

<DynamicList question={ $t('areas:' + id + '.questions.0') } bind:content={ $canvasState.blobs[ref].content[0] } />
<Textarea question={ $t('areas:' + id + '.questions.1') } bind:content={ $canvasState.blobs[ref].content[1] } />