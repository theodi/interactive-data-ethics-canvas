<script lang="ts">
  import { getContext } from 'svelte';
  const { spacing, overlap, columns, rows, topMargin } = getContext('canvasConfig');
</script>

<g class="cloud" transform="scale({ spacing }) translate(0.5 0.5)">
  {#each Array(columns * rows)
    .fill(null)
    .map((_, i) => i) as cell}
    <ellipse
      cy={Math.floor(cell / 5)}
      cx={cell % 5}
      rx={0.5 + overlap * 2}
    />
  {/each}
  <rect width={columns - 1} height={rows - 1} />
</g>
<text
  x={Math.round((columns + overlap * 2) * spacing)}
  y={- topMargin}>Data Ethics Canvas</text
>

<style>
  .cloud {
    fill: white;
  }
  text {
    font-size: 3em;
    text-anchor: end;
    font-weight: bold;
    fill: #345b9f;
  }
</style>