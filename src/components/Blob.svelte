<script>
  import { tweened } from 'svelte/motion';
  export let state;
  $: focussed = $state.focussed;
  $: hovered = $state.hovered && !$state.focussed;

  export let size;
  export let overlap;
  export let canvasHeight = 100;

  let scale = tweened(1);
  let x = tweened();
  let y = tweened();

  const zoom = (z) => scale.set(z);
  const hoverOn = () => state.setProp('hovered', true);
  const hoverOff = () => state.setProp('hovered', false);
  const focus = () => state.update(n => { n.focussed = true; return n; } );

  $: {
    if (focussed) {
      zoom(4);
      x.set(canvasHeight / 2);
      y.set(canvasHeight / 2);
    } else {
      x.set(($state.column + 0.5) * size );
      y.set(($state.row + 0.5) * size)
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
  <ellipse class='{ $state.group }' class:hovered class:focussed rx={ size * (0.5 + overlap) }>
  </ellipse>
  <foreignObject class="node" x="{ textBoxOffset }" y="{ textBoxOffset }" width="{ textBoxSize }" height="{ textBoxSize }">
    <h1>
      { $state.title }
    </h1>
    <p>
      { $state.description }
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
