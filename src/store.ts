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
    // if uuid defined set id to that
    // set the blobs to the passed in blobs
    // use the set function to completely override state
  }

  function serialiseCanvas(): CanvasDefinition {
    // construct a serialised only including state that we want to save.
    // e.g. each blob should not include hovered, focused, etc;
    // state is available as `this`
    return;
  }

  return {
    subscribe,
    set,
    update,
    loadCanvas,
    serialise: serialiseCanvas,
  };
};

export const canvasState = canvas();
