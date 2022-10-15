const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hospital",
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = request = mongoose.model("request", requestSchema);
