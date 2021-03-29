<script lang='typescript'>
  import { lastUpdate } from '../store/last-updated';
  import { canvasState } from '../store';
  import { getLocalization } from '../i18n';
  import { getOverallCanvasStatus } from '../utils/canvas-state';

  const { t } = getLocalization();
  const src = 'images/CC-BY-SA_icon_white.png';

  let blobStatus: string;
  $: blobStatus = getOverallCanvasStatus($canvasState.blobs);
</script>

<ul>
  <li class="grow">
    Last saved: { $lastUpdate.toLocaleString() }<br>Status: { $t( 'status:' + blobStatus ) }
  </li>
  <li class="license">
    <span class="about">Data Ethics Canvas by <a href="https://theodi.org">The Open Data Institute</a> is licensed under a <br>
    <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>
    </span>
    <img {src} alt='cc-by-sa license' />
  </li>
</ul>  

<style>
  ul {
    display: flex;
    width: 100%;
    padding: 0.5em 1em;
    color: var(--pale-grey);
    background: var(--dark-blue);
    line-height: 1.2;
  }
  .grow {
    flex-grow: 1;
  }
  .license {
    display: flex;
  }
  a {
    color: inherit;
  }
  img {
    height: 32px;
    padding-left: 1em;
  }
</style>
