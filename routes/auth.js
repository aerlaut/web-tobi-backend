const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const winston = require('winston')
const jwtAuth = require('../middleware/auth')
const { body, validationResult, sanitizeBody } = require('express-validator')

// Controllers
const AuthController = require('../controllers/AuthController')

// Login
router.post(
  '/login',
  [
    body('username').not().isEmpty().isLength({ min: 5 }),
    body('password').not().isEmpty().isLength({ min: 5 }),
  ],
  AuthController.login
)

// Logout
router.get('/logout')

module.exports = router
