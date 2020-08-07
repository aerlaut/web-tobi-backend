const express = require('express')
const mongoose = require('mongoose')

// Import routes
const IndexRouter = required('./routes/index')
const UserRouter = required('./routes/users')

import User from './models/User'

// Initialize app
const app = express()
const port = 3001

const DBURI = `mongodb://localhost:27017/oltobi`

mongoose
  .connect(DBURI, { useNewUrlParser: true })
  .catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', IndexRouter)
app.use('/user', UsersRouter)

app.post('/user', (req, res) => {
  req
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
