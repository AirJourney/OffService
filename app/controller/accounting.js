'use strict';

const Controller = require('egg').Controller;

class AccountingController extends Controller {


  async getMktBill() {
    const { ctx, service } = this;
    const result = await service.accounting.getMktBill(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, '', true, 'getMktBill success', result);
  }

  async getBill() {
    const { ctx, service } = this;
    var result = await service.accounting.getBill(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "getBill success", result);
  }
}

module.exports = AccountingController;
