"use strict";

const Controller = require("egg").Controller;

class ProfitController extends Controller {
  async createProfit() {
    const { ctx, service } = this;
    var result = await service.profit.createProfit(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Profit success", result);
  }

  async getProfit() {
    const { ctx, service } = this;
    var result = await service.profit.getProfit(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Profit success", result);
  }

  async updateProfit() {
    const { ctx, service } = this;
    var result = await service.profit.updateProfit(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Profit success", result);
  }

  async deleteProfit() {
    const { ctx, service } = this;
    var result = await service.profit.deleteProfit(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Profit success", result);
  }
}

module.exports = ProfitController;
