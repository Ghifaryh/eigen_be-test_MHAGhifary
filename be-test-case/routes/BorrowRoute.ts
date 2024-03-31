/**
 * @swagger
 * components:
 *   schemas:
 *     Borrow:
 *       type: object
 *       required:
 *         - id
 *         - memberCode
 *         - bookCode
 *         - borrowedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the borrows
 *         memberCode:
 *           type: string
 *           description: The code (id) of the member
 *         bookCode:
 *           type: string
 *           description: The code (id) of tthe book
 *         borrowedAt:
 *           type: string
 *           format: date
 *           description: The date book is borrowed from
 *         returnedAt:
 *           type: string
 *           format: date
 *           description: The date book is returned from
 */

/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: The borrows manager
 * /borrow:
 *   get:
 *     summary: Lists all the borrows
 *     tags: [Borrow]
 *     responses:
 *       200:
 *         description: The list of the borrows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Borrow'
 *   patch:
 *    summary: Borrow or return a book
 *    tags: [Borrow]
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [borrow, return]
 *                 description: Action to perform (borrow or return)
 *               memberCode:
 *                 type: string
 *                 description: Member code for borrowing/returning book
 *               bookCode:
 *                type: string
 *                description: Book code for borrowing/returning book
 *    responses:
 *      200:
 *        description: The borrow is updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Borrow'
 *      404:
 *        description: The book is not found
 *      500:
 *        description: Some error happened
 */

import express from 'express'
import { borrowBook, getBorrow, returnBook } from '../controller/BorrowController'

const router = express.Router()

router.get('/borrow', getBorrow)

router.patch('/borrow', (req, res) => {
  const action = req.body.action
  if (action == 'borrow') {
    borrowBook(req, res)
  } else if (action == 'return') {
    returnBook(req, res)
  } else {
    res.status(400).json({ error: 'Invalid action' })
  }
})

export default router