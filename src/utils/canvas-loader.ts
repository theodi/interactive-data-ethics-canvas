import { v4 as uuid } from 'uuid';
import { refreshStoredCanvasList } from '../events';
import { canvasState } from '../store/canvas';
import { currentKey } from '../store/current-key';
import { lastUpdate } from '../store/last-updated';
import type { CanvasState } from '../types';
import { cleanTemplate } from './clean-template';
import { loadFromLocalStorage } from './local-storage';

export const loadCanvas = ({ blobs, lastUpdated, title, uuid }: CanvasState) => {
  currentKey.set(uuid);
  canvasState.set({ blobs, uuid, title });
  lastUpdate.set(lastUpdated);
  dispatchEvent(refreshStoredCanvasList);
};

export const loadFromStorage = (uuid: string) => {
  const data = loadFromLocalStorage(uuid);
  loadCanvas(data);
}

export const resetState = () => {
  const blankCanvas = cleanTemplate(uuid());
  loadCanvas({ ...blankCanvas, title: '', lastUpdated: new Date() });
}

