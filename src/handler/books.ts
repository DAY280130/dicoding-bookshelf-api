import { nanoid } from 'nanoid';
import { reqHandler, books, Payload } from 'src/model/books.js';

const getBooks: reqHandler = (res, h) => {
  return h.response({
    status: 'success',
    data: { books },
  });
};

const getBook: reqHandler = (req, h) => 'test';

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

const putBook: reqHandler = (req, h) => 'test';

const deleteBook: reqHandler = (req, h) => 'test';

export const BooksHandlers = { getBooks, getBook, postBook, putBook, deleteBook };
