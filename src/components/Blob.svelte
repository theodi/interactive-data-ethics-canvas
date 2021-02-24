<script lang="ts">
  import { getContext } from 'svelte';
  import { tweened } from 'svelte/motion';
  
  export let row: number;
  export let column: number;

  const { height, spacing, overlap } = getContext('canvasConfig');

  // UiState
  export let focussed = false;
  export let hovered = false;
  export let dimmed = false;

  const animationDuration = 250;
  let scale = tweened(1, { duration: animationDuration });
  let x = tweened((column + 0.5) * spacing, { duration: animationDuration });
  let y = tweened((row + 0.5) * spacing, { duration: animationDuration });

  $: {
    if (focussed) {
      scale.set(4);
      x.set(height / 2);
      y.set(height / 2);
    } else {
      scale.set((hovered && !dimmed) ? 1.05 : 1);
      x.set((column + 0.5) * spacing);
      y.set((row + 0.5) * spacing)
    }
  }

  let textBoxSize: number, textBoxOffset: number;
  $: {
    textBoxSize = spacing * (focussed ? $scale : 1) * 0.8;
    textBoxOffset = -textBoxSize / 2;
  }

</script>

<g transform="translate({ $x } { $y }) scale({ $scale })">
  <ellipse class:focussed rx={ Math.round(spacing * (0.5 + overlap)) }/>
  <rect transform="translate({-spacing / 2} { -spacing /2 })" x={ spacing * 0.1 } y={ spacing * 0.1 } width={ spacing * 0.8 } height={ spacing * 0.8 } />
</g>

<style>
  ellipse {
    fill-opacity: 0.7;
    filter: inherit;
  }
  rect {
    fill: none;
    stroke: white;
    stroke-width: 1px;
    stroke-dasharray: 2 10;
    stroke-linecap: round;
  }
  .focussed {
    fill-opacity: 1;
  }
</style>
