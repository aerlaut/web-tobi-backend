const Question = require('../models/Question')
const QuestionSet = require('../models/QuestionSet')
const Topic = require('../models/Topic')
const Counter = require('../models/Counter')
const { removeStopwords } = require('../helpers/stopwords')

// Get list of all questions
exports.index = (req, res) => {
	Question.find(
		{},
		{
			id: 1,
			difficulty: 1,
			description: 1,
			topics: 1,
			subtopics: 1,
			tiers: 1,
		},
		(err, docs) => {
			if (err) {
				return res.status(500).json(err)
			}

			const data = {
				questions: docs,
			}

			QuestionSet.find(
				{},
				{
					id: 1,
					difficulty: 1,
					description: 1,
					topics: 1,
					subtopics: 1,
					tiers: 1,
				},
				(err, docs) => {
					if (err) {
						return res.status(500).json(err)
					}

					data.question_sets = docs

					return res.json({
						status: 'ok',
						message: 'Questions fetched',
						data: data,
					})
				}
			)
		}
	)
}

// Get data for create page
exports.create = (req, res) => {
	// Get topics
	Topic.find((err, docs) => {
		if (err) {
			return res.status(500).json(err)
		}

		return res.json({
			status: 'ok',
			message: 'Topics fetched',
			data: { topics: docs },
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

// Search questions with parameter
exports.search = (req, res) => {
	let {
		minDifficulty,
		maxDifficulty,
		description,
		tiers,
		topics,
		subtopics,
	} = req.body

	let queryObject = { isPublished: true }

	// Filter input
	if (minDifficulty === undefined || minDifficulty < 1) {
		minDifficulty = 1
	}

	if (maxDifficulty === undefined || maxDifficulty > 5) {
		maxDifficulty = 5
	}

	queryObject.difficulty = { $gte: minDifficulty, $lte: maxDifficulty }

	if (topics !== undefined && topics.length > 0) {
		topics = topics.map((el) => el.name)
		queryObject['topics.name'] = { $in: topics }
	}

	if (subtopics !== undefined && subtopics.length > 0) {
		subtopics = subtopics.map((el) => el.name)
		queryObject['subtopics.name'] = { $in: subtopics }
	}

	if (tiers !== undefined && tiers.length > 0) {
		tiers = tiers.map((el) => el.value)
		queryObject.tiers = { $in: tiers }
	}

	// Process search on description to filter commmon words
	if (description !== undefined && description != '') {
		queryObject.$text = {
			$search: removeStopwords(description),
		}
	}

	Question.find(
		queryObject,
		{
			id: 1,
			description: 1,
			difficulty: 1,
			tier: 1,
			topics: 1,
			subtopics: 1,
			numTries: 1,
			maxScore: 1,
		},
		{},
		(err, docs) => {
			if (err) return res.status(500).json(err)

			return res.json({
				status: 'ok',
				message: 'Questions fetched',
				data: docs,
			})
		}
	)
}

// Get data for edit
exports.edit = (req, res) => {
	const { id } = req.params

	Question.findOne({ id: id }, (err, doc) => {
		if (err) return res.status(500).json(err)

		let data = { question: doc }

		// Add topics
		Topic.find((err, docs) => {
			if (err) return res.status(500).json(err)

			data.topics = docs

			return res.json({
				status: 'ok',
				message: 'Question fetched',
				data: data,
			})
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
