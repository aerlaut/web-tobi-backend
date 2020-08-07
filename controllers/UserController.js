var User = require('../models/User')

exports.index = (req, res) => {
  res.send('test')
}

exports.store = (req, res) => {
  User.create(
    {
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    (err, obj) => {
      if (err) return res.status(500).send(err)
      res.send(obj)
    }
  )
}