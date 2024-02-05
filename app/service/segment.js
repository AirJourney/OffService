"use strict";

const Service = require("egg").Service;

class SegmentService extends Service {
  async createSegment(payload) {
    payload.isValid = true;
    payload.SegmentId = this.ctx.helper.GUID();
    payload.publishStart = "";
    payload.publishEnd = "";

    return await this.ctx.model.SegmentIPCC.create(payload);
  }

  async importSegment(payload) {
    const { importList } = payload;
    importList.forEach((importItem) => {
      importItem.isValid = true;
      importItem.SegmentId = this.ctx.helper.GUID();
      importItem.publishStart = "";
      importItem.publishEnd = "";
    });
    return await this.ctx.model.SegmentIPCC.insertMany(importList);
  }

  async getSegment(payload) {
    const {
      depart,
      arrival,
      departType,
      arrivalType,
      tripType,
      group,
      IPCCId,
    } = payload;

    const matchQuery = {
      isValid: true,
      group: group,
    };

    if (IPCCId) {
      matchQuery.IPCCId = IPCCId;
    }

    if (depart) {
      matchQuery.depart = { $regex: new RegExp(depart, "i") };
    }

    if (arrival) {
      matchQuery.arrival = { $regex: new RegExp(arrival, "i") };
    }

    if (departType && arrivalType) {
      matchQuery.departType = departType;
      matchQuery.arrivalType = arrivalType;
    }

    if (tripType) {
      matchQuery.tripType = tripType;
    }

    return await this.ctx.model.SegmentIPCC.aggregate([
      {
        $lookup: {
          from: "ipcc",
          localField: "IPCCId",
          foreignField: "IPCCId",
          as: "IPCC",
        },
      },
      {
        $match: matchQuery,
      },
    ]);
  }

  async updateSegment(payload) {
    const {
      _id,
      depart,
      arrival,
      departType,
      arrivalType,
      tripType,
      startDays,
      endDays,
      cabinType,
      vendibilityCompanies,
      overWrite,
    } = payload;
    const editTime = this.ctx.helper.dateTimeNow();
    const newSegmentInfo = await this.ctx.model.SegmentIPCC.findByIdAndUpdate(
      _id,
      {
        depart,
        arrival,
        departType,
        arrivalType,
        tripType,
        startDays,
        endDays,
        cabinType,
        vendibilityCompanies,
        overWrite,
        editTime,
      },
      { new: true }
    );
    return newSegmentInfo;
  }

  async deleteSegments(payload) {
    // Assuming _idList is an array of ids that you want to delete
    const deletionResult = await this.ctx.model.SegmentIPCC.deleteMany({
      _id: { $in:payload._idList.key },
    });

    return deletionResult; // This will return the result of the deletion operation
  }

  async getSegmentByIPCC(payload) {
    const { group, IPCC } = payload;

    const matchQuery = {
      IPCC,
      isValid: true,
      group: group,
    };

    return await this.ctx.model.Ipcc.aggregate([
      {
        $lookup: {
          from: "segmenipcc",
          localField: "IPCCId",
          foreignField: "IPCCId",
          as: "segmentIPCC",
        },
      },
      {
        $match: matchQuery,
      },
    ]);
  }
}

module.exports = SegmentService;
