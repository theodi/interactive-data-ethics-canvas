<script lang='ts'>
  import { createEventDispatcher } from 'svelte';
  import { Boundary } from '@crownframework/svelte-error-boundary';
  import { canvasState } from '../store';
  import Basic from './editors/Basic.svelte';
  import SimpleList from './editors/SimpleList.svelte';
  import TextareaList from './editors/TextareaList.svelte';
  import ExploreReasons from './editors/ExploreReasons.svelte';
  import ExplorePositiveEffects from './editors/ExplorePositiveEffects.svelte';
  import ExploreNegativeEffects from './editors/ExploreNegativeEffects.svelte';
  import BooleanAndTextareaList from './editors/BooleanAndTextareaList.svelte';
  import PlanCommunicating from './editors/PlanCommunicating.svelte';
  import PlanEngaging from './editors/PlanEngaging.svelte';
  import IntegrateImplementation from './editors/IntegrateImplementation.svelte';
  import KnowSources from './editors/KnowSources.svelte';
  import KnowRights from './editors/KnowRights.svelte';
  import Actions from './editors/Actions.svelte';
  import ListWithDescription from './editors/ListWithDescription.svelte';
  import { resetCanvas } from '../events';

  const dispatch = createEventDispatcher();

  const editors = {
    Basic,
    SimpleList,
    TextareaList,
    ExploreReasons,
    ExplorePositiveEffects,
    ExploreNegativeEffects,
    BooleanAndTextareaList,
    PlanCommunicating,
    PlanEngaging,
    IntegrateImplementation,
    KnowSources,
    KnowRights,
    Actions,
    ListWithDescription
  }
  export let blobRef: number;

  if ( !$canvasState.blobs[blobRef].content ) {
    $canvasState.blobs[blobRef].content = [];
  }

  function captureContent() {
    const currentContent = JSON.stringify($canvasState.blobs[blobRef].content, null, 2);
    if (!$canvasState.blobs[blobRef].notes) {
      $canvasState.blobs[blobRef].notes = '';
    }
    $canvasState.blobs[blobRef].notes += `Failing content
    
    ${currentContent}
    `;
    $canvasState.blobs[blobRef].content = [];

    // Force a view reset
    dispatch(resetCanvas);
    window.location.reload();
  }
</script>

<section>
  <Boundary onError={captureContent} >
    <svelte:component this={ editors[$canvasState.blobs[blobRef].editor] } ref={ blobRef } />
  </Boundary>
</section>

<style>
  section {
    box-sizing: border-box;
    width: 100%;
    max-height: 90%;
    padding: 0.7rem;
    overflow-y: auto;
    font-size: 1.1em;
  }
  section :global(.ninety-five) {
    max-width: 95%;
    margin-left: 2.5%;
    margin-right: 2.5%
  }
</style>