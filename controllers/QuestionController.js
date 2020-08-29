const Question = require('../models/Question')
const Counter = require('../models/Counter')
const { create } = require('../models/Counter')

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

	async function create() {
		let counter = new Counter()

		// Create question
		let payload = req.body
		payload.createdBy = _id
		payload.id = await counter.getNewId('User')
		payload.createdAt = Date.now()
		payload.updatedAt = Date.now()

		let question = new Question(payload)

		return question.save()
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

// Get data for one question
exports.show = (req, res) => {
	const { id } = req.params

	Question.findOne({ id: id }, (err, doc) => {
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
		})
	})
}
