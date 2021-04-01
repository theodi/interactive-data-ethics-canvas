import { writable } from 'svelte/store';
import type { CanvasPrivateState } from '../types';

import { lastUpdate } from './last-updated';

import { initialCanvas } from '../utils/initial-canvas';

const canvas = () => {
  const { subscribe, set, update } = writable<CanvasPrivateState>(initialCanvas());

  let currentBlobs;
  subscribe(c => currentBlobs = c.blobs);

  const getBlobId = (index: number) => currentBlobs[index].id;

  let track = true;
  const stopTracking = () => track = false;
  const startTracking = () => track = true;

  subscribe(c => {
    if (!track) {
      track = true;
    } else {
      lastUpdate.timestamp();
    }
  })

  return {
    subscribe,
    set,
    update,
    getBlobId,
    startTracking,
    stopTracking, 
  };
};

export const canvasState = canvas();


