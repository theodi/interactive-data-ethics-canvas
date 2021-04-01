<script lang="ts">
  import { getContext } from 'svelte';
  import OdiLogo from './icons/ODILogo.svelte';
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
<g transform="translate(0 -15) scale(0.63)">
  <OdiLogo />
</g>

<style>
  .cloud {
    fill: white;
  }
</style>