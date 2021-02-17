export enum Group {
  KNOW = 'KNOW',
  EXPLORE = 'EXPLORE',
  PLAN = 'PLAN',
  INTEGRATE = 'INTEGRATE'
}

export type CanvasState = {
  uuid: string;
  blobs: BlobState[]
}

export type BlobState = {
  group: Group;
  title: string;
  description: string;
  row: number;
  column: number;
  content?: UserContent;
}

type BlobUiState = {
  hovered?: boolean;
  focussed?: boolean;
  dimmed?: boolean;
}

export type CanvasPrivateState = {
  uuid: string;
  blobs: (BlobState & BlobUiState)[]
}

export type UserContent = string;
