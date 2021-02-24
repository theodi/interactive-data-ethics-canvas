<script lang="ts">
  import { getContext } from 'svelte';
  const { width, margin, height } = getContext('canvasConfig');
</script>

<foreignObject x={width + 2 * margin - 450} y=0 width=450 {height}>
  <aside>
    <h2>HINTS AND TIPS GO HERE</h2>
  </aside>
</foreignObject>

<style>
  aside {
    background: white;
    box-sizing: border-box;
    width: 100%;
    margin: 1em;
    padding: 1em;
    border: solid 1px hsl(0, 0%, 90%);
    border-radius: 20px 0 0 20px;
    box-shadow: 0 0 10px hsla(0, 0%, 0%, 10%);
  }
</style>