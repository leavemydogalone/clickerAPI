const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  reward: { type: Number },
});

module.exports = mongoose.model("Achievement", AchievementSchema);
