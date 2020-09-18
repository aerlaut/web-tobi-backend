const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			index: true,
			required: true,
			unique: true,
		},
		type: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Topic', TopicSchema)
