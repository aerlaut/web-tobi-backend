const Topic = require('../models/Topic')
const Counter = require('../models/Counter')
const { create } = require('../models/Counter')

exports.index = (req, res) => {
	Topic.find((err, docs) => {
		if (err) {
			return res.status(500).json(err)
		}

		return res.json({
			status: 'ok',
			message: 'Topics fetched',
			data: docs,
		})
	})
}

exports.update = (req, res) => {
	let inputTopics = [...req.body.topics, ...req.body.subtopics].map((el) => {
		return el.name
	})

	let topics = req.body.topics.map((e) => {
		return {
			name: e.name,
			type: 'topic',
		}
	})

	let subtopics = req.body.subtopics.map((e) => {
		return {
			name: e.name,
			type: 'subtopic',
		}
	})

	// Get current list of topics
	const currentTags = Topic.find(
		{ name: { $in: inputTopics } },
		{ name: 1 },
		(err, docs) => {
			if (err) {
				return res.status(500).json(err)
			}

			docs = docs.map((el) => el.name)

			// add new topics
			let addTopics = inputTopics.filter((topic) => {
				return !docs.includes(topic)
			})

			// Delete topics
			let deleteTopics = docs.filter((topic) => {
				return !inputTopics.includes(topic)
			})

			// Create the new input array
			let newTopics = [...topics, ...subtopics].filter((el) => {
				if (addTopics.includes(el.name)) {
					return el
				}
			})

			// Delete old topics
			if (deleteTopics.length > 0) {
				Topic.deleteMany({ name: { $in: deleteTopics } }, (err) => {
					if (err) {
						return res.status(500).json(err)
					}
				})
			}

			console.log(newTopics)

			// Add new topics
			Topic.insertMany(newTopics, (err, docs) => {
				if (err) {
					return res.status(500).json(err)
				}

				return res.json({
					status: 'ok',
					message: 'Topics inserted',
				})
			})
		}
	)
}
