"use strict";

const Controller = require("egg").Controller;

class RevenueController extends Controller {
  async createRevenue() {
    const { ctx, service } = this;
    var result = await service.revenue.createRevenue(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Revenue success", result);
  }

  async getRevenue() {
    const { ctx, service } = this;
    var result = await service.revenue.getRevenue(ctx.request.body);
    result.forEach((item) => {
      item.supplierName = item.supplierInfo[0].supplierName;
    });
    ctx.helper.ResFormat(this.ctx, "", true, "Revenue success", result);
  }

  async updateRevenue() {
    const { ctx, service } = this;
    var result = await service.revenue.updateRevenue(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Revenue success", result);
  }

  async deleteRevenue() {
    const { ctx, service } = this;
    var result = await service.revenue.deleteRevenue(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Revenue success", result);
  }
}

module.exports = RevenueController;
