"use strict";

const Service = require("egg").Service;
const companyList = require("../../file/company.json");

class CompanyService extends Service {
  async getCompanyList(payload) {
    const { companyCode, companyCName } = payload;
    let result = companyList;
    if (companyCode && companyCName) {
      result = result.filter(
        (key) =>
          key.companyCName == companyCName && key.companyCode == companyCode
      );
    } else if (companyCode) {
      result = comparesultnyList.filter((key) => key.companyCode == companyCode);
    } else if (companyCName) {
      result = result.filter(
        (key) => key.companyCName == companyCName
      );
    }

    return result;
  }
}

module.exports = CompanyService;
