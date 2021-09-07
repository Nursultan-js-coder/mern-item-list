const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  users: {
    type: String,
    array: [],
  },
  tasks: {
    type: String,
    array: [],
  },
});

module.exports = Project = mongoose.model("project", ProjectSchema);
