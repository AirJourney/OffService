"use strict";

const Controller = require("egg").Controller;

class SellFlightController extends Controller {
  
  async createSellFight() {
    const {ctx,service} = this;

    const sellFightList = await service.sellFlight.createSellFight(ctx.request.body);

    ctx.helper.ResFormat(this.ctx, "", true, "createSellFight success", sellFightList);
  }

  async clearSellFight() {
    const {ctx,service} = this;

    const clearResult = await service.sellFlight.clearSellFight(ctx.request.body);

    ctx.helper.ResFormat(this.ctx, "", clearResult, "clearSellFight result", clearResult);
  }

  async getSellFight(){
    const {ctx,service} = this;

    const sellFlightResult = await service.sellFlight.getSellFlight(ctx.request.body);

    ctx.helper.ResFormat(this.ctx, "", true, "getSellFight result", sellFlightResult);
  }

}

module.exports = SellFlightController;
