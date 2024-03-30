import express from 'express'
import { getBorrow } from '../controller/BorrowController'

const router = express.Router()

router.get('/borrow', getBorrow)

export default router