const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profession: {
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
  shifts: [
    {
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
    },
  ],
  patients: [
    {
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
      },
    },
  ],
});

module.exports = doctor = mongoose.model("doctor", doctorSchema);
