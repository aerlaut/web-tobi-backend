const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const winston = require('winston')
const jwtAuth = require('../middleware/auth')

const QuestionSetController = require('../controllers/QuestionSetController')

// Question page routes
router.get('/', jwtAuth, QuestionSetController.index)
router.post('/create', jwtAuth, QuestionSetController.store)
router.get('/:id', jwtAuth, QuestionSetController.show)
router.get('/:id/edit', jwtAuth, QuestionSetController.show)
router.post('/:id/edit', jwtAuth, QuestionSetController.update)

module.exports = router
