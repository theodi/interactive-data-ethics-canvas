import { derived, writable, readable, Writable } from 'svelte/store';
import { baseLayout } from './templates/canvas-base';
import { v4 as uuid } from 'uuid';
import type { CanvasState, CanvasPrivateState } from './types';
import { resetEvent } from './events';

export const lastUpdate = <Writable<Date>>writable(new Date());

// const CANVAS_STATE_KEY = 'canvas_state';
const CURRENT_KEY = 'canvas_current_key';

let CANVAS_STATE_KEY: string = localStorage.getItem(CURRENT_KEY) || uuid();

const cleanTemplate = () => ({
  uuid: CANVAS_STATE_KEY, blobs: baseLayout
})

/**
 * JSON reviver function to inflate lastUpdated to JS Date object 
 * @param key 
 * @param value 
 * @returns 
 */
const canvasReviver = (key, value) => {
  if (key === 'lastUpdated') return new Date(value);
  return value;
}

const initialCanvas = (): CanvasPrivateState => {
  const localStorageCanvas = JSON.parse(localStorage.getItem(CANVAS_STATE_KEY), canvasReviver);
  if (localStorageCanvas === undefined) return cleanTemplate();
  const { blobs, title, lastUpdated, uuid } = localStorageCanvas;
  lastUpdate.set(lastUpdated);
  return { blobs, title, uuid };
};

const canvas = () => {
  const { subscribe, set, update } = writable<CanvasPrivateState>(initialCanvas());

  const loadCanvas = ({ blobs, lastUpdated, title, uuid }: CanvasState) => {
    lastUpdate.set(lastUpdated);
    set({ blobs, uuid, title });
  };

  const resetState = () => {
    CANVAS_STATE_KEY = uuid();
    lastUpdate.set(new Date());
    set(cleanTemplate());
    dispatchEvent(resetEvent);
  }

  let blobs;
  subscribe(c => blobs = c.blobs);

  const getBlobId = (index: number) => blobs[index].id;

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
    const blobs = $s[0].blobs.map(({ hovered, focussed, dimmed, ...blobState }) => blobState);
    return {
      uuid,
      blobs,
      lastUpdated,
      title,
    }
  }
);

serialisedCanvas.subscribe(c => {
  localStorage.setItem(CURRENT_KEY, CANVAS_STATE_KEY);
  localStorage.setItem(CANVAS_STATE_KEY, JSON.stringify(c));
});

const getLocalCanvases = () => Object.entries(localStorage).filter(([k, v]) => k !== CURRENT_KEY).map(([k, v]) => k);

export const savedCanvases = readable(getLocalCanvases(), (set) => {
  const handler = () => set(getLocalCanvases());
  addEventListener('odi_canvasreset', handler, false);
  return () => removeEventListener('odi_canvasreset', handler, false);
});
