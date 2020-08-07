// Load dotenv
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const mongoose = require('mongoose')

// Import routes
const IndexRouter = require('./routes/index')
const UserRouter = require('./routes/user')

// Initialize app
const app = express()
const port = 3001

const DBURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose
  .connect(DBURI, { useNewUrlParser: true })
  .catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', IndexRouter)
app.use('/user', UserRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${process.env.APP_PORT}`)
})
