<script lang="ts">
    import { canvasState } from '../../store/canvas';
    import { getLocalization } from '../../i18n';
    import BooleanAndTextarea from '../form/BooleanAndTextarea.svelte';

    export let ref: number;
  
    const { t } = getLocalization();
    const id = canvasState.getBlobId(ref);
</script>

{#each $t('areas:' + id + '.questions', { returnObjects: true }) as l, i }
    <BooleanAndTextarea question={ l } questionIndex={i} bind:content={ $canvasState.blobs[ref].content[i] } />
{/each}