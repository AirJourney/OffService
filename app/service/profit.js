"use strict";

const Service = require("egg").Service;

class ProfitService extends Service {
  async createProfit(payload) {
    return this.ctx.model.Profit.create(payload);
  }

  async getProfit(payload) {
    const { flightType, segment,company, group } = payload;
    let query = {
      isValid: true,
      group: group,
    };
    if (flightType){
      query.flightType =flightType;
    }
    if (company){
      query.company =company;
    }
     if (segment){
      query.segment =segment;
    }

    return this.ctx.model.Profit.find(query);
  }

  async updateProfit(profitInfo) {
    const {
      _id,
      flightType,
      segment,
      number,
      company,
      cabin,
      transit,
      dateStart,
      dateEnd,
      profitType,
      fixedPrice,
      fixedTax,
      percent,
      trim,
    } = profitInfo;

    const newPenaltyInfo = await this.ctx.model.Profit.findByIdAndUpdate(
      _id,
      {
        flightType,
        segment,
        number,
        company,
        cabin,
        transit,
        dateStart,
        dateEnd,
        profitType,
        fixedPrice,
        fixedTax,
        percent,
        trim,
      },
      { new: true }
    );
    return newPenaltyInfo;
  }

  async deleteProfit(profitInfo) {
    const { _id } = profitInfo;

    const newProfitInfo = await this.ctx.model.Profit.findByIdAndUpdate(
      _id,
      {
        isValid: false,
      },
      { new: true }
    );
    return newProfitInfo;
  }
}

module.exports = ProfitService;
