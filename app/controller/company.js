"use strict";

const Controller = require("egg").Controller;

class CompanyController extends Controller {
  // async createCompany() {
  //   const { ctx, service } = this;
  //   var result = await service.company.createCompany(ctx.request.body);
  //   ctx.helper.ResFormat(this.ctx, "", true, "Company success", result);
  // }

  async getCompanyList() {
    const { ctx, service } = this;
    var result = await service.company.getCompanyList(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Company success", result);
  }

  // async updateCompany() {
  //   const { ctx, service } = this;
  //   var result = await service.company.updateCompany(ctx.request.body);
  //   ctx.helper.ResFormat(this.ctx, "", true, "Company success", result);
  // }

  // async deleteCompany() {
  //   const { ctx, service } = this;
  //   var result = await service.company.deleteCompany(ctx.request.body);
  //   ctx.helper.ResFormat(this.ctx, "", true, "Company success", result);
  // }
}

module.exports = CompanyController;
