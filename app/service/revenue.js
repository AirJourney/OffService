"use strict";

const Service = require("egg").Service;

class RevenueService extends Service {
  async createRevenue(payload) {
    payload.revenueId = this.ctx.helper.GUID();
    payload.isValid = true;
    return this.ctx.model.Revenue.create(payload);
  }

  async getRevenue(payload) {
    const { group,IPCC,carrierType } = payload;
    let query = {
      isValid: true,
    };


    if (carrierType) {
      query.carrierType = { $regex: new RegExp(carrierType, 'i') };
    }

    if (IPCC) {
      query.IPCC = { $regex: new RegExp(IPCC, 'i') };
    }

    if (group) {
      query.group = { $regex: new RegExp(group, 'i') };
    }


    return await this.ctx.model.Revenue.aggregate([
      {
        $lookup: {
          from: "supplier",
          localField: "supplierId",
          foreignField: "supplierId",
          as: "supplierInfo",
        },
      },
      {
        $match: query,
      },
    ]);
  }

  async updateRevenue(RevenueInfo) {
    const {
      _id,
      group,
      carrierType,
      supplierId,
      IPCC,
      revenueType,
      fixedPrice,
      fixedTax,
      percent,
      trim,
    } = RevenueInfo;

    const newPenaltyInfo = await this.ctx.model.Revenue.findByIdAndUpdate(
      _id,
      {
        group,
        carrierType,
        supplierId,
        IPCC,
        revenueType,
        fixedPrice,
        fixedTax,
        percent,
        trim,
      },
      { new: true }
    );
    return newPenaltyInfo;
  }

  async deleteRevenue(RevenueInfo) {
    const { _id } = RevenueInfo;

    const newRevenueInfo = await this.ctx.model.Revenue.findByIdAndUpdate(
      _id,
      {
        isValid: false,
      },
      { new: true }
    );
    return newRevenueInfo;
  }
}

module.exports = RevenueService;
