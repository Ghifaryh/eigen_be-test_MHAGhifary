/**
 * @swagger
 * components:
 *   schemas:
 *     Members:
 *       type: object
 *       required:
 *         - code
 *         - name
 *       properties:
 *         code:
 *           type: string
 *           description: The unique identifier of the members
 *         name:
 *           type: string
 *           description: Member name
 */

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: The Members manager
 * /members:
 *   get:
 *     summary: Lists all the member
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: The list of the members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Members'
 */

import express from 'express'
import { getMember } from '../controller/MemberController'

const router = express.Router()

router.get('/members', getMember)

export default router