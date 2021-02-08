<script>
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

  let scale = tweened(1);
  let x = tweened((column + 0.5) * size );
  let y = tweened((row + 0.5) * size);

  const zoom = (z) => scale.set(z);
  const hoverOn = () => setHover(true);
  const hoverOff = () => setHover(false);
  const focus = () => setFocus(true);

  $: {
    if (focussed) {
      zoom(4);
      x.set(canvasHeight / 2);
      y.set(canvasHeight / 2);
    } else {
      zoom(1);
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
  <ellipse class='{ group }' class:hovered class:focussed rx={ size * (0.5 + overlap) }>
  </ellipse>
  <foreignObject class="node" x="{ textBoxOffset }" y="{ textBoxOffset }" width="{ textBoxSize }" height="{ textBoxSize }">
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
    transition-property: scale;
    transition-duration: 0.5s;
  }
  .hovered {
    scale: 1.05;
  }
  .focussed {
    fill-opacity: 1;
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
