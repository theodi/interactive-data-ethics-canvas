import { tick } from 'svelte';
import { writable, Writable } from 'svelte/store';

const dateStore = () => {
  const { subscribe, set } = <Writable<Date>>writable(new Date());
  let locked = false;

  const lock = async () => {
    locked = true;
    return tick();
  };
  const unlock = async () => {
    locked = false;
    return tick();
  }
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
