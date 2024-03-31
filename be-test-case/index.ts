import express from 'express'
import BookRoute from './routes/BookRoute'
import MemberRoute from './routes/MemberRoute'
import BorrowRoute from './routes/BorrowRoute'

import swaggerjsdoc from 'swagger-jsdoc'
import swaggerui from 'swagger-ui-express'

const app = express()

const PORT = process.env.PORT || 3000


app.get('/', (req: any, res: any) => {
  res.send('Hello Worldss!')
})

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Eigen BE Test - API Documentation by MHAG",
      version: "1.0",
      description: "API Documentation for Eigen BE Test",
      contact: {
        name: "Gip",
        url: "https://ghifaryh.github.io/portfolio",
        email: "mhghifaryy@gmail.com",
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      },
    ]
  },
  apis: ['./routes/*.ts']
}

const spacs = swaggerjsdoc(options)

app.use('/api-docs', swaggerui.serve, swaggerui.setup(spacs))

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})

app.use(express.json());
app.use(BookRoute)
app.use(MemberRoute)
app.use(BorrowRoute)