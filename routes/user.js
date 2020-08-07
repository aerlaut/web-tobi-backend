let express = require('express')
let router = express.Router()

// Requrie controller modules
let UserController = require('../controllers/UserController')

// Create
router.get('/create', UserController.index)

// Read
router.get('/:id', (req, res) => {
  res.send('test')
})

// Update

// Delete

module.exports = router
