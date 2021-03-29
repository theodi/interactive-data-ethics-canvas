/**
 * JSON reviver function to inflate lastUpdated to JS Date object 
 * @param key 
 * @param value 
 * @returns 
 */
 export const canvasReviver = (key, value) => {
  if (key === 'lastUpdated') return new Date(value);
  if (key === 'title' && value === undefined) return '';
  return value;
}

