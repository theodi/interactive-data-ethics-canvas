import { readable } from 'svelte/store';
import { getLocalCanvases } from '../utils/local-storage';

export const savedCanvases = readable(getLocalCanvases(), (set) => {
  const handler = () => set(getLocalCanvases());
  addEventListener('odi_canvas_refresh', handler, false);
  return () => removeEventListener('odi_canvas_refresh', handler, false);
});
