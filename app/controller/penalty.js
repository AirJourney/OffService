'use strict';

const Controller = require('egg').Controller;

const moment = require('moment');

class PenaltyController extends Controller {
  async createPenalty() {
    const { ctx, service } = this;
    const result = await service.penalty.createPenalty(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, '', true, 'Penalty success', result);
  }

  async getPenalty() {
    const { ctx, service } = this;
    const result = await service.penalty.getPenalty(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, '', true, 'Penalty success', result);
  }

  async updatePenalty() {
    const { ctx, service } = this;
    const result = await service.penalty.updatePenalty(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, '', true, 'Penalty success', result);
  }

  async deletePenalty() {
    const { ctx, service } = this;
    const result = await service.penalty.deletePenalty(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, '', true, 'Penalty success', result);
  }
}

module.exports = PenaltyController;
