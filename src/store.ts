import { derived, writable, readable, Writable } from 'svelte/store';
import { baseLayout } from './templates/canvas-base';
import { v4 as uuid } from 'uuid';
import type { CanvasState, CanvasPrivateState } from './types';
import { resetEvent } from './events';


// const CANVAS_STATE_KEY = 'canvas_state';
const CURRENT_KEY = 'canvas_current_key';

let CANVAS_STATE_KEY: string = localStorage.getItem(CURRENT_KEY) || uuid();

const cleanTemplate = () => ({
  uuid: CANVAS_STATE_KEY, blobs: baseLayout
})

const initialCanvas = (): CanvasState => {
  const localStorageCanvas = JSON.parse(localStorage.getItem(CANVAS_STATE_KEY));
  return localStorageCanvas || cleanTemplate();
};

const canvas = () => {
  const { subscribe, set, update } = writable<CanvasPrivateState>(initialCanvas());

  const loadCanvas = ({ blobs, uuid }: CanvasState) => {
    set({ blobs, uuid });
  };

  const resetState = () => {
    CANVAS_STATE_KEY = uuid();
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

export const serialisedCanvas = derived<Writable<CanvasPrivateState>, CanvasState>(
  canvasState,
  $s => {
    const uuid = $s.uuid;
    const blobs = $s.blobs.map(({ hovered, focussed, ...blobState }) => blobState);
    return {
      uuid,
      blobs,
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
