const mongoose = require("mongoose");

const doubleSchema = mongoose.Schema(
  {
    name: String,
    payment: String,
    received: String,
    status: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Double", doubleSchema);
