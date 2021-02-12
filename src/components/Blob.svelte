<script lang="ts">
  import { tweened } from 'svelte/motion';
  export let title;
  export let description;
  export let group;
  export let row;
  export let column;
  export let focussed = false;
  export let hovered = false;

  export let setHover = () => {};
  export let setFocus = () => {};

  export let size;
  export let overlap;
  export let canvasHeight = 100;

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
      x.set((column + 0.5) * size );
      y.set((row + 0.5) * size)
    }
  }

  const textBoxSize = size * 0.7;
  const textBoxOffset = -textBoxSize / 2;

</script>

<g
  on:mouseover={ () => hoverOn() }
  on:mouseout={ () => hoverOff() }
  on:click={ () => focus() }
  transform="translate({ $x } { $y }) scale({ $scale })"
  >
  <ellipse class='{ group }' class:hovered class:focussed rx={ Math.round(size * (0.5 + overlap)) }/>
  <rect class='rect' transform="translate({-size / 2} { -size /2 })" x={ size * 0.115 } y={ size * 0.115 } width={ size * 0.77 } height={ size * 0.77 } />
  <foreignObject class:focussed class="node" x="{ textBoxOffset }" y="{ textBoxOffset }" width="{ textBoxSize }" height="{ textBoxSize }">
    <h1>
      { title }
    </h1>
    <p>
      { description }
    </p>
  </foreignObject>
</g>

<style>
  ellipse {
    fill-opacity: 0.7;
  }
  .focussed {
    fill-opacity: 1;
    font-size: 0.5em;
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
  h1, p {
    color: white;
    padding-bottom: 0.5em;
  }
  h1 {
    font-weight: bold;
  }
</style>
