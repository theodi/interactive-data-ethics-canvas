<script lang="ts">
  import { getContext } from 'svelte';
  import { getLocalization } from '../i18n';
  import { canvasState } from '../store';
  import marked from 'marked';

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
        <section class="guidance" >
          {@html marked($t(`areas:${ id }.guidance`)) }
        </section>
        {/if}
        {#if selected == 'notes'}
        <section>
          <textarea bind:value={ $canvasState.blobs[blobIndex].notes } rows=20/>
        </section>  
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
    position: relative;
  }
  .tabs {
    display: flex;
  }
  .tab-top {
    padding: 1em;
  }
  div {
    position: absolute;
    display: block;
    height: 100%;
    top: 0;
    margin-top: 3em;
    left: 0;
    right: 0;
    padding: 1em;
  }
  h2 {
    font-weight: bold;
    font-size: 1.25em;
  }
  :global(.guidance p) {
    padding-bottom: 1em;
  }
  :global(.guidance ul) {
    padding-left: 1em;
    list-style: "\203A";
  }
  :global(.guidance li) {
    padding-left: 1em;
  }
  textarea {
    width: 100%;
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