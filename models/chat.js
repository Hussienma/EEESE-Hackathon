const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },
  messages: [
    {
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = chat = mongoose.model("chat", chatSchema);
