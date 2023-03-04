import { Lifecycle, ReqRefDefaults } from '@hapi/hapi';

export interface Payload {
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  reading: boolean;
}

export interface Book extends Payload {
  id: string;
  finished: boolean;
  insertedAt: string;
  updatedAt: string;
}

export type reqHandler = Lifecycle.Method<ReqRefDefaults, Lifecycle.ReturnValue<ReqRefDefaults>>;

export const books: Book[] = [];
