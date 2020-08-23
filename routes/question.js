const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const winston = require('winston')
const jwtAuth = require('../middleware/auth')

const QuestionController = require('../controllers/QuestionController')

// Question page routes
router.get('/', jwtAuth, QuestionController.index)
router.get('/:id', jwtAuth, QuestionController.show)
router.post('/create', jwtAuth, QuestionController.store)

module.exports = router
