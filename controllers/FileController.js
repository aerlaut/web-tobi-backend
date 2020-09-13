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

		// If file already found, updating old file

		const _id = await File.findOne({ path: newPath }, '_id').exec()

		if (_id === null) {
			file.id = await counter.getNewId('File')
			return file.save()
		} else {
			return File.findByIdAndUpdate(
				_id,
				{
					path: file.path,
					link: file.link,
					name: file.name,
					mimetype: file.mimetype,
					size: file.size,
				},
				{ new: true }
			).exec()
		}
	}

	create()
		.then((doc) => {
			return res.json({
				status: 'ok',
				message: 'Resource created',
				data: doc,
			})
		})
		.catch((err) => {
			console.log(err)

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
