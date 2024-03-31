/**
 * @swagger
 * components:
 *   schemas:
 *     Books:
 *       type: object
 *       required:
 *         - code
 *         - title
 *         - author
 *         - stock
 *       properties:
 *         code:
 *           type: string
 *           description: The unique identifier of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The book writer
 *         stock:
 *           type: integer
 *           description: To check if the book is available
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books manager
 * /books:
 *   get:
 *     summary: Lists all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Books'
 * /books/{code}:
 *   get:
 *     summary: Get the book by code
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The book code
 *     responses:
 *       200:
 *         description: The book response by code
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: The book was not found
 *   patch:
 *    summary: Update the book stock by the book code
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: code
 *        required: true
 *        description: The book book code
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              stock:
 *                type: integer
 *                minimum: 0
 *                description: Jumlah stok baru untuk buku yang akan diperbarui.
 *    responses:
 *      200:
 *        description: The book is updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Books'
 *      404:
 *        description: The book is not found
 *      500:
 *        description: Some error happened
 */
import express from 'express'
import { getBookByCode, getBooks, updateBook } from '../controller/BookController'

const router = express.Router()

router.get('/books', getBooks)
router.get('/books/:code', getBookByCode)

router.patch('/books/:code', updateBook)

export default router
