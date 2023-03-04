import { nanoid } from 'nanoid';
import { reqHandler, books, Payload } from '../model/books.js';

const getBooks: reqHandler = (res, h) => {
  const newBooks = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
  return h.response({
    status: 'success',
    data: { books: newBooks },
  });
};

const getBook: reqHandler = (req, h) => {
  const { bookId } = req.params;

  const book = books.filter(book => book.id === bookId)[0];

  if (!book || book === undefined) {
    return h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
      .code(404);
  }

  return h.response({
    status: 'success',
    data: { book },
  });
};

const postBook: reqHandler = (req, h) => {
  const { author, name, pageCount, publisher, readPage, reading, summary, year } = req.payload as Payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name || name === undefined) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  books.push({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  });

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: `${id}`,
      },
    })
    .code(201);
};

const putBook: reqHandler = (req, h) => {
  const { bookId } = req.params;
  const { author, name, pageCount, publisher, readPage, reading, summary, year } = req.payload as Payload;

  if (!name || name === undefined) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex < 0) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);
  }

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  };

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
    .code(200);
};

const deleteBook: reqHandler = (req, h) => {
  const { bookId } = req.params;

  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex < 0) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);
  }

  books.splice(bookIndex, 1);

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    .code(200);
};

export const BooksHandlers = { getBooks, getBook, postBook, putBook, deleteBook };
