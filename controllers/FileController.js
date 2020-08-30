const fs = require('fs')
const path = require('path')
const File = require('../models/File')
const Counter = require('../models/Counter')

exports.index = (req, res) => {}

exports.store = (req, res) => {
	// Create storing function
	async function create() {
		let counter = new Counter()

		const fileName = req.file.originalname.replace(/[\s*]/g, '-')
		const oldPath = req.file.path
		const newPath = path.join(__dirname, '..', req.file.destination, fileName)
		fs.renameSync(oldPath, newPath)

		let file = new File({
			path: newPath,
			link: `${process.env.APP_URL}/public/storage/${fileName}`,
			name: fileName,
			mimetype: req.file.mimetype,
			size: req.file.size,
			owner: { type: req.body.ownerType },
		})
		file.id = await counter.getNewId('File')

		return file.save()
	}

	create()
		.then((doc) => {
			// Adding link as required by react-draft-wysiwyg
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

exports.show = (req, res) => {
	const path = path.join(__dirname, req.params)
	res.sendFile()
}

exports.delete = (req, res) => {}
