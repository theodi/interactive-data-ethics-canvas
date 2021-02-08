import { writable } from 'svelte/store';
import { baseLayout } from './templates/canvas-base';

const canvas = () => {
  const { subscribe, set, update } = writable({ blobs: baseLayout });

  return {
    subscribe,
    set,
    update,
  };
};

export const canvasState = canvas();
