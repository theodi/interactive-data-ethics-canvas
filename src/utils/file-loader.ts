import { canvasReviver } from './canvas-reviver';

export async function loadFile(file: File) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsText(file);
    reader.onload = () => {
      const json = JSON.parse(reader.result.toString(), canvasReviver);
      console.log(json);
      resolve(json);
    };
    reader.onerror = reject;
  });
}