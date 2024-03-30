import express from 'express'
import { getMember } from '../controller/MemberController'

const router = express.Router()

router.get('/members', getMember)

export default router