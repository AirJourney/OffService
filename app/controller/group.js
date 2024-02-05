"use strict";

const Controller = require("egg").Controller;

class GroupController extends Controller {
  async createGroup() {
    const { ctx, service } = this;

    var result = await service.group.createGroup(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Group success", result);
  }

  async getGroup() {
    const { ctx, service } = this;
    var result = await service.group.getGroup(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Group success", result);
  }

  async updateGroup() {
    const { ctx, service } = this;
    var result = await service.group.updateGroup(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Group success", result);
  }
}

module.exports = GroupController;
