const mongoose = require("mongoose");

const centreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "request",
    },
  ],
});

module.exports = centre = mongoose.model("centre", centreSchema);
