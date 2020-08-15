const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

exports.index = (req, res) => {
  res.send('test')
}

exports.store = (req, res) => {
  const errors = validationResult(req)

  // Validation
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  User.create(
    {
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    },
    (err, obj) => {
      if (err) {
        // Check if error due to unique username

        if (
          err.code == 11000 &&
          (err.keyPattern.username || err.keyPattern.email)
        ) {
          let field = Object.keys(err.keyPattern)[0]

          return res.status(202).json({
            status: 'not_unique',
            field: field,
            message: `${field} is already used`,
          })
        }

        return res.status(500).json(err)
      }

      return res.json({
        status: 'ok',
        message: 'User created',
      })
    }
  )
}
