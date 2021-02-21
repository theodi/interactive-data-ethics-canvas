<script lang='ts'>
  import { fade } from 'svelte/transition';
  import { canvasState } from '../store';

  import SvgButton from './SvgButton.svelte';
  import Cross from './icons/Cross.svelte';
  import Basic from './editors/Basic.svelte';
  const editors = {
    Basic
  }

  export let focusBlob: number;

  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;

  export let canvasHeight: number;

  const editorSize = 640;
</script>


<g transition:fade transform="translate({ x } { y })">
  <rect
    class="overlay"
    { width }
    { height }
  />
  <SvgButton
    x={width - 50}
    y="0"
    action={() =>
      setTimeout(
        () => ($canvasState.blobs[focusBlob].focussed = false),
        600
      )}
    icon={Cross}
  />
</g>
<use xlink:href={`#blob-${focusBlob}`} />
<g transition:fade>
  <foreignObject x={ (canvasHeight - editorSize) / 2 } y={ (canvasHeight - editorSize) / 2 } width={ editorSize } height={ editorSize }>
    <section id='editor'>
      <svelte:component this={ editors['Basic'] } bind:content={ $canvasState.blobs[focusBlob].content } />
    </section>
  </foreignObject>  
  <foreignObject x={ width - 40 - 400 } y={ 0 } width={ 400 } height={ height }>
    <aside>
      <h2>HINTS AND TIPS GO HERE</h2>
    </aside>
  </foreignObject>
</g>


<style>
  section {
    top: 0;
    position: relative;
    padding-top: 40px;
    padding-left: 1em;
    padding-right: 1em;
    box-sizing: border-box;
    overflow-y: scroll;
    height: 600px;
    width: 100%;
  }
  .overlay {
    fill: white;
    opacity: 50%;
  }
  aside {
    background: white;
    box-sizing: border-box;
    width: 100%;
    margin: 1em;
    padding: 1em;
    border: solid 1px hsl(0, 0%, 90%);
    border-radius: 20px 0 0 20px;
    box-shadow: 0 0 10px hsla(0, 0%, 0%, 10%);
  }
</style>