"use strict";

const Service = require("egg").Service;

class IPCCService extends Service {
  async createIPCC(payload) {
    payload.isValid = true;
    payload.IPCCId = this.ctx.helper.GUID();
    return await this.ctx.model.Ipcc.create(payload);
  }

  async getIPCC(payload) {
    const { IPCCType, IPCC, group } = payload;

    const matchQuery = {
      $or: [
        { "IPCCBooking.IPCCBookingId": { $exists: true } },
        { "IPCCSearch.IPCCSearchId": { $exists: true } },
      ],
      isValid: true,
      group: group,
    };

    if (IPCC) {
      matchQuery.IPCC = { $regex: new RegExp(IPCC, "i") };
    }

    if (IPCCType) {
      matchQuery.IPCCType = IPCCType;
    }

    return await this.ctx.model.Ipcc.aggregate([
      {
        $lookup: {
          from: "supplier",
          localField: "IPCCId",
          foreignField: "IPCCSearchId",
          as: "IPCCSearch",
        },
      },
      {
        $lookup: {
          from: "supplier",
          localField: "IPCCId",
          foreignField: "IPCCBookingId",
          as: "IPCCBooking",
        },
      },
      {
        $match: matchQuery,
      },
    ]);
  }

  async updateIPCC(payload) {
    const {
      _id,
      GDS,
      IPCCType,
      GDSBooking,
      IPCC,
      startDays,
      endDays,
      shoppingApi,
      checkApi,
      bookingApi,
      ticketApi,
      changeApi,
    } = payload;

    const newIPCCInfo = await this.ctx.model.Ipcc.findByIdAndUpdate(
      _id,
      {
        GDS,
        IPCCType,
        GDSBooking,
        IPCC,
        startDays,
        endDays,
        shoppingApi,
        checkApi,
        bookingApi,
        ticketApi,changeApi
      },
      { new: true }
    );
    return newIPCCInfo;
  }

  async deleteIPCC(payload) {
    const { _id } = payload;

    const newIPCCInfo = await this.ctx.model.Ipcc.findByIdAndUpdate(
      _id,
      {
        isValid: false,
      },
      { new: true }
    );
    return newIPCCInfo;
  }
}

module.exports = IPCCService;
