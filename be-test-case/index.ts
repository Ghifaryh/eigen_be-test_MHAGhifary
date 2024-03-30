const express = require('express')
const app = express()

app.get('/', (req: any, res: any) => {
  res.send('Hello Worldss!')
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})