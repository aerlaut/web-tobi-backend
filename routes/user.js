const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const winston = require('winston')

const { body, validationResult, sanitizeBody } = require('express-validator')

// Require controller modules
const UserController = require('../controllers/UserController')
const jwtAuth = require('../middleware/auth')

// Get
router.get('/', jwtAuth, UserController.index)

// Store
router.post(
	'/create',
	[
		body('username').trim().not().isEmpty().isLength({ min: 5 }).escape(),
		body('fullname').trim().not().isEmpty().escape(),
		body('email').trim().isEmail().not().isEmpty().escape(),
		body('password').trim().not().isEmpty().isLength({ min: 6 }).escape(),
	],
	UserController.store
)

// Read
router.post('/profile', UserController.show)
router.get('/:id', UserController.show)

// Update
router.get('/:id/edit', jwtAuth, UserController.show)
router.post(
	'/:id/edit',
	[
		body('username').trim().not().isEmpty().isLength({ min: 5 }).escape(),
		body('fullname').trim().not().isEmpty().escape(),
		body('email').trim().isEmail().not().isEmpty().escape(),
		jwtAuth,
	],
	UserController.update
)

// Delete
// router.post('/:id/delete', jwtAuth, UserController.destroy)

module.exports = router
