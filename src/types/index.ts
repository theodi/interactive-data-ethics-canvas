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

export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum Choice {
  UNSET = 'UNSET',
  YES = 'YES',
  NO = 'NO',
}  

export type AreaIdentifier = 'sources' | 'rights' | 'limitations' | 'ethical-legislative' | 'reasons' | 'positive-effects' | 'negative-effects' | 'mitigations' | 'engaging' | 'communicating' | 'openness' | 'sharing' | 'implementation' | 'review' | 'actions';

export interface CanvasState {
  uuid: string;
  title: string;
  lastUpdated: Date;
  blobs: BlobState[];
}

export interface Action {
  title: string;
  priority: Priority;
  responsibility: string;
}

export interface DataSource {
  title: string;
  description : string; 
  url: string;
  owner: string 
}

export interface BlobState {
  group: Group;
  id: AreaIdentifier;
  title: string;
  description: string;
  editor: string;
  row: number;
  column: number;
  content: UserContent[];
  status: Status;
  notes: string;
}

export interface CanvasPrivateState {
  uuid: string;
  blobs: BlobState[]
  title?: string;
}

export type UserContent = string | string[] | DataSource[] | Action[];
