"use strict";

const Controller = require("egg").Controller;

class VendibilityController extends Controller {
  async createVendibility() {
    const { ctx, service } = this;
    var result = await service.vendibility.createVendibility(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Vendibility success", result);
  }

  async asyncVendibility() {
    const { ctx, service } = this;
    var result = await service.vendibility.asyncVendibility(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Vendibility success", result);
  }

  async getVendibility() {
    const { ctx, service } = this;
    var result = await service.vendibility.getVendibility(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Vendibility success", result);
  }

  async updateVendibility() {
    const { ctx, service } = this;
    var result = await service.vendibility.updateVendibility(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Vendibility success", result);
  }

  async deleteVendibility() {
    const { ctx, service } = this;
    var result = await service.vendibility.deleteVendibility(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Vendibility success", result);
  }
}

module.exports = VendibilityController;
