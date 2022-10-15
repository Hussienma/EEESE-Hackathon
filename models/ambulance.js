const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema({
  availability: {
    type: Boolean,
    default: false,
  },
});

module.exports = ambulance = mongoose.model("ambulance", ambulanceSchema);
