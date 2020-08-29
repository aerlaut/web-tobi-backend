const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Counter = require('../models/Counter')

const { validationResult } = require('express-validator')

// Functions
function generateAccessToken(username, userId) {
	return jwt.sign(
		{ username: username, _id: userId },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: `7d`, // seconds
		}
	)
}

exports.login = (req, res) => {
	const errors = validationResult(req)

	// Validation
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	User.findOne(
		// find user with username
		{
			username: req.body.username,
		},
		(err, user) => {
			if (err) {
				console.error(err)
				return res.status(500).json({ errors: err })
			} else {
				// Wrong username
				if (!user) {
					return res.json({
						status: 'fail',
						message: 'Wrong username or password',
					})
				}

				// check password
				if (bcrypt.compareSync(req.body.password, user.password)) {
					return res.json({
						status: 'ok',
						data: {
							token: generateAccessToken(user.username, user._id),
							username: user.username,
							role: user.role,
							id: user.id,
						},
					})
				} else {
					// Wrong password
					return res.json({
						status: 'fail',
						message: 'Wrong username or password',
					})
				}
			}
		}
	)
}

exports.logout = (req, res) => {}
