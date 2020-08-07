let express = require('express')
let router = express.Router()

// Home page route
router.get('/', (req, res) => {
  res.send('test')
})
