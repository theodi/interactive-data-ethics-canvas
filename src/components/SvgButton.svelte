<script lang="ts">
  export let action: () => {};
  export let x;
  export let y;
  export let icon;
</script>

<g transform="translate({ x } { y })" on:click={ action } >
  <rect x=0 y=0 width=30 height=30 />
  <svelte:component this={ icon } />
</g>

<style>
  g {
    cursor: pointer;
  }
  rect {
    fill: black;
    opacity: 0;
    stroke: none;
  }
</style>


