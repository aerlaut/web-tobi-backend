const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,
			unique: true,
			index: true,
		},
		username: {
			type: String,
			index: true,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			default: 'user',
			enum: ['superadmin', 'admin', 'user'],
		},
		fullname: String,
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		address: String,
		city: String,
		province: String,
		country: String,
		mobileNo: String,
		grade: String,
		school: String,
		isVerified: {
			type: Boolean,
			default: false,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		lastLogin: Date,
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('User', UserSchema)
