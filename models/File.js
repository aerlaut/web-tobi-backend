const mongoose = require('mongoose')

const FileOwnerSchema = new mongoose.Schema({
	type: {
		// Model of the owner
		type: String,
		required: true,
	},
	id: {
		type: Number,
	},
	ObjectId: {
		type: mongoose.Types.ObjectId,
	},
})

const FileSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		required: true,
		unique: true,
	},
	link: {
		type: String,
		required: true,
		unique: true,
	},
	mimetype: {
		type: String,
		required: true,
	},
	size: {
		type: Number,
		required: true,
	},
	owner: {
		type: FileOwnerSchema,
		required: true,
	},
})

module.exports = mongoose.model('File', FileSchema)
