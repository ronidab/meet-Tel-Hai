const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  expenses: {
    type: [
      {
        title: { type: String, required: true },
        sum: { type: Number, required: true },
        category: { type: String, required: true },
        date: { type: Date, required: true, default: Date.now },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
});

module.exports = mongoose.model("Match", matchSchema);
