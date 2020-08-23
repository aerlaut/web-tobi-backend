const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { validationResult } = require('express-validator')

// Functions
function generateAccessToken(username, userId) {
	const expiresIn = 60 * 60 * 24 * 7 // seconds * minutes * hours * days

	return jwt.sign(
		{ username: username, _id: userId },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: `{expiresIn}s`, // seconds
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
							user: user,
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
