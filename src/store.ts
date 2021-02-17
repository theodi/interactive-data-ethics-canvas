import { writable } from 'svelte/store';
import { baseLayout } from './templates/canvas-base';
import { v4 as uuid } from 'uuid';
import type { Canvas } from './types/canvas';
import type { Blob } from './types/blob';

interface CanvasDefinition {
  uuid?: string;
  blobs: Blob[];
}

const canvas = () => {
  const { subscribe, set, update } = writable({ blobs: baseLayout });
  const setId = (id = uuid()) =>
    update((s: Canvas) => {
      s.uuid = id;
      return s;
    });

  setId();

  const loadCanvas = ({ blobs, uuid }: CanvasDefinition) => {
    set({ blobs });
    if (uuid) setId(uuid);
  };

  function serialiseCanvas(state): CanvasDefinition {
    const { uuid, blobs } = state;
    const filteredBlobState = blobs.map(blob => {
      const { hovered, focussed, ...blobState } = blob;
      return blobState;
    });
    return { uuid, blobs: filteredBlobState };
  }

  let serialisedCanvas;

  subscribe(s => {
    serialisedCanvas = serialiseCanvas(s);
    const { uuid, blobs } = serialisedCanvas;
    localStorage.setItem(uuid, JSON.stringify(blobs));
  });

  return {
    subscribe,
    set,
    update,
    loadCanvas,
    serialised: serialisedCanvas,
  };
};

export const canvasState = canvas();
