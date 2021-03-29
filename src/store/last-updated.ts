import { writable, Writable } from 'svelte/store';

const dateStore = () => {
  const { subscribe, set } = <Writable<Date>>writable(new Date());

  return {
    subscribe,
    set,
    timestamp: () => set(new Date())
  }
};

export const lastUpdate = dateStore();
