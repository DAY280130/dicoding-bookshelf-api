import { reqHandler, books, Payload } from 'src/model/books.js';

const getBooks: reqHandler = () => 'test';

const getBook: reqHandler = (req, h) => 'test';

const postBook: reqHandler = (req, h) => 'test';

const putBook: reqHandler = (req, h) => 'test';

const deleteBook: reqHandler = (req, h) => 'test';

export const BooksHandlers = { getBooks, getBook, postBook, putBook, deleteBook };
