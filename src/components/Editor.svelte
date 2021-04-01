<script lang='ts'>
  import { Boundary } from '@crownframework/svelte-error-boundary';
  import { createEventDispatcher,onDestroy } from 'svelte';
  import { canvasState } from '../store/canvas';
  import { lastUpdate } from '../store/last-updated';
  import { editors } from '../utils/editors';
  import Actions from './editors/Actions.svelte';
  import BooleanAndTextareaList from './editors/BooleanAndTextareaList.svelte';
  import ExploreNegativeEffects from './editors/ExploreNegativeEffects.svelte';
  import ExplorePositiveEffects from './editors/ExplorePositiveEffects.svelte';
  import ExploreReasons from './editors/ExploreReasons.svelte';
  import IntegrateImplementation from './editors/IntegrateImplementation.svelte';
  import KnowRights from './editors/KnowRights.svelte';
  import KnowSources from './editors/KnowSources.svelte';
  import ListWithDescription from './editors/ListWithDescription.svelte';
  import PlanCommunicating from './editors/PlanCommunicating.svelte';
  import PlanEngaging from './editors/PlanEngaging.svelte';
  import TextareaList from './editors/TextareaList.svelte';
  
  const dispatch = createEventDispatcher();

  const registeredEditors = {
    Actions,
    BooleanAndTextareaList,
    ExploreNegativeEffects,
    ExplorePositiveEffects,
    ExploreReasons,
    IntegrateImplementation,
    KnowRights,
    KnowSources,
    ListWithDescription,
    PlanCommunicating,
    PlanEngaging,
    TextareaList,
  }
  export let blobRef: number;

  const expectedEditor = editors[$canvasState.blobs[blobRef].id];
  if ( $canvasState.blobs[blobRef].editor !== expectedEditor ) {
    lastUpdate.lock();
    $canvasState.blobs[blobRef].editor = expectedEditor;
    lastUpdate.unlock();
  }

  if ( !$canvasState.blobs[blobRef].content ) {
    lastUpdate.lock();
    $canvasState.blobs[blobRef].content = [];
    lastUpdate.unlock();
  }

  function handleError(error) {
    console.log('Captured error');
    console.error(error);
    dispatch('resetarea', { id: blobRef });
  }

  onDestroy(() => {
    lastUpdate.lock();
    const area = $canvasState.blobs[blobRef].id;
    const cleanUpFunctions = {
      'sources': (c) => {
        c = c.filter(x => !!x.title);
        return c;
      },
      'limitations': (c) => {
        c[0] = c[0].filter(x => !!x.title);
        return c;
      },
      'ethical-legislative': (c) => {
        c[0] = c[0].filter(x => !!x.title);
        return c;
      },
      'reasons': (c) => {
        c[1] = c[1].filter(x => !!x);
        return c;
      },
      'positive-effects': (c) => {
        c[0] = c[0].filter(x => !!x.title);
        return c;
      },
      'negative-effects': (c) => {
        c[0] = c[0].filter(x => !!x.title);
        return c;
      },
      'implementation': (c) => {
        c[1] = c[1].filter(x => !!x);
        return c;
      },
      'actions': (c) => {
        c[0] = c[0].filter(x => !!x.title);
        return c;
      },
    }
    const scrub = cleanUpFunctions[area] || null;
    if (scrub) {
      $canvasState.blobs[blobRef].content = scrub($canvasState.blobs[blobRef].content);
    }
    lastUpdate.unlock();
  })
</script>

<section>
  <Boundary onError={handleError} >
    <svelte:component this={ registeredEditors[$canvasState.blobs[blobRef].editor] } ref={ blobRef } />
  </Boundary>
</section>

<style>
  section {
    box-sizing: border-box;
    width: 100%;
    font-size: 1.1em;
    max-height: 95%;
    overflow-y: auto;
  }
  section :global(.ninety-five) {
    max-width: 95%;
    margin-left: 2.5%;
    margin-right: 2.5%
  }
</style>