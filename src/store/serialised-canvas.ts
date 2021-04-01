import { derived, Readable } from 'svelte/store';
import { refreshStoredCanvasList } from '../events';
import { canvasState } from './canvas';
import type { CanvasState, CanvasPrivateState } from '../types';
import { currentKey } from './current-key';
import { lastUpdate } from './last-updated';

export const serialisedCanvas = derived<[Readable<CanvasPrivateState>, Readable<Date>], CanvasState>(
  [canvasState, lastUpdate],
  $s => {
    const uuid = $s[0].uuid;
    const lastUpdated: Date = $s[1];
    const title = $s[0].title;
    const blobs = $s[0].blobs.map(blobState => blobState);
    return {
      uuid,
      blobs,
      lastUpdated,
      title,
    }
  }
);

serialisedCanvas.subscribe(c => {
  currentKey.set(c.uuid);
  localStorage.setItem(c.uuid, JSON.stringify(c));
  dispatchEvent(refreshStoredCanvasList);
});
