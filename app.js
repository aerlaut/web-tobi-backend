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
const TopicRouter = require('./routes/topic')
const QuestionSetRouter = require('./routes/question_set')

// Initialize app
const app = express()
const DBURI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`

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
app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/dashboard', DashboardRouter)
app.use('/api/question', QuestionRouter)
app.use('/api/file', FileRouter)
app.use('/api/topic', TopicRouter)
app.use('/api/question_set', QuestionSetRouter)

app.listen(process.env.APP_PORT, () => {
	console.log(DBURI)
	console.log(`App listening at http://localhost:${process.env.APP_PORT}`)
})
