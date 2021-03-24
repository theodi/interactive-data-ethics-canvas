<script>
  export let infoPane;
  import { getLocalization } from '../i18n';
  const { t } = getLocalization();
</script>

<article>
  {@html $t([`info:${ infoPane }`, 'info:default'])}
</article>

<style>
  article :global(p),
  article :global(ul)
  {
    font-size: 0.8em;
    color: #444;
    line-height: 1.2em;
  }
  article :global(a) {
    color: inherit;
  }
  article :global(ul) {
    list-style: disc;
    padding-left: 1.2em;
    margin: 1em;
  }
</style>