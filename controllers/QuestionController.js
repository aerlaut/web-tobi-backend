const Question = require('../models/Question')

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
		// Get question id
		let doc = {}
		let questionId = 0

		try {
			doc = await Question.findOne({}, 'questionId', {
				sort: { questionId: -1 },
			}).exec()

			questionId = doc.questionId
		} catch (err) {
			if (err === null) questionId = 1 // If there is no question, set value to 1
		}

		// Create question
		try {
			doc = await Question.create({
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
		} catch (err) {
			if (err.code == 11000 && err.keyPattern.questionId) {
				let returnErr = Object.keys(err.keyPattern)[0]

				return res.status(202).json({
					status: 'not_unique',
					field: field,
					message: `${field} is already used`,
				})
			}

			return res.status(500).json(err)
		}

		return doc
	}

	// Create user
	createUser().then((doc) => {
		return res.json({
			status: 'ok',
			message: 'Question created',
			data: doc,
		})
	})
}

exports.show = (req, res) => {
	const { id } = req.params
}
