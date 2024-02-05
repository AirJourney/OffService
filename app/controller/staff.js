'use strict';

const Controller = require('egg').Controller;

class StaffController extends Controller {
  async createStaff() {
    const { ctx, service } = this;
    const result = await service.staff.createStaff(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, '', true, 'Staff success', result);
  }

  async getStaff() {
    const { ctx, service } = this;
    const result = await service.staff.getStaff(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, '', true, 'Staff success', result);
  }

  async updateStaff() {
    const { ctx, service } = this;
    const result = await service.staff.updateStaff(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, '', true, 'Staff success', result);
  }

  async deleteStaff() {
    const { ctx, service } = this;
    const result = await service.staff.deleteStaff(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, '', true, 'Staff success', result);
  }

  async changePwd() {
    const { ctx, service } = this;
    const result = await service.staff.changePwd(ctx.request.body);
    if (result) {
      ctx.helper.ResFormat(this.ctx, '', true, 'change password success', result);
      return;
    }
    ctx.helper.ResFormat(this.ctx, '', false, 'the old password is wrong', '');
  }
}

module.exports = StaffController;
