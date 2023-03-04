import { ServerRoute, ReqRefDefaults } from '@hapi/hapi';
import { BooksHandlers } from '../handler/books.js';

const path = '/Books';

export const BooksRoutes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'GET',
    path,
    handler: BooksHandlers.getBooks,
  },
  {
    method: 'GET',
    path: `${path}/{bookId}`,
    handler: BooksHandlers.getBook,
  },
  {
    method: 'POST',
    path,
    handler: BooksHandlers.postBook,
  },
  {
    method: 'PUT',
    path: `${path}/{bookId}`,
    handler: BooksHandlers.putBook,
  },
  {
    method: 'DELETE',
    path: `${path}/{bookId}`,
    handler: BooksHandlers.deleteBook,
  },
];
