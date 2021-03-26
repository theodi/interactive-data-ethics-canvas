import { BlobState, Status } from '../types';

export function getOverallCanvasStatus(blobs: BlobState[]) {
  const blobStatuses = blobs.map((blob: BlobState) => blob.status.toString());
  for (const status in Status) {
    if (blobStatuses.indexOf(status) > -1) return status;
  }
}
