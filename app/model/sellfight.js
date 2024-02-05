"use strict";

module.exports = (app) => {
  const mongoose = app.mongoose;

  const SellfightSchema = new mongoose.Schema({
    tripType: {
      type: String,
      trim: true,
    },
    depart: {
      type: String,
      trim: true,
    },
    departType: {
      type: String,
      trim: true,
    },
    arrival: {
      type: String,
      trim: true,
    },
    arrivalType: {
      type: String,
      trim: true,
    },
    cabinType: {
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
    /** 可售航司集合，使用,分割 */
    vendibilityCompanies: {
      type: String,
      trim: true,
    },
    GDS: {
      type: String,
      trim: true,
    },
    GDSBooking: {
      type: String,
      trim: true,
    },
    IPCC: {
      type: String,
      trim: true,
    },
    IPCCId: {
      type: String,
      trim: true,
    },
   
    group:{
      type: String,
      trim: true,
    }
  });

  return mongoose.model("Sellfight", SellfightSchema, "sellfight");
};
