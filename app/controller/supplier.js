"use strict";

const Controller = require("egg").Controller;

class SupplierController extends Controller {
  async createSupplier() {
    const { ctx, service } = this;
    // var request = {
    //   supplierCode: "100001",
    //   supplierName: "在云端 IPCC HK",
    //   exchangeType: "GDSExchange",
    //   settlementCurrency: "CNY",
    //   roundType:"decimal",
    //   sellSwitch: true,
    //   group: "LLTrip",
    // };

    var result = await service.supplier.createSupplier(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Supplier success", result);
  }

  async getSupplier() {
    const { ctx, service } = this;
    var result = await service.supplier.getSupplier(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Supplier success", result);
  }

  async getIPCCBySupplierId() {
    const { ctx, service } = this;
    var result = await service.supplier.getIPCCBySupplierId(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "getIPCCBySupplierId success", result);
  }

  

  async updateSupplier() {
    const { ctx, service } = this;
    var result = await service.supplier.updateSupplier(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Supplier success", result);
  }

  async deleteSupplier() {
    const { ctx, service } = this;
    var result = await service.supplier.deleteSupplier(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Supplier success", result);
  }
}

module.exports = SupplierController;
