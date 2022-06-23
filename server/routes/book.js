import express from 'express';

import { getBooks, getBooksBySearch, getBook, createBook, updateBook, likeBook, deleteBook } from '../controllers/books.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getBooksBySearch);
router.get('/', getBooks);
router.get('/:id', getBook);

router.post('/', auth,  createBook);
router.patch('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);
router.patch('/:id/likeBook', auth, likeBook);

export default router;