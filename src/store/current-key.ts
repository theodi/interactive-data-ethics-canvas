import { writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';

export const CURRENT_KEY = 'canvas_current_key';

export const currentKey = writable(localStorage.getItem(CURRENT_KEY) || uuid());

currentKey.subscribe(k => localStorage.setItem(CURRENT_KEY, k));