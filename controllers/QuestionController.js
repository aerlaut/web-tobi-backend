const Question = require('../models/Question')
const Counter = require('../models/Counter')

exports.index = (req, res) => {
	Question.find({}, function (err, docs) {
		if (err) {
			return res.status(500).json(err)
		}

		return res.json({
			status: 'ok',
			message: 'Question sent',
			data: docs,
		})
	})
}

exports.store = (req, res) => {
	// Get current userId from token
	const { _id } = req.user

	async function createUser() {
		// Get new question id
		let counter = new Counter()
		let questionId = await counter.getNewId('Question')

		console.log(`questionId is ${questionId}`)

		// Create question
		return Question.create({
			questionId: questionId,
			createdBy: _id,
			author: req.body.author,
			createdAt: req.body.createdAt,
			difficulty: req.body.difficulty,
			tier: req.body.tier,
			isOfficial: req.body.isOfficial,
			maxScore: req.body.maxScore,
			isPublished: req.body.isPublished,
			body: req.body.body,
		})
	}

	// Create user
	createUser()
		.then((doc) => {
			return res.json({
				status: 'ok',
				message: 'Question created',
				data: doc,
			})
		})
		.catch((err) => {
			if (err.code == 11000 && err.keyPattern.questionId) {
				let returnErr = Object.keys(err.keyPattern)[0]

				return res.status(202).json({
					status: 'not_unique',
					field: field,
					message: `${field} is already used`,
				})
			}

			return res.status(500).json(err)
		})
}

exports.show = (req, res) => {
	const { id } = req.params
}
