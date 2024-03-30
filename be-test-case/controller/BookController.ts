import { Books, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

type ErrorResponse = {
  error: string
};

export const getBooks = async (req: Request, res: Response<Books[]>) => {
  try {
    const response = await prisma.books.findMany()
    res.status(200).json(response)
  } catch (err: any) {
    const errorResponse: ErrorResponse = { error: err.message }
    res.status(500).json(errorResponse as unknown as { code: string; title: string; author: string; stock: number; }[])
  }
}

export const getBookByCode = async (req: Request, res: Response) => {
  try {
    const response = await prisma.books.findUnique({
      where: {
        code: String(req.params.code)
      }
    })
    res.status(200).json(response)
  } catch (err: any) {
    res.status(404).json({ msg: err.message })
  }
}

export const updateBook = async (req: Request, res: Response) => {
  const { stock } = req.body
  try {
    const book = await prisma.books.update({
      where: {
        code: String(req.params.code)
      },
      data: {
        stock: stock
      }
    })
    res.status(200).json(book)
  } catch (err: any) {
    res.status(400).json({ msg: err.message })
  }
}