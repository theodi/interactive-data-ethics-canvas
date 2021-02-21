<script lang="ts">
  import { tweened } from 'svelte/motion';
  import type { Group, UserContent } from '../types';
  import Editor from './Editor.svelte';
  export let title: string;
  export let description: string;
  export let group: Group;
  export let row: number;
  export let column: number;
  export let focussed = false;
  export let hovered = false;
  export let dimmed = false;

  export let setHover: (...args: any) => any = () => {};
  export let setFocus: (...args: any) => any = () => {};

  export let size: number;
  export let overlap: number;
  export let canvasHeight = 100;

  export let content: UserContent = null;

  const animationDuration = 250;
  let scale = tweened(1, { duration: animationDuration });
  let x = tweened((column + 0.5) * size, { duration: animationDuration });
  let y = tweened((row + 0.5) * size, { duration: animationDuration });

  const hoverOn = () => setHover(true);
  const hoverOff = () => setHover(false);
  const focus = () => setFocus(true);

  $: {
    if (focussed) {
      scale.set(4);
      x.set(canvasHeight / 2);
      y.set(canvasHeight / 2);
    } else {
      scale.set(hovered ? 1.05 : 1);
      x.set((column + 0.5) * size);
      y.set((row + 0.5) * size)
    }
  }

  let textBoxSize, textBoxOffset;
  $: {
    textBoxSize = size * (focussed ? $scale : 1) * 0.8;
    textBoxOffset = -textBoxSize / 2;
  }

</script>

<g
  on:mouseover={ () => hoverOn() }
  on:mouseout={ () => hoverOff() }
  on:click={ () => focus() }
  transform="translate({ $x } { $y })"
  class:dimmed
  >
  <g transform="scale({ $scale })">
    <ellipse class='{ group.toLowerCase() }' class:hovered class:focussed rx={ Math.round(size * (0.5 + overlap)) }/>
    <rect class='rect' transform="translate({-size / 2} { -size /2 })" x={ size * 0.1 } y={ size * 0.1 } width={ size * 0.8 } height={ size * 0.8 } />
  </g>
  <foreignObject class:focussed class="node" x="{ textBoxOffset }" y="{ textBoxOffset }" width="{ textBoxSize }" height="{ textBoxSize }">
    <section>
      <h2>
        { title }
      </h2>
      {#if focussed}
        <Editor bind:content></Editor>
      {:else}
        <p class='description'>
          { description }
        </p>
      {/if}  
    </section>
  </foreignObject>
</g>

<style>
  ellipse {
    fill-opacity: 0.7;
  }
  .focussed {
    fill-opacity: 1;
  }
  .rect {
    fill: none;
    stroke: white;
    stroke-width: 1px;
    stroke-dasharray: 2 10;
    stroke-linecap: round;
  }
  .know {
    fill: hsl(321, 77%, 52%);
  }
  .explore {
    fill: hsl(36, 72%, 55%);
  }
  .plan {
    fill: hsl(92, 54%, 38%);
  }
  .integrate {
    fill: hsl(201, 100%, 61%);
  }
  foreignObject {
    position: relative;
  }
  section {
    padding: 1rem;
    height: 100%;
    color: white;
  }
  h2 {
    font-weight: bold;
    font-size: 1.1em;
    padding-bottom: 1em;
  }
  .description {
    position: absolute;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    bottom: 0;
    left: 0;
  }
  .dimmed {
    filter: grayscale(100%) contrast(50%) brightness(140%);
  }
</style>
