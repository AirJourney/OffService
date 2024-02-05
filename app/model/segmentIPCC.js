"use strict";

module.exports = (app) => {
  const mongoose = app.mongoose;

  const SegmentIPCCSchema = new mongoose.Schema({
    segmentId: {
      type: String,
      trim: true,
    },
    IPCCId: {
      type: String,
      trim: true,
    },
    depart: {
      type: String,
      trim: true,
    },
    arrival: {
      type: String,
      trim: true,
    },
    departType: {
      type: String,
      trim: true,
    },
    arrivalType: {
      type: String,
      trim: true,
    },
    tripType: {
      type: String,
      trim: true,
    },
    startDays: {
      type: Number,
      default: 1,
    },
    endDays: {
      type: Number,
      default: 1,
    },
    cabinType: {
      type: String,
      trim: true,
    },
    /** 可售航司集合，使用,分割 */
    vendibilityCompanies: {
      type: String,
      trim: true,
    },
    overWrite: {
      type: String,
      trim: true,
    },
    publishStart: {
      type: String,
      trim: true,
    },
    publishEnd: {
      type: String,
      trim: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    group:{
      type: String,
      trim: true,
    }
  });

  return mongoose.model("SegmentIPCC", SegmentIPCCSchema, "segmenipcc");
};
