const mongoose = require("mongoose");

const homeworkRecordSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{4}-\d{2}-\d{2}$/,
  },
  nafisCompleted: {
    type: Boolean,
    required: true,
  },
  tamimCompleted: {
    type: Boolean,
    required: true,
  },
  nafisNote: {
    type: String,
    default: "",
  },
  tamimNote: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HomeworkRecord", homeworkRecordSchema);
