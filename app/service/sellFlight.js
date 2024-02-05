"use strict";

const fare = require("../model/fare");

const Service = require("egg").Service;

class SellFightService extends Service {
  /**
   * 聚合所有IPCC下的Segment
   *
   * @memberof SegmentService
   */
  async createSellFight(payload) {
    const { IPCCType, IPCC } = payload;
    const ipccSegmentList = await this.ctx.model.Ipcc.aggregate([
      {
        $lookup: {
          from: "segmenipcc",
          localField: "IPCCId",
          foreignField: "IPCCId",
          as: "segmentIPCCList",
        },
      },
      {
        $match: {
          isValid: true,
          IPCCType,
          IPCC,
        },
      },
    ]);

    const aggSegmentList = [];

    ipccSegmentList.forEach((ipccSegment) => {
      const { GDS, GDSBooking, IPCC, IPCCId, group } = ipccSegment;
      const ipccStartDays = ipccSegment.startDays;
      const ipccEndDays = ipccSegment.endDays;

      ipccSegment.segmentIPCCList.forEach((segment) => {
        const { isValid } = segment;
        if (!isValid) {
          return;
        }
        const {
          tripType,
          depart,
          departType,
          arrival,
          arrivalType,
          cabinType,
          startDays,
          endDays,
          vendibilityCompanies,
          overWrite,
        } = segment;

        const generateSegment = (flightType) => {
          const aggSegment = {
            tripType: flightType,
            depart,
            departType,
            arrival,
            arrivalType,
            cabinType,
            startDays: overWrite != "no" ? startDays : ipccStartDays,
            endDays: overWrite != "no" ? endDays : ipccEndDays,
            vendibilityCompanies,
            GDS,
            GDSBooking,
            IPCC,
            IPCCId,
            group,
          };
          aggSegmentList.push(aggSegment);
        };

        if (tripType == "全部") {
          generateSegment("OW");
          generateSegment("RT");
        } else {
          const flightType = tripType == "单程" ? "OW" : "RT";
          generateSegment(flightType);
        }
      });
    });
    await this.ctx.model.Sellfight.create(aggSegmentList);
    return aggSegmentList;
  }

  async clearSellFight(payload) {
    try {
      const { IPCC } = payload;
      await this.ctx.model.Sellfight.deleteMany({ IPCC: IPCC });
      return true;
    } catch (e) {
      return false;
    }
  }

  async getSellFlightByParams(payload) {
    const { group,tripType, GDS, GDSBooking ,cabinType} = payload;
    let query = {
    };
    if (tripType) {
      query.tripType = tripType;
    }

    if (group) {
      query.group = group;
    }

    if (GDS) {
      query.GDS = GDS;
    }

    if (GDSBooking) {
      query.GDSBooking = GDSBooking;
    }

    if (cabinType) {
      query.cabinType = cabinType;
    }

    const sellFlightList = await this.ctx.model.Sellfight.find(query);

    return sellFlightList;
  }

  async getSellFlight(payload) {
    const { tripType, GDS, GDSBooking } = payload;
    let query = {
      GDS,
      GDSBooking,
    };
    if (tripType) {
      query.tripType = tripType;
    }

    const sellFlightList = await this.ctx.model.Sellfight.find(query);

    return sellFlightList;
  }
}

module.exports = SellFightService;
