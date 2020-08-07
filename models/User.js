let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  username: String,
  fullname: String,
  email: String,
  password: String,
  address: String,
  city: String,
  province: String,
  country: String,
  mobile_no: String,
  school: String,
})

module.exports = mongoose.model('User', UserSchema)