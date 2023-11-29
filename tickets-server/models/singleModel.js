const mongoose = require("mongoose");

const singleSchema = mongoose.Schema(
  {
    name: String,
    payment: String,
    received: String,
    status: String,
    ticket: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Single", singleSchema);
