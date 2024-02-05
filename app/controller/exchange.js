"use strict";

const Controller = require("egg").Controller;

class ExchangeController extends Controller {

  async getExchangeList() {
    const { ctx, service } = this;
    var result = await service.exchange.getExchangeList(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "ExchangeList success", result);
  }
}

module.exports = ExchangeController;
