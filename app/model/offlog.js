"use strict";

module.exports = (app) => {
  const mongoose = app.mongoose;

  const OffLogSchema = new mongoose.Schema({
    orderId: {
      type: String,
      trim: true,
    },
    staffId: {
      type: String,
      trim: true,
    },
    dateTime: {
      type: String,
      trim: true,
    },
    opType: {
      type: String,
      trim: true,
    },
    ticketNumber: {
      type: String,
      trim: true,
    }
  });

  return mongoose.model("OffLog", OffLogSchema, "offlog");
};
