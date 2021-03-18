<script lang='typescript'>
  export let canvas: { uuid: string, title: string, lastUpdated: Date };
  export let loaded: boolean = false;
</script>

<section>
  <h2>{ canvas.title || 'Untitled' }</h2>
  <p class='small-font'>Status: { 'TKTKTK' }</p>
  <p class='small-font'>Last saved: { canvas.lastUpdated.toLocaleString() }</p>
  <footer>
    <p>{ loaded ? 'Loaded' : 'Load' }</p>
  </footer>
</section>

<style>
  section {
    position: relative;
    height: 100%;
  }
  .small-font {
    font-size: 0.7em;
  }
  footer {
    position: absolute;
    bottom: 0;
  }
</style>