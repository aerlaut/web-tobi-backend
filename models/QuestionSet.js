const mongoose = require('mongoose')

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
			type: [mongoose.Schema.Types.ObjectId],
			index: true,
		},
		subtopics: {
			type: [mongoose.Schema.Types.ObjectId],
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
			type: [Number],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('QuestionSet', QuestionSetSchema)
