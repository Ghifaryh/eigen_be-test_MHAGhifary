import express from 'express'
import { getBookByCode, getBooks, updateBook } from '../controller/BookController'
// import bodyParser from 'body-parser'

const router = express.Router()

router.get('/books', getBooks)
router.get('/books/:code', getBookByCode)

// router.use(bodyParser.json());
router.patch('/books/:code', updateBook)

export default router
