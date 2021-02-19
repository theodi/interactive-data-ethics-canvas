<script type="ts">
  import { serialisedCanvas } from '../store';
</script>


<div>
{ JSON.stringify($serialisedCanvas, null, 2) }
</div>

<style>
  div {
    font-family:'Courier New', Courier, monospace;
    font-size: 0.8em;
    color: palegoldenrod;
    background-color: darkslategray;
    white-space: pre;
  }
</style>