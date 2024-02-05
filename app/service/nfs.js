"use strict";

const Service = require("egg").Service;

class NfsService extends Service {
  async allGroupNFS(payload) {
    const { ctx, service } = this;

    let groupQuery = { isValid: true };

    const groupList = await this.ctx.model.Group.find(groupQuery);

    // groupCode
    const groupNFSList = [];
    for (let i = 0; i < groupList.length; i++) {
      const groupCode = groupList[i].groupCode;

      const supplierIPCCList = await ctx.model.Supplier.aggregate([
        {
          $lookup: {
            from: "ipcc",
            localField: "IPCCSearchId",
            foreignField: "IPCCId",
            as: "ipccInfo",
          },
        },
        {
          $match: {
            group: groupCode,
            isValid: true,
            
          },
        },
        {
          $match: {
            "ipccInfo.isValid": true,
          },
        },
      ]);
      const IPCCNFS = [];
      supplierIPCCList.forEach((sp) => {
        if (sp.sellSwitch == false) {
          IPCCNFS.push(sp.ipccInfo[0].IPCC,
          );
        }
      });

      const companyProhibitionList = await service.vendibility.getVendibility({
        group: groupCode,
        isVendibility: false,
      });
      const companyNFS = companyProhibitionList.map(item => item.company);

      const flightProhibitionList = await service.prohibition.getProhibition({
        group: groupCode,
        isProhibition: true,
      });
      const flightNFS = flightProhibitionList.map(item => {
        const { tripType, depart, departType, arrival, arrivalType, cabinType,vendibilityCompanies,IPCC } = item;
        return { tripType, depart, departType, arrival, arrivalType, cabinType,vendibilityCompanies,IPCC };
      });

      groupNFSList.push({
        groupCode,
        IPCCNFS,
        companyNFS,
        flightNFS,
      });
    }
    return groupNFSList;
  }
}

module.exports = NfsService;
