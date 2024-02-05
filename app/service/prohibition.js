"use strict";

const Service = require("egg").Service;

class ProhibitionService extends Service {
  async createProhibition(payload) {
    const {
      tripType,
      depart,
      departType,
      arrival,
      arrivalType,
      cabinType,
      vendibilityCompanies,IPCC,
      isProhibition,
      group
    } = payload;
    await this.ctx.model.Prohibition.create({
      tripType,
      depart,
      departType,
      arrival,
      arrivalType,
      cabinType,
      vendibilityCompanies,IPCC,
      isProhibition,
      isValid: true,
      group
    });
  }

  async asyncProhibition(payload) {
    const { group } = payload;

    const groupSellFightList =
      await this.service.sellFlight.getSellFlightByParams({ group });

    if (groupSellFightList.length === 0) {
      return false;
    }

    const prohibitionList = await this.getProhibition({ group });

    // 按照const {  tripType,  depart,  departType,  arrival,  arrivalType,  cabinType,  vendibilityCompanies,} = item; 这些字段，将groupSellFightList 和  prohibitionList做diff，得到需要新增的航线
    const segmentList = [];
    groupSellFightList.forEach((item) => {
      const {
        tripType,
        depart,
        departType,
        arrival,
        arrivalType,
        cabinType,
        vendibilityCompanies,IPCC
      } = item;
      const index = prohibitionList.findIndex((item) => {
        return (
          item.tripType === tripType &&
          item.depart === depart &&
          item.departType === departType &&
          item.arrival === arrival &&
          item.arrivalType === arrivalType
        );
      });
      if (index === -1) {
        segmentList.push({
          tripType,
          depart,
          departType,
          arrival,
          arrivalType,
          cabinType,
          vendibilityCompanies,IPCC,
        });
      }
    });
    // segmentList 中 可能 tripType,  depart,  departType,  arrival,  arrivalType相同，但是cabinType和vendibilityCompanies不同，所以需要把这些字段合并成一条记录，使用,分割
    const insertProhitionList = [];
    segmentList.forEach((item) => {
      const {
        tripType,
        depart,
        departType,
        arrival,
        arrivalType,
        cabinType,
        vendibilityCompanies,IPCC,
      } = item;
      const key = `${tripType},${depart},${departType},${arrival},${arrivalType}`;
      const existIndex = insertProhitionList.findIndex((item) => {
        return item.key === key;
      });
      if (existIndex === -1) {
        insertProhitionList.push({
          key,
          tripType,
          depart,
          departType,
          arrival,
          arrivalType,
          cabinType,
          vendibilityCompanies,IPCC,
        });
      } else {
        const existItem = insertProhitionList[existIndex];
        const {
          cabinType: existCabinType,
          vendibilityCompanies: existVendibilityCompanies,
        } = existItem;
        const newCabinType = `${existCabinType},${cabinType}`;
        const newVendibilityCompanies = `${existVendibilityCompanies},${vendibilityCompanies}`;
        const newIPCC = `${existItem.IPCC},${IPCC}`;
        insertProhitionList[existIndex] = {
          key,
          tripType,
          depart,
          departType,
          arrival,
          arrivalType,
          cabinType: newCabinType,
          vendibilityCompanies: newVendibilityCompanies,
          IPCC:newIPCC
        };
      }
    });

    // 将insertProhitionList中的数据，插入到prohibition表中
    insertProhitionList.forEach(async (item) => {
      const {
        tripType,
        depart,
        departType,
        arrival,
        arrivalType,
        cabinType,
        vendibilityCompanies,
        IPCC
      } = item;
      await this.createProhibition({
        tripType,
        depart,
        departType,
        arrival,
        arrivalType,
        cabinType,
        vendibilityCompanies,
        IPCC,
        isProhibition: false,
        group
      });
    });
  }

  async clearProhibition(payload) {
    try {
      const { group } = payload;
      await this.ctx.model.Prohibition.deleteMany({ group: group });
      return true;
    } catch (e) {
      return false;
    }
  }

  async getProhibition(payload) {
    const { tripType, depart, arrival, group, isProhibition } = payload;

    let query = { isValid: true, group: group };
    if (tripType && tripType !== "") {
      query.tripType = tripType;
    }
    if (depart && depart !== "") {
      query.depart = depart;
    }
    if (arrival && arrival !== "") {
      query.arrival = arrival;
    }

    if (isProhibition !== "") {
      query.isProhibition = isProhibition;
    }
    return await this.ctx.model.Prohibition.find(query);
  }

  async updateProhibition(prohibitionInfo) {
    const { _id, isProhibition } = prohibitionInfo;

    const newPenaltyInfo = await this.ctx.model.Prohibition.findByIdAndUpdate(
      _id,
      {
        isProhibition,
      },
      { new: true }
    );
    return newPenaltyInfo;
  }

  async deleteProhibition(prohibitionInfo) {
    const { _id } = prohibitionInfo;

    const newProhibitionInfo =
      await this.ctx.model.Prohibition.findByIdAndUpdate(
        _id,
        {
          isValid: false,
        },
        { new: true }
      );
    return newProhibitionInfo;
  }
}

module.exports = ProhibitionService;
