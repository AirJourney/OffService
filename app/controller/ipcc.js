"use strict";

const Controller = require("egg").Controller;

class IPCCController extends Controller {
  async createIPCC() {
    const { ctx, service } = this;
    // var request = {
    //   ipccCode: "100001",
    //   ipccName: "在云端 IPCC HK",
    //   exchangeType: "GDSExchange",
    //   settlementCurrency: "CNY",
    //   roundType:"decimal",
    //   sellSwitch: true,
    //   group: "LLTrip",
    // };
    const { supplierId, IPCCType } = ctx.request.body;
    if(!supplierId|| !IPCCType){
      ctx.helper.ResFormat(this.ctx, "", false, "IPCC failture", {});
      return;
    }

    var result = await service.ipcc.createIPCC(ctx.request.body);

    var supplier = await service.supplier.refreshIPCC({
      supplierId,
      IPCCType,
      IPCCId: result.IPCCId,
    });

    ctx.helper.ResFormat(this.ctx, "", true, "IPCC success", supplier);
  }

  async getIPCC() {
    const { ctx, service } = this;
    var result = await service.ipcc.getIPCC(ctx.request.body);

    result.forEach((item) => {
      item.supplierId = item.IPCCBooking&&item.IPCCBooking.length>0?item.IPCCBooking[0].supplierId:null;
      item.supplierName = item.IPCCBooking&&item.IPCCBooking.length>0?item.IPCCBooking[0].supplierName:null;
      if(!item.supplierId){
        item.supplierId = item.IPCCSearch&&item.IPCCSearch.length>0?item.IPCCSearch[0].supplierId:null;
        item.supplierName = item.IPCCSearch&&item.IPCCSearch.length>0?item.IPCCSearch[0].supplierName:null;
      }
    });

    ctx.helper.ResFormat(this.ctx, "", true, "IPCC success", result);
  }

  async updateIPCC() {
    const { ctx, service } = this;
    var result = await service.ipcc.updateIPCC(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "IPCC success", result);
  }

  async deleteIPCC() {
    const { ctx, service } = this;
    var result = await service.ipcc.deleteIPCC(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "IPCC success", result);
  }
}

module.exports = IPCCController;
