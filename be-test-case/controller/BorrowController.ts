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

export const borrowBook = async (req: Request, res: Response) => {
  const { memberCode, bookCode } = req.body

  try {
    const book = await prisma.books.findUnique({
      where: {
        code: bookCode
      }
    })

    if (!book || book.stock <= 0) {
      return res.status(400).json({ error: 'Buku tidak tersedia / sedang dipinjam' })
    }

    const borrowedBooksCount = await prisma.borrow.count({
      where: {
        memberCode: memberCode,
        returnedAt: null
      }
    })

    if (borrowedBooksCount >= 2) {
      return res.status(400).json({ error: 'Member telah meminjam 2 buku ' })
    }

    await prisma.books.update({
      where: {
        code: bookCode
      },
      data: {
        stock: book.stock - 1
      }
    })

    const borrowedBook = await prisma.borrow.create({
      data: {
        memberCode: memberCode,
        bookCode: bookCode,
        borrowedAt: new Date()
      }
    })

    res.status(200).json(borrowedBook)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export const returnBook = async (req: Request, res: Response) => {
  const { memberCode, bookCode } = req.body

  try {
    const borrowedBook = await prisma.borrow.findFirst({
      where: {
        memberCode: memberCode,
        bookCode: bookCode,
        returnedAt: null
      }
    })

    if (!borrowedBook) {
      return res.status(400).json({ error: 'Peminjaman buku tidak ditemukan' })
    }

    const returnedBook = await prisma.borrow.update({
      where: {
        id: borrowedBook.id
      },
      data: {
        returnedAt: new Date()
      }
    })

    await prisma.books.update({
      where: {
        code: returnedBook.bookCode
      },
      data: {
        stock: {
          increment: 1
        }
      }
    })

    res.status(200).json(returnedBook)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}
