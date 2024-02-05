"use strict";

const Service = require("egg").Service;

class VendibilityService extends Service {
  async createVendibility(payload) {
    const { company, group } = payload;
    const companyList = company.split(",");

    if (companyList.length > 0) {
      // 把companyList转换成Set，去重
      const companySet = new Set(companyList);
      companySet.forEach(async (item) => {
        const existList = await this.ctx.model.Vendibility.find({
          company: item.toUpperCase(),
          isValid: true,
          group,
        });
        if (existList.length > 0) {
          return;
        }

        payload.company = item.toUpperCase();
        payload.isVendibility = true;
        this.ctx.model.Vendibility.create(payload);
      });
    }
  }

  async asyncVendibility(payload) {
    const { group } = payload;

    const groupSellFightList =
      await this.service.sellFlight.getSellFlightByParams({ group });

    if (groupSellFightList.length === 0) {
      return false;
    }

    const vendibilityList = await this.getVendibility({ group });

    const companySet = new Set();
    groupSellFightList.forEach(async (item) => {
      const { vendibilityCompanies } = item;
      const companyList =
        vendibilityCompanies && vendibilityCompanies.split(",");
      if (companyList && companyList.length > 0) {
        companyList.forEach((company) => {
          const index = vendibilityList.findIndex((item) => {
            return item === company;
          });
          if (index === -1) {
            companySet.add(company);
          }
        });
      }
    });

    // companySet 变成字符串数组，使用,分割
    const companyList = Array.from(companySet).join(",");
    await this.createVendibility({ company: companyList, group });
    return true;
  }

  async clearVendibility(payload) {
    try {
      const { group } = payload;
      await this.ctx.model.Vendibility.deleteMany({ group: group });
      return true;
    } catch (e) {
      return false;
    }
  }

  async getVendibility(payload) {
    const { isVendibility, group } = payload;

    let query = { isValid: true, group: group };
    if (isVendibility !== "") {
      query.isVendibility = isVendibility;
    }
    return this.ctx.model.Vendibility.find(query);
  }

  async updateVendibility(vendibilityInfo) {
    const { _id, isVendibility } = vendibilityInfo;

    const newPenaltyInfo = await this.ctx.model.Vendibility.findByIdAndUpdate(
      _id,
      {
        isVendibility,
      },
      { new: true }
    );
    return newPenaltyInfo;
  }

  async deleteVendibility(vendibilityInfo) {
    const { _id } = vendibilityInfo;

    const newVendibilityInfo =
      await this.ctx.model.Vendibility.findByIdAndUpdate(
        _id,
        {
          isValid: false,
        },
        { new: true }
      );
    return newVendibilityInfo;
  }
}

module.exports = VendibilityService;
