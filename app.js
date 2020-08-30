// Load .env
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Import routes
const IndexRouter = require('./routes/index')
const UserRouter = require('./routes/user')
const AuthRouter = require('./routes/auth')
const DashboardRouter = require('./routes/dashboard')
const QuestionRouter = require('./routes/question')
const FileRouter = require('./routes/file')

// Initialize app
const app = express()
const DBURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose
	.connect(DBURI, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.catch((err) => console.error(err))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static('public'))

// app.use('/', IndexRouter)
app.use('/auth', AuthRouter)
app.use('/user', UserRouter)
app.use('/dashboard', DashboardRouter)
app.use('/question', QuestionRouter)
app.use('/file', FileRouter)

app.listen(process.env.APP_PORT, () => {
	console.log(`App listening at http://localhost:${process.env.APP_PORT}`)
})
