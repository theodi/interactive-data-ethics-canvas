<script>
  import { tweened } from 'svelte/motion';
  export let column;
  export let row;
  export let size;
  export let overlap;
  export let group = 0;
  let scale = tweened(1);

  // Set this true to desaturate
  const wireframe = true;
</script>

<g
  on:mouseover={ () => scale.set(1.05) }
  on:mouseout={ () => scale.set(1) }
  transform="translate({ (column + 0.5) * size } { (row + 0.5) * size }) scale({ $scale })"
  >
  <ellipse class='{ group }' class:wireframe rx={ size * (0.5 + overlap) }></ellipse>
</g>

<style>
  ellipse {
    fill-opacity: 0.5;
  }
  .wireframe {
    fill-opacity: 0;
    stroke: black;    
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
</style>
