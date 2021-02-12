<script lang="ts">
  export let action: () => {};
  export let x;
  export let y;
  export let icon;
</script>

<g transform="translate({ x } { y })" on:click={ action } >
  <rect x=0 y=0 width=50 height=50 />
  <svelte:component this={ icon } />
</g>

<style>
  rect {
    fill: #aaa;
    stroke: none;
  }
</style>


