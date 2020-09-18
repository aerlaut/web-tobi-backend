const mongoose = require('mongoose')

const QuestionItemSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
	},
	content: {
		type: mongoose.Schema.Types.Mixed,
		required: true,
	},
	score: {
		type: Number,
	},
	label: {
		type: String,
	},
	question: {
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

const QuestionSchema = new mongoose.Schema(
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
			index: true,
		},
		numTries: {
			type: Number,
			default: 0,
		},
		topics: {
			type: [TopicItemSchema],
		},
		subtopics: {
			type: [TopicItemSchema],
		},
		tier: {
			type: String,
			default: 'osk',
			index: true,
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
		publishedAt: {
			type: Date,
		},
		contents: {
			type: [QuestionItemSchema],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Question', QuestionSchema)
