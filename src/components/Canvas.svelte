<script>
  import Area from './Area.svelte';
  import { areas } from '../store';
  const cols = 5;
  const rows = 3;
  const areaConfig = { size: 200, overlap: 0.05 };
  const margin = areaConfig.size * areaConfig.overlap * 5;
</script>

<svg viewBox="-{ margin } -{ margin } { cols * areaConfig.size + 2 * margin} { rows * areaConfig.size + 2 * margin }">
  <g class="cloud" transform="scale({ areaConfig.size }) translate(0.5 0.5)">
    {#each $areas as _, index}
    <ellipse cy={ Math.floor(index/5) } cx={ (index % 5) } rx={ 0.5 + areaConfig.overlap * 3 }/>
    {/each}
    <rect width={ cols - 1 } height={ rows - 1 }/>
  </g>

  {#each $areas as area, index}
    <Area
      { ...area }
      { ...areaConfig }
    />
  {/each}
</svg>

<style>
  svg {
    background-color: #eee;
  }
  .cloud {
    fill: white;
  }
</style>