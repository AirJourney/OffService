"use strict";

const Controller = require("egg").Controller;

class ProhibitionController extends Controller {
  async createProhibition() {
    const { ctx, service } = this;
    var result = await service.prohibition.createProhibition(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Prohibition success", result);
  }
  async asyncProhibition() {
    const { ctx, service } = this;
    var result = await service.prohibition.asyncProhibition(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Prohibition success", result);
  }
  async getProhibition() {
    const { ctx, service } = this;
    var result = await service.prohibition.getProhibition(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Prohibition success", result);
  }

  async updateProhibition() {
    const { ctx, service } = this;
    var result = await service.prohibition.updateProhibition(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Prohibition success", result);
  }

  async deleteProhibition() {
    const { ctx, service } = this;
    var result = await service.prohibition.deleteProhibition(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Prohibition success", result);
  }
}

module.exports = ProhibitionController;
