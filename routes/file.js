const express = require('express')
const router = express.Router()
const multer = require('multer')

const upload = multer({ dest: 'storage/' })

const FileController = require('../controllers/FileController')

const jwtAuth = require('../middleware/auth')

router.post('/', jwtAuth, FileController.index)
router.post('/store', [jwtAuth, upload.single('image')], FileController.store)
router.post('/show', jwtAuth, FileController.show)
router.post('/delete', jwtAuth, FileController.delete)

module.exports = router
