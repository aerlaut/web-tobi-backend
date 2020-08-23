let mongoose = require('mongoose')

let QuestionItemSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
	},
	content: {
		type: mongoose.Schema.Types.Mixed,
		required: true,
	},
})

let QuestionSchema = new mongoose.Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
	},
	updatedAt: {
		type: Date,
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
	},
	subtopics: {
		type: [mongoose.Schema.Types.ObjectId],
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
	publishedDate: {
		type: Boolean,
		default: false,
	},
	body: {
		type: [QuestionItemSchema],
	},
})

module.exports = mongoose.model('Question', QuestionSchema)
