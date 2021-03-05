<script lang="ts">
    import { canvasState } from '../../store';
    import { getLocalization } from '../../i18n';
    import Textarea from '../form/Textarea.svelte';

    export let ref: number;
  
    const { t } = getLocalization();
    const id = canvasState.getBlobId(ref);
</script>

<Textarea question={ $t('areas:' + id + '.questions.0') } bind:content={ $canvasState.blobs[ref].content[0] } />
<Textarea question={ $t('areas:' + id + '.questions.1') } bind:content={ $canvasState.blobs[ref].content[1] } />
<Textarea question={ $t('areas:' + id + '.questions.2') } bind:content={ $canvasState.blobs[ref].content[2] } />
<Textarea question={ $t('areas:' + id + '.questions.3') } bind:content={ $canvasState.blobs[ref].content[3] } />
