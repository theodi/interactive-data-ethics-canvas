import { derived, writable, readable, Writable, Readable } from 'svelte/store';
import { v4 as uuid } from 'uuid';
import type { CanvasState, CanvasPrivateState } from './types';
import { refreshStoredCanvasList } from './events';
import { lastUpdate } from './store/last-updated';
import { loadFromLocalStorage, getLocalCanvases } from './utils/local-storage';
import { cleanTemplate } from './utils/clean-template';

const CURRENT_KEY = 'canvas_current_key';

let CANVAS_STATE_KEY: string = localStorage.getItem(CURRENT_KEY) || uuid();

const initialCanvas = (): CanvasPrivateState => {
  const localStorageCanvas = loadFromLocalStorage(CANVAS_STATE_KEY);
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
    stopTracking();
    set({ blobs, uuid, title });
    startTracking();
    dispatchEvent(refreshStoredCanvasList);
  };

  const resetState = () => {
    const blankCanvas = cleanTemplate(uuid());
    loadCanvas({ ...blankCanvas, title: '', lastUpdated: new Date() });
  }

  subscribe(c => currentBlobs = c.blobs);

  const getBlobId = (index: number) => currentBlobs[index].id;

  let track = true;
  const stopTracking = () => track = false;
  const startTracking = () => track = true;

  subscribe(c => {
    if (!track) {
      track = true;
    } else {
      console.log(c);
      lastUpdate.timestamp();
    }
  })

  return {
    subscribe,
    set,
    update,
    loadCanvas,
    resetState,
    getBlobId,
    startTracking,
    stopTracking, 
  };
};

export const canvasState = canvas();

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
  if (!CANVAS_STATE_KEY) return;
  localStorage.setItem(CURRENT_KEY, CANVAS_STATE_KEY);
  localStorage.setItem(CANVAS_STATE_KEY, JSON.stringify(c));
  dispatchEvent(refreshStoredCanvasList);
});

export const savedCanvases = readable(getLocalCanvases(), (set) => {
  const handler = () => set(getLocalCanvases());
  addEventListener('odi_canvas_refresh', handler, false);
  return () => removeEventListener('odi_canvas_refresh', handler, false);
});

