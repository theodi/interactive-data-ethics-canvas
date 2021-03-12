export enum Group {
  KNOW = 'KNOW',
  EXPLORE = 'EXPLORE',
  PLAN = 'PLAN',
  INTEGRATE = 'INTEGRATE'
}

export interface CanvasState {
  uuid: string;
  blobs: BlobState[]
}

export interface BlobState {
  group: Group;
  id: string;
  title: string;
  description: string;
  editor: string;
  row: number;
  column: number;
  content?: UserContent[];
  notes?: string;
}

interface BlobUiState {
  hovered?: boolean;
  focussed?: boolean;
  dimmed?: boolean;
}

export interface CanvasPrivateState {
  uuid: string;
  blobs: (BlobState & BlobUiState)[]
}

export type UserContent = string | string[];
