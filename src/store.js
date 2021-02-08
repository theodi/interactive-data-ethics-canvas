import { writable } from 'svelte/store';
import { baseLayout } from './templates/canvas-base';
import { v4 as uuid } from 'uuid';

const canvas = () => {
  const { subscribe, set, update } = writable({ blobs: baseLayout });
  const setId = () =>
    update((s) => {
      s.uuid = uuid();
      return s;
    });

  setId();

  return {
    subscribe,
    set,
    update,
  };
};

export const canvasState = canvas();
