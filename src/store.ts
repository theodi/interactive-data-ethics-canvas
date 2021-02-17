import { derived, Readable, writable } from 'svelte/store';
import { baseLayout } from './templates/canvas-base';
import { v4 as uuid } from 'uuid';
import type { CanvasState, CanvasPrivateState } from './types';

const CANVAS_STATE_KEY = 'canvas_state';

const initialCanvas = (): CanvasState => {
  const localStorageCanvas = JSON.parse(localStorage.getItem(CANVAS_STATE_KEY));
  return localStorageCanvas || { uuid: uuid(), blobs: baseLayout };
};

const canvas = () => {
  const { subscribe, set, update } = writable<CanvasPrivateState>(initialCanvas());

  const loadCanvas = ({ blobs, uuid }: CanvasState) => {
    set({ blobs, uuid });
  };

  return {
    subscribe,
    set,
    update,
    loadCanvas,
  };
};

export const canvasState = canvas();

export const serialisedCanvas = derived<Readable<CanvasPrivateState>, CanvasState>(
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
  localStorage.setItem(CANVAS_STATE_KEY, JSON.stringify(c));
})