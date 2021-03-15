<script>
  import { lastUpdate } from '../store';
</script>
<ul>
  <li>Last saved { $lastUpdate.toLocaleString() }</li>
</ul>  

<style>
  ul {
    display: flex;
    width: 100%;
    padding: 1em;
    color: var(--pale-grey);
    background: var(--dark-blue);
  }
</style>