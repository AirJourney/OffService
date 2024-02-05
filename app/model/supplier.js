"use strict";

module.exports = (app) => {
  const mongoose = app.mongoose;

  const SupplierSchema = new mongoose.Schema({
    supplierId: {
      type: String,
      trim: true,
    },
    supplierName: {
      type: String,
      trim: true,
    },
    supplierCode: {
      type: String,
      trim: true,
    },
    IPCCSearchId: {
      type: String,
      trim: true,
    },
    IPCCBookingId: {
      type: String,
      trim: true,
    },
    UTC: {
      type: String,
      trim: true,
    },
    exchangeType: {
      type: String,
      trim: true,
    },
    settlementCurrency: {
      type: String,
      trim: true,
    },
    roundType: {
      type: String,
      trim: true,
    },
    sellSwitch: {
      type: Boolean,
      default: true,
    },
    businessTime: {
      type: String,
      trim: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    group: {
      type: String,
      trim: true,
    },
  });

  return mongoose.model("Supplier", SupplierSchema, "supplier");
};
