import type { Group } from './Group';

export type Blob = {
  group: Group;
  title: string;
  description: string;
  row: number;
  column: number;
  content?: string;
}
