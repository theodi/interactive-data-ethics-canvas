import { derived, writable, readable, Writable } from 'svelte/store';
import { baseLayout } from './templates/canvas-base';
import { v4 as uuid } from 'uuid';
import type { CanvasState, CanvasPrivateState } from './types';
import { refreshStoredCanvasList } from './events';
import { canvasReviver } from './utils/canvas-reviver';

export const lastUpdate = <Writable<Date>>writable(new Date());

// const CANVAS_STATE_KEY = 'canvas_state';
const CURRENT_KEY = 'canvas_current_key';

let CANVAS_STATE_KEY: string = localStorage.getItem(CURRENT_KEY) || uuid();

const cleanTemplate = (uuid: string) => ({
  uuid,
  blobs: baseLayout,
})

const initialCanvas = (): CanvasPrivateState => {
  const localStorageCanvas = JSON.parse(localStorage.getItem(CANVAS_STATE_KEY), canvasReviver);
  if (localStorageCanvas === null) return cleanTemplate(CANVAS_STATE_KEY);
  const { blobs, title, lastUpdated, uuid } = localStorageCanvas;
  lastUpdate.set(lastUpdated || new Date());
  return { blobs, title, uuid };
};

const canvas = () => {
  const { subscribe, set, update } = writable<CanvasPrivateState>(initialCanvas());
  let currentBlobs;

  const loadCanvas = ({ blobs, lastUpdated, title, uuid }: CanvasState) => {
    CANVAS_STATE_KEY = uuid;
    lastUpdate.set(lastUpdated);
    set({ blobs, uuid, title });
    dispatchEvent(refreshStoredCanvasList);
  };

  const resetState = () => {
    // currentBlobs.filter(b => b.focussed).forEach(b => b.focussed = false);
    const blankCanvas = cleanTemplate(uuid());
    loadCanvas({ ...blankCanvas, title: '', lastUpdated: new Date() });
  }

  subscribe(c => currentBlobs = c.blobs);

  const getBlobId = (index: number) => currentBlobs[index].id;

  return {
    subscribe,
    set,
    update,
    loadCanvas,
    resetState,
    getBlobId,
  };
};

export const canvasState = canvas();

canvasState.subscribe((c: CanvasState) => {
  lastUpdate.set(new Date());
});

export const serialisedCanvas = derived<[Writable<CanvasPrivateState>, Writable<Date>], CanvasState>(
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
  if (!CANVAS_STATE_KEY) return;
  localStorage.setItem(CURRENT_KEY, CANVAS_STATE_KEY);
  localStorage.setItem(CANVAS_STATE_KEY, JSON.stringify(c));
  dispatchEvent(refreshStoredCanvasList);
});

const getLocalCanvases = () => Object.entries(localStorage).filter(([k, v]) => k !== CURRENT_KEY).map(([uuid, v]) => {
  const { title, lastUpdated, blobs } = JSON.parse(v, canvasReviver);
  return { uuid, title, lastUpdated, blobs };
});

export const savedCanvases = readable(getLocalCanvases(), (set) => {
  const handler = () => set(getLocalCanvases());
  addEventListener('odi_canvas_refresh', handler, false);
  return () => removeEventListener('odi_canvas_refresh', handler, false);
});

