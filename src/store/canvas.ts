import { writable } from 'svelte/store';
import type { CanvasPrivateState } from '../types';

import { initialCanvas } from '../utils/initial-canvas';

const canvas = () => {
  const { subscribe, set, update } = writable<CanvasPrivateState>(initialCanvas());

  let currentBlobs;
  subscribe(c => currentBlobs = c.blobs);

  const getBlobId = (index: number) => currentBlobs[index].id;

  return {
    subscribe,
    set,
    update,
    getBlobId,
  };
};

export const canvasState = canvas();


