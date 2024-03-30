import { Members, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

type ErrorResponse = {
  error: string
};

export const getMember = async (req: Request, res: Response<Members[]>) => {
  try {
    const response = await prisma.members.findMany()
    res.status(200).json(response)
  } catch (err: any) {
    const errorResponse: ErrorResponse = { error: err.message }
    res.status(500).json(errorResponse as unknown as { code: string; name: string }[])
  }
}