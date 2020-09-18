const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const jwtAuth = require('../middleware/auth')

const TopicController = require('../controllers/TopicController')

// Topics page routes
router.get('/', jwtAuth, TopicController.index)
router.post('/', jwtAuth, TopicController.update)

module.exports = router
