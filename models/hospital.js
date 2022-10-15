const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: true,
  },
  Staff: [
    {
      doctors: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
      },
    },
  ],
  drugs: [
    {
      type: String,
      required: true,
    },
  ],
  // Number of available icus
  ICUs: {
    type: Number,
  },
  ambulances: [
    {
      ambulance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ambulance",
      },
    },
  ],
});

module.exports = hospital = mongoose.model("hospital", hospitalSchema);
