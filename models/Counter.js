const mongoose = require('mongoose')

const CounterSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	currentId: {
		type: Number,
		default: 1,
	},
	nextId: {
		type: Number,
		default: 2,
	},
	lastInsert: {
		type: Date,
	},
})

CounterSchema.methods.getLatestId = async (name) => {
	try {
		let doc = await mongoose
			.model('Counter')
			.findOne({ name: name }, { currentId: 1, lastInsert: 1 })
			.exec()

		return doc.currentId
	} catch (err) {
		if (err === null) {
			// not yet created
			return Error('Error 500 : Counter not yet created')
		}
	}
}
CounterSchema.methods.getNewId = async (name) => {
	// Check if model counter is created

	let doc = null

	try {
		doc = await mongoose
			.model('Counter')
			.findOneAndUpdate({ name: name }, { $inc: { currentId: 1, nextId: 1 } })
			.exec()
	} catch (err) {
		return Error('Error 500 : Counter not yet created')
	}

	// If null create counter
	if (doc === null) {
		await mongoose.model('Counter').create({ name: name })
		return 1
	} else {
		return doc.nextId
	}
}

module.exports = mongoose.model('Counter', CounterSchema)
