import { ServerRoute, ReqRefDefaults } from '@hapi/hapi';
import { BooksRoutes } from './books.js';

const path = '/';

export const routes: ServerRoute<ReqRefDefaults>[] = [
  ...BooksRoutes,
  {
    method: '*',
    path: `${path}{any*}`,
    handler: (req, h) => {
      return h.response('Halaman tidak ditemukan').code(404);
    },
  },
];
