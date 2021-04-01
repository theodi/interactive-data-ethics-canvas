<script lang="ts">
  import { canvasState } from '../../store/canvas';
  import { getLocalization } from '../../i18n';
  import DynamicList from '../form/DynamicList.svelte';

  export let ref: number;

  const { t } = getLocalization();
  const id = canvasState.getBlobId(ref);
</script>

<DynamicList question={ $t('areas:' + id + '.questions', { joinArrays: ' ' }) } bind:content={ $canvasState.blobs[ref].content[0] } />
