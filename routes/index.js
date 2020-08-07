const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const winston = require('winston')

// Home page route
router.get('/', (req, res) => {
  res.send(`
    DB_HOST : ${process.env.DB_HOST},
    DB_PORT : ${process.env.DB_PORT},
    DB_NAME : ${process.env.DB_NAME},
  `)
})

module.exports = router
