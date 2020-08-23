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

	Question.create(
		{
			createdBy: _id,
			author: req.body.author,
			createdAt: req.body.createdAt,
			difficulty: req.body.difficulty,
			tier: req.body.tier,
			isOfficial: req.body.isOfficial,
			maxScore: req.body.maxScore,
			isPublished: req.body.isPublished,
			body: req.body.body,
		},
		(err, doc) => {
			if (err) {
				return res.status(500).json(err)
			}

			return res.json({
				status: 'ok',
				message: 'Question created',
				data: doc,
			})
		}
	)
}

exports.show = (req, res) => {
	const { id } = req.params
}
