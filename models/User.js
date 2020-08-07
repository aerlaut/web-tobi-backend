let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  address: String,
  city: String,
  province: String,
  country: String,
  mobile_no: String,
  school: String,
})

export default mongoose.model('User', UserSchema)
