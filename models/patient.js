const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  // stable/critical
  status: {
    type: String,
    required: true,
  },
  appointment: {
    type: Date,
  },
  updates: [
    {
      condition: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },
});

module.exports = patient = mongoose.model("patient", patientSchema);
