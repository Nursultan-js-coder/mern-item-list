const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  image_URL: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  role: {
    role_id: String,
  },
  projects: {
    type: Array,
    array: [],
  },
  teams: {
    type: String,
    array: [],
  },
  bill: {
    type: String,
    default: "",
  },
});

module.exports = User = mongoose.model("user", UserSchema);
