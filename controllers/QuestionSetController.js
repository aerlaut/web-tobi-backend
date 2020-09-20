const QuestionSet = require('../models/QuestionSet')
const Topic = require('../models/Topic')
const Counter = require('../models/Counter')
const { removeStopwords } = require('../helpers/stopwords')

// Get list of all questions
exports.index = (req, res) => {
	Question.find({}, function (err, docs) {
		if (err) {
			return res.status(500).json(err)
		}

		return res.json({
			status: 'ok',
			message: 'Question set fetched',
			data: docs,
		})
	})
}

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

// Store new question set
exports.store = (req, res) => {
	// Get current userId from token

	async function create() {
		let counter = new Counter()

		// Create question
		let payload = req.body
		payload.id = await counter.getNewId('QuestionSet')

		let question = new QuestionSet(payload)

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

	QuestionSet.findOne({ id: id }, (err, doc) => {
		if (err) return res.status(500).json(err)

		return res.json({
			status: 'ok',
			message: 'Question set fetched',
			data: doc,
		})
	})
}

// Get data for edit
exports.edit = (req, res) => {
	const { id } = req.params

	const data = {}

	QuestionSet.findOne({ id: id }, (err, doc) => {
		if (err) return res.status(500).json(err)

		data.questionSet = doc

		Topic.find((err, docs) => {
			if (err) return res.status(500).json(err)

			data.topics = docs

			return res.json({
				status: 'ok',
				message: 'QuestionSet fetched',
				data: data,
			})
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

	QuestionSet.find(
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

// Update question
exports.update = (req, res) => {
	const { id } = req.params

	QuestionSet.findByIdAndUpdate(req.body._id, req.body, (err, doc) => {
		if (err) return res.status(500).json(err)

		return res.json({
			status: 'ok',
			message: `Question set ${id} updated`,
		})
	})
}
