const Question = require('../models/Question')
const Counter = require('../models/Counter')

// Get list of all questions
exports.index = (req, res) => {
	Question.find({}, function (err, docs) {
		if (err) {
			return res.status(500).json(err)
		}

		return res.json({
			status: 'ok',
			message: 'Question fetched',
			data: docs,
		})
	})
}

// Store new question
exports.store = (req, res) => {
	// Get current userId from token
	const { _id } = req.user

	async function createQuestion() {
		// Create question
		try {
			let doc = await Question.create({
				questionId: 0,
				createdBy: _id,
				author: req.body.author,
				description: req.body.description,
				createdAt: req.body.createdAt,
				difficulty: req.body.difficulty,
				tier: req.body.tier,
				isOfficial: req.body.isOfficial,
				maxScore: req.body.maxScore,
				isPublished: req.body.isPublished,
				contents: req.body.contents,
			})
		} catch (err) {
			return res.status(500).json(err)
		}

		// Update question id
		let counter = new Counter()
		let questionId = await counter.getNewId('Question')

		doc.questionId = questionId
		return doc.save()
	}

	// Create question
	createQuestion()
		.then((doc) => {
			return res.json({
				status: 'ok',
				message: 'Question created',
				data: doc,
			})
		})
		.catch((err) => {
			if (err.code == 11000 && err.keyPattern.questionId) {
				let field = Object.keys(err.keyPattern)[0]

				return res.status(202).json({
					status: 'not_unique',
					message: `${field} is already used`,
				})
			}

			return res.status(500).json(err)
		})
}

// Get data for one question
exports.show = (req, res) => {
	const { id } = req.params

	Question.findOne({ questionId: id }, (err, doc) => {
		if (err) return res.status(500).json(err)

		return res.json({
			status: 'ok',
			message: 'Question fetched',
			data: doc,
		})
	})
}

// Update question
exports.update = (req, res) => {
	const { id } = req.params

	Question.findByIdAndUpdate(req.body._id, req.body, (err, doc) => {
		if (err) return res.status(500).json(err)

		return res.json({
			status: 'ok',
			message: `Question ${id} updated`,
			data: doc,
		})
	})
}
