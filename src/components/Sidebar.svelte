<script lang="ts">
  import { getContext } from 'svelte';
  import { getLocalization } from '../i18n';
  import { canvasState } from '../store';
  import Guidance from './Guidance.svelte';

  export let blobIndex: number;

  const id = canvasState.getBlobId(blobIndex);
  $: group = $canvasState.blobs[blobIndex].group.toLowerCase();

  const { width, margin, height } = getContext('canvasConfig');
  const { t } = getLocalization();
  let selected = 'guidance';
</script>

<g transform="translate({width + 2 * margin - 420} -20)">
  <foreignObject x=0 y=0 width=360 height={ height + 40 }>
    <aside>
      <ul class='tabs'>
        <li id='guidance' class='tab-top { group }' class:inactive={ selected != 'guidance' }>
          <h2 on:click={ () => selected = 'guidance' }>{ $t('guidance_title') }</h2>
        </li>
        <li id='notes' class='tab-top { group }' class:inactive={ selected != 'notes' }>
          <h2 on:click={ () => selected = 'notes' }>{ $t('notes_title')}</h2>
        </li>
      </ul>
      <div class={ group }>
        {#if selected == 'guidance'}
          <Guidance id={ id } />
        {/if}
        {#if selected == 'notes'}
          <textarea bind:value={ $canvasState.blobs[blobIndex].notes }/>
        {/if}
  </div>
    </aside>
  </foreignObject>  
</g>

<style>
  aside {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    color: white;
    position: fixed;
  }
  .tabs {
    display: flex;
  }
  .tab-top {
    padding: 1em;
  }
  .inactive {
    cursor: pointer;
  }
  div {
    position: absolute;
    display: block;
    top: 3em;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1em;
  }
  h2 {
    font-weight: bold;
    font-size: 1.25em;
  }
  textarea {
    width: 100%;
    height: 100%;
  }
  .know {
    background: var(--know-light);
  }
  .know.inactive {
    color: var(--know);
    background: var(--pale-grey);
  }
  .explore {
    background: var(--explore-light);
  }
  .explore.inactive {
    color: var(--explore);
    background: var(--pale-grey);
  }
  .plan {
    background: var(--plan-light);
  }
  .plan.inactive {
    color: var(--plan);
    background: var(--pale-grey);
  }
  .integrate {
    background: var(--integrate-light);
  }
  .integrate.inactive {
    color: var(--integrate);
    background: var(--pale-grey);
  }
</style>