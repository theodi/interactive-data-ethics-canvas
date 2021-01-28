import { writable } from "svelte/store";

const baseLayout = [
  { group: 'know', title: 'GROUP TITLE', row: 0, column: 0 },
  { group: 'know', title: 'GROUP TITLE', row: 0, column: 1 },
  { group: 'know', title: 'GROUP TITLE', row: 0, column: 2 },
  { group: 'know', title: 'GROUP TITLE', row: 0, column: 3 },

  { group: 'explore', title: 'GROUP TITLE', row: 1, column: 0 },
  { group: 'explore', title: 'GROUP TITLE', row: 1, column: 1 },
  { group: 'explore', title: 'GROUP TITLE', row: 1, column: 2 },
  { group: 'explore', title: 'GROUP TITLE', row: 1, column: 3 },

  { group: 'plan', title: 'GROUP TITLE', row: 2, column: 0 },
  { group: 'plan', title: 'GROUP TITLE', row: 2, column: 1 },
  { group: 'plan', title: 'GROUP TITLE', row: 2, column: 2 },
  { group: 'plan', title: 'GROUP TITLE', row: 2, column: 3 },

  { group: 'integrate', title: 'GROUP TITLE', row: 0, column: 4 },
  { group: 'integrate', title: 'GROUP TITLE', row: 1, column: 4 },
  { group: 'integrate', title: 'GROUP TITLE', row: 2, column: 4 },
];

export const areas = writable(baseLayout);
