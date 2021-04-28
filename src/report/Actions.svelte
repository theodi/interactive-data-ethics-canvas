<script lang='ts'>
  import { getContext } from 'svelte';
import type { filtered } from '../store/filtered';
  import type { CanvasState } from '../types';
  import { Priority } from '../types';
import ActionList from './utils/ActionList.svelte';

  const canvas: CanvasState = getContext('canvas');
  $: actions = canvas.blobs.find(x => x.id === 'actions').content[0].filter(x => x);
</script>

<section>
  <h2>Actions and Decisions</h2>
  <p>
    This section outlines the actions and decisions that have been captured
    during the collation of this Data Ethics Canvas.
  </p>

  <section>
    <h3>High Priority Actions</h3>
    <ActionList actions={ actions.filter(a => a.type === 'action' && a.priority === Priority.HIGH) } />
  </section>

  <section>
    <h3>Decisions</h3>
    <ActionList actions={ actions.filter(a => a.type === 'decision') } />
  </section>

  <section>
    <h3>Medium and Low Priority Actions</h3>
    <ActionList actions={ actions.filter(a => a.type === 'action' && a.priority !== Priority.HIGH) } />
  </section>

</section>
