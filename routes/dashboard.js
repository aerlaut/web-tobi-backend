const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const winston = require('winston')
const jwtAuth = require('../middleware/auth')

const DashboardController = require('../controllers/DashboardController')

// Home page route
router.get('/', jwtAuth, DashboardController.show)

module.exports = router
