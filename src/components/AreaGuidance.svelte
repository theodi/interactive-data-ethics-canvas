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
  console.log(margin);
</script>

<g transform="translate({width + 2 * margin - 420} -20)">
  <rect class={ group } width=360 height={ height + 40 }></rect>  
  <foreignObject x=0 y=0 width=360 height={ height + 40 }>
    <aside class="guidance">
      <h2>{ $t('guidance_title') }</h2>
      {@html marked($t(`areas:${ id }.guidance`)) } 
    </aside>
  </foreignObject>  
</g>

<style>
  rect {
    stroke: white;
    stroke-width: 3px;
    stroke-dasharray: 0 20;
    stroke-linecap: round;
    /* TODO Fix colour lightness */
  }
  aside {
    box-sizing: border-box;
    width: 100%;
    padding: 1em;
    color: white;
  }
  h2 {
    font-weight: bold;
    font-size: 1.25em;
    padding-bottom: 1em;
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
  .know {
    fill: var(--know)
  }
  .explore {
    fill: var(--explore)
  }
  .plan {
    fill: var(--plan)
  }
  .integrate {
    fill: var(--integrate)
  }
</style>