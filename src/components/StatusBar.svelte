<script>
  import { lastUpdate } from '../store';
  import { canvasState } from '../store';
  import { getLocalization } from '../i18n';
  import { Status } from '../types';
  const { t } = getLocalization();

  let blobStatuses;
  $: {
    blobStatuses = $canvasState.blobs.map(blob => blob.status);
  }

  function getOverallCanvasStatus(statuses) {
    for (const status in Status) {
      if (statuses.indexOf(status) > -1) {
        return $t('status:' + status);
      }
    }
  }

  let src = 'images/CC-BY-SA_icon_white.png';

</script>

<ul>
<li><span class="left">Last saved: { $lastUpdate.toLocaleString() }<br>Status: { getOverallCanvasStatus(blobStatuses) }</span><span class="right"><span class="about">Data Ethics Canvas by <a href="https://theodi.org">The Open Data Institute</a> is licensed under a <br><a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a></span><img src={src} alt="cc"/></span></li>
</ul> 
<style>
  ul {
    display: flex;
    width: 100%;
    padding: 1em;
    color: var(--pale-grey);
    background: var(--dark-blue);
  }

  li {
    width: 100%;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .right a {
    color: inherit;
  }

  .right .about {
    width: 400px;
    display: inline-block;
    vertical-align: top;
    padding-top: 3px;
  }

  .right img {
    height: 32px;
    display: inline-block;
  }

  @media screen and (max-width: 800px) {
    .right {
      margin-top: 1em;
      float: left;
    }
  }
</style>