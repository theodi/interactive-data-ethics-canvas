<script>
  import { tweened } from 'svelte/motion';
  export let state;
  $: hovered = $state.hovered;

  export let size;
  export let overlap;

  let scale = tweened(1);
  let x = tweened();
  let y = tweened();

  const zoom = (z) => scale.set(z);
  const hoverOn = () => state.setProp('hovered', true && !focussed);
  const hoverOff = () => state.setProp('hovered', false);

  $: {
    x.set(($state.column + 0.5) * size );
    y.set(($state.row + 0.5) * size)
  }

  const textBoxSize = size * 0.7;
  const textBoxOffset = -textBoxSize / 2;

</script>

<g
  on:mouseover={ () => hoverOn() }
  on:mouseout={ () => hoverOff() }
  transform="translate({ $x } { $y }) scale({ $scale })"
  >
  <ellipse class='{ $state.group }' class:hovered rx={ size * (0.5 + overlap) }>
  </ellipse>
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
