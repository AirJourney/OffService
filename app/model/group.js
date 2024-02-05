"use strict";

module.exports = (app) => {
  const mongoose = app.mongoose;

  const GroupSchema = new mongoose.Schema({
    groupId: {
      type: String,
      trim: true,
    },
    groupName: {
      type: String,
      trim: true,
    },
    groupCode: {
      type: String,
      trim: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    }
  });

  return mongoose.model("Group", GroupSchema, "group");
};
