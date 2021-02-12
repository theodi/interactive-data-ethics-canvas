import { writable } from 'svelte/store';
import { baseLayout } from './templates/canvas-base';
import { v4 as uuid } from 'uuid';

interface Blob { }

interface CanvasStore {
  uuid: string;
  blobs: Blob[];
}

const canvas = () => {
  const { subscribe, set, update } = writable({ blobs: baseLayout });
  const setId = (id = uuid()) =>
    update((s: CanvasStore) => {
      s.uuid = id;
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
