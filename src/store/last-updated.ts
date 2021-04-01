import { writable, Writable } from 'svelte/store';

const dateStore = () => {
  const { subscribe, set } = <Writable<Date>>writable(new Date());
  let locked = false;

  const lock = () => locked = true;
  const unlock = () => locked = false;
  const timestamp = () => { if (!locked) set(new Date()); };

  return {
    subscribe,
    set,
    timestamp,
    lock,
    unlock,
  }
};

export const lastUpdate = dateStore();
