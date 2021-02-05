import { writable } from 'svelte/store';
import { baseLayout } from './templates/canvas-base';

const blobStore = (l) => {
  const { subscribe, set, update } = writable(l);

  function setProp(property, value) {
    update((n) => {
      n[property] = value;
      return n;
    });
  }

  return {
    subscribe,
    set,
    update,
    setProp,
  };
};

export const areas = baseLayout.map(blobStore);
