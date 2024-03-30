import express from 'express'
import BookRoute from './routes/BookRoute'
import MemberRoute from './routes/MemberRoute'
import BorrowRoute from './routes/BorrowRoute'

const app = express()

const PORT = process.env.PORT || 3000


app.get('/', (req: any, res: any) => {
  res.send('Hello Worldss!')
})

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})

app.use(express.json());
app.use(BookRoute)
app.use(MemberRoute)
app.use(BorrowRoute)