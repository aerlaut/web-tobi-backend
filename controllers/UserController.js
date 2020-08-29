const User = require('../models/User')
const Counter = require('../models/Counter')

const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

// List all users
exports.index = (req, res) => {
	User.find((err, docs) => {
		if (err) {
			return res.status(500).json(err)
		}

		return res.json({
			status: 'ok',
			message: 'Users fetched',
			data: docs,
		})
	})
}

// Show user
exports.show = (req, res) => {
	let id = null

	if (req.method === 'GET') {
		id = req.params.id
	} else if (req.method === 'POST') {
		console.log('here')
		id = req.body.id
	}

	console.log('asking for user ID')
	console.log(req.method)
	console.log(id)

	// If still not updated
	if (!id) return res.status(403).json({ errors: 'Request forbidden' })

	// Get user details according to ID
	User.findOne({ id: id }, (err, doc) => {
		if (err) {
			return res.status(500).json(err)
		}

		return res.json({
			status: 'ok',
			message: 'User fetched',
			data: doc,
		})
	})
}

// Create new user
exports.store = (req, res) => {
	const errors = validationResult(req)

	// Validation
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	async function create() {
		let counter = new Counter()

		// Payload
		let payload = req.body
		payload.id = await counter.getNewId('User')
		payload.createdAt = Date.now()
		payload.updatedAt = Date.now()
		payload.password = bcrypt.hashSync(req.body.password, 10)

		let user = new User(payload)

		return user.save()
	}

	// Create user
	create()
		.then((doc) => {
			return res.json({
				status: 'ok',
				message: 'Resource created',
				data: doc,
			})
		})
		.catch((err) => {
			if (err.code == 11000 && err.keyPattern.id) {
				let field = Object.keys(err.keyPattern)[0]

				return res.status(202).json({
					status: 'not_unique',
					message: `${field} is already used`,
				})
			}

			return res.status(500).json(err)
		})
}

// Update user
exports.update = (req, res) => {
	const { id } = req.params

	// Payload
	let payload = req.body
	payload.updatedAt = Date.now()
	if (req.body.hasOwnProperty('password')) {
		// Update password
		payload.password = bcrypt.hashSync(req.body.password, 10)
	}

	User.findByIdAndUpdate(req.body._id, payload, (err, doc) => {
		if (err) {
			return res.status(500).json(err)
		}

		return res.json({
			status: 'ok',
			message: `Question ${id} updated`,
		})
	})
}

exports.destroy = (req, res) => {}
