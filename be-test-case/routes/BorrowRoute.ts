import express from 'express'
import { borrowBook, getBorrow, returnBook } from '../controller/BorrowController'

const router = express.Router()

router.get('/borrow', getBorrow)

router.patch('/borrow', (req, res) => {
  const action = req.body.action;
  if (action == 'borrow') {
    borrowBook(req, res)
  } else if (action == 'return') {
    returnBook(req, res)
  } else {
    res.status(400).json({ error: 'Invalid action' })
  }
})

export default router