export enum Group {
  KNOW = 'KNOW',
  EXPLORE = 'EXPLORE',
  PLAN = 'PLAN',
  INTEGRATE = 'INTEGRATE'
}

export enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  FOR_REVIEW = 'FOR_REVIEW',
  COMPLETE = 'COMPLETE',
}

export interface CanvasState {
  uuid: string;
  blobs: BlobState[]
}

export interface DataSource {
  title: string;
  description : string; 
  url: string;
  owner: string 
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
  status: Status;
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

export type UserContent = string | string[] | DataSource[];