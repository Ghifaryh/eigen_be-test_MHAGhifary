import { Borrow, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

type ErrorResponse = {
  error: string
}

export const getBorrow = async (req: Request, res: Response<Borrow[]>) => {
  try {
    const response = await prisma.borrow.findMany()
    res.status(200).json(response)
  } catch (err: any) {
    const errorResponse: ErrorResponse = { error: err.message }
    res.status(500).json(errorResponse as unknown as { id: number; memberCode: string; bookCode: string; borrowedAt: Date; returnedAt: Date; }[]);
  }
}
