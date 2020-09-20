const mongoose = require('mongoose')

const QuestionSetItemSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	difficulty: {
		type: Number,
	},
	maxScore: {
		type: Number,
	},
	topic: {
		type: String,
	},
})

const TopicItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		index: true,
	},
	type: {
		type: String,
	},
})

const QuestionSetSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			index: true,
			required: true,
			unique: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			index: true,
		},
		author: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
			text: true,
		},
		difficulty: {
			type: Number,
			default: 3,
			min: 1,
			max: 5,
		},
		numTries: {
			type: Number,
			default: 0,
		},
		topics: {
			type: [TopicItemSchema],
			index: true,
		},
		tier: {
			type: String,
		},
		isOfficial: {
			type: Boolean,
			default: false,
		},
		maxScore: {
			type: Number,
			default: 0,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		canRandomOrder: {
			type: Boolean,
			default: false,
		},
		publishedAt: {
			type: Date,
		},
		contents: {
			type: [QuestionSetItemSchema],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('QuestionSet', QuestionSetSchema)
