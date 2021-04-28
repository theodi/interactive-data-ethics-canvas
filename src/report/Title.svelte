<script>
  import { getContext } from 'svelte';

  const canvas = getContext('canvas');
</script>

<h1>{ canvas.title || 'Untitled Canvas' }</h1>
