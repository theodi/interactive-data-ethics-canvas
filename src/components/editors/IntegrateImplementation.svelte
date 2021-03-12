<script lang="ts">
    import { canvasState } from '../../store';
    import { getLocalization } from '../../i18n';
    import DynamicList from '../form/DynamicList.svelte';
    import BooleanAndTextarea from '../form/BooleanAndTextarea.svelte';

    export let ref: number;
  
    const { t } = getLocalization();
    const id = canvasState.getBlobId(ref);
</script>

<BooleanAndTextarea question={ $t('areas:' + id + '.questions.0') } questionIndex=0 bind:content={ $canvasState.blobs[ref].content[0] } />
<DynamicList question={ $t('areas:' + id + '.questions.1') } bind:content={ $canvasState.blobs[ref].content[1] } />
<BooleanAndTextarea question={ $t('areas:' + id + '.questions.2') } questionIndex=2 bind:content={ $canvasState.blobs[ref].content[2] } />