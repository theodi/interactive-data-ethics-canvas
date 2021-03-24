import { writable } from 'svelte/store';
import type { AreaIdentifier } from '../types';

const filterState = () => {
  const { subscribe, set, update } = writable<{ [key: string]: boolean }>({});

  const reset = () => set({});
  const setState = (key: AreaIdentifier, state: boolean) => update(x => ({ ...x, [key]: state }))
  return {
    subscribe,
    reset,
    setState,
  }
}

export const filtered = filterState();