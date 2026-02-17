const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    organizer: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    category: {
      type: String,
      required: true,
      enum: ["Tech", "Business", "Workshop", "Entertainment", "Other"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);
