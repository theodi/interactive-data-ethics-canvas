<script lang='typescript'>
  import { getContext } from 'svelte';

  import { getLocalization } from '../i18n';
  import { canvasState } from '../store';
  import { Status } from '../types';
  
  import SelectBox from './form/SelectBox.svelte';

  const { height } = getContext('canvasConfig');

  const { t } = getLocalization();
  export let ref: number;
  $: if ($canvasState.blobs[ref].status === undefined) $canvasState.blobs[ref].status = Status.IN_PROGRESS;
</script>

<foreignObject x=-20 y={ height + 30 } width=640 height=40>
  <aside>
    <SelectBox
      label={ $t('status_title') }
      bind:value={ $canvasState.blobs[ref].status }
      options={[
        { value: Status.IN_PROGRESS, label: $t('status:IN_PROGRESS') },
        { value: Status.FOR_REVIEW, label: $t('status:FOR_REVIEW') },
        { value: Status.COMPLETE, label: $t('status:COMPLETE') },
      ]}
    />
  </aside>
</foreignObject>

<style>
  aside {
    text-align: center;
  }
  aside :global(label) {
    color: white;
  }
</style>