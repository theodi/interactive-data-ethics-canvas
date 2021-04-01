import { currentKey } from '../store/current-key';
import { lastUpdate } from '../store/last-updated';
import type { CanvasPrivateState } from '../types';
import { cleanTemplate } from './clean-template';
import { loadFromLocalStorage } from './local-storage';

let CANVAS_STATE_KEY: string;
currentKey.subscribe(c => CANVAS_STATE_KEY = c);

export const initialCanvas = (): CanvasPrivateState => {
  const localStorageCanvas = loadFromLocalStorage(CANVAS_STATE_KEY);
  if (localStorageCanvas === null) return cleanTemplate(CANVAS_STATE_KEY);
  const { blobs, title, lastUpdated, uuid } = localStorageCanvas;
  lastUpdate.set(lastUpdated || new Date());
  return { blobs, title, uuid };
};
