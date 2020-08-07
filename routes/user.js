const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const winston = require('winston')

const { body, validationResult, sanitizeBody } = require('express-validator')

// Requrie controller modules
const UserController = require('../controllers/UserController')
const jwtAuth = require('../middleware/auth')

// Create
router.get('/create', UserController.index)

// Store
router.post(
  '/create',
  [
    jwtAuth,
    body('fullname').trim().not().isEmpty(),
    body('username').trim().not().isEmpty().isLength({ min: 3 }),
    body('email').trim().isEmail().not().isEmpty(),
    body('password')
      .trim()
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 6 }),
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
