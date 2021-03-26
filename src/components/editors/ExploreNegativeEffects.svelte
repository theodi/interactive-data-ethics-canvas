<script lang="ts">
    import { canvasState } from '../../store';
    import { getLocalization } from '../../i18n';
    import Textarea from '../form/Textarea.svelte';
    import DynamicListWithDescription from '../form/DynamicListWithDescription.svelte';
    import BooleanAndTextarea from '../form/BooleanAndTextarea.svelte';

    export let ref: number;
  
    const { t } = getLocalization();
    const id = canvasState.getBlobId(ref);
</script>

<DynamicListWithDescription question={ $t('areas:' + id + '.questions.0') }  descriptionlabel={$t('areas:' + id + '.listlabel')} bind:content={ $canvasState.blobs[ref].content[0] } />
<BooleanAndTextarea question={ $t('areas:' + id + '.questions.1') } questionIndex=1 bind:content={ $canvasState.blobs[ref].content[1] } />
<BooleanAndTextarea question={ $t('areas:' + id + '.questions.2') } questionIndex=2 bind:content={ $canvasState.blobs[ref].content[2] } />
<Textarea question={ $t('areas:' + id + '.questions.3') } bind:content={ $canvasState.blobs[ref].content[3] } />