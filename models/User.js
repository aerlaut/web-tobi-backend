let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    required: true,
    unique: true,
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
  mobile_no: String,
  school: String,
})

module.exports = mongoose.model('User', UserSchema)
