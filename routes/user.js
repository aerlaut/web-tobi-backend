const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const winston = require('winston')

const { body, validationResult, sanitizeBody } = require('express-validator')

// Require controller modules
const UserController = require('../controllers/UserController')
const jwtAuth = require('../middleware/auth')

// Get
router.get('/', (req, res) => {
  return res.send('reply')
})

// Create
router.get('/create', UserController.index)

// Store
router.post(
  '/create',
  [
    body('fullname').trim().not().isEmpty().escape(),
    body('username').trim().not().isEmpty().isLength({ min: 5 }).escape(),
    body('email').trim().isEmail().not().isEmpty().escape(),
    body('password').trim().not().isEmpty().isLength({ min: 6 }).escape(),
  ],
  UserController.store
)

// Read
router.get('/:id', (req, res) => {
  res.send('test')
})

// Update

// Delete

module.exports = router
