import type { Blob } from './blob';

export type Canvas = {
  uuid: string;
  title: string;
  blobs: Blob[];
}
