'use strict';

const { Controller } = require('egg');

class NfsController extends Controller {
  async allGroupNFS() {
    const { ctx, service } = this;
    var result = await service.nfs.allGroupNFS(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "allGroupNFS success", result);
  }
}

module.exports = NfsController;
