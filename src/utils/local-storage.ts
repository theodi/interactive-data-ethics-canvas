import { refreshStoredCanvasList } from '../events';
import { canvasState } from '../store';
import { canvasReviver } from './canvas-reviver';
import type { CanvasState } from '../types';

export const loadFromLocalStorage = (uuid: string) => JSON.parse(localStorage.getItem(uuid), canvasReviver);
export const saveToLocalStorage = (uuid: string, canvas: CanvasState) => localStorage.setItem(uuid, JSON.stringify(canvas));

export const load = (uuid: string) => {
  const data = loadFromLocalStorage(uuid);
  canvasState.loadCanvas(data);
}

export const renameSavedCanvas = (uuid: string, newName: string) => {
  const data = loadFromLocalStorage(uuid);
  data.title = newName;
  data.lastUpdated = new Date();
  saveToLocalStorage(uuid, data);
  dispatchEvent(refreshStoredCanvasList);
}

export const deleteCanvas = (uuid: string) => {
  localStorage.removeItem(uuid);
  dispatchEvent(refreshStoredCanvasList);
}
