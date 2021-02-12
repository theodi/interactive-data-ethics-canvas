<script lang="ts">
  export let action: () => {};
  export let x;
  export let y;
  export let icon;
</script>

<g class="button" transform="translate({ x } { y })" on:click={ action } >
  <svelte:component this={ icon } />
</g>

<style>
  g {
    fill: none;
  }
</style>


